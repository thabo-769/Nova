import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

/**
 * Cloud Function: Process Order & Award Loyalty Points
 * Triggered on new order creation
 */
export const onOrderCreated = functions.firestore
  .document('orders/{orderId}')
  .onCreate(async (snap, context) => {
    const order = snap.data();
    const orderId = context.params.orderId;

    if (!order) return null;

    try {
      // 1. Calculate loyalty points (10 points per 1 USD)
      const pointsEarned = Math.floor((order.total || 0) * 10);

      if (order.userId) {
        const userRef = db.collection('users').doc(order.userId);
        await db.runTransaction(async (transaction) => {
          const userDoc = await transaction.get(userRef);
          if (userDoc.exists) {
            const currentPoints = userDoc.data()?.loyaltyPoints || 0;
            const newPoints = currentPoints + pointsEarned;
            
            // Determine tier
            let tier = 'Bronze';
            if (newPoints >= 2500) tier = 'Platinum';
            else if (newPoints >= 1000) tier = 'Gold';
            else if (newPoints >= 400) tier = 'Silver';

            transaction.update(userRef, {
              loyaltyPoints: newPoints,
              loyaltyTier: tier,
              totalOrders: admin.firestore.FieldValue.increment(1),
              totalSpent: admin.firestore.FieldValue.increment(order.total || 0)
            });

            // Log loyalty transaction
            const loyaltyLogRef = db.collection('loyalty_transactions').doc();
            transaction.set(loyaltyLogRef, {
              userId: order.userId,
              orderId,
              points: pointsEarned,
              type: 'earn',
              description: `Earned from Order #${orderId.slice(0, 8)}`,
              createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
          }
        });
      }

      // 2. Notification simulation / FCM message to kitchen and customer
      console.log(`Order ${orderId} registered successfully. Awarded ${pointsEarned} loyalty points.`);
      return { success: true, pointsEarned };
    } catch (error) {
      console.error('Error in onOrderCreated function:', error);
      return { error: (error as Error).message };
    }
  });

/**
 * Cloud Function: Validate & Prevent Double Bookings for Table Reservations
 */
export const onReservationCreated = functions.firestore
  .document('reservations/{reservationId}')
  .onCreate(async (snap, context) => {
    const reservation = snap.data();
    const reservationId = context.params.reservationId;

    if (!reservation) return null;

    try {
      const { date, time, tableId } = reservation;

      // Check existing confirmed or pending reservations for same date, time, table
      const conflictingQuery = await db.collection('reservations')
        .where('date', '==', date)
        .where('time', '==', time)
        .where('tableId', '==', tableId)
        .where('status', 'in', ['pending', 'confirmed'])
        .get();

      // If conflicting bookings exist excluding the current one
      const conflicts = conflictingQuery.docs.filter(doc => doc.id !== reservationId);

      if (conflicts.length > 0) {
        await snap.ref.update({
          status: 'rejected',
          rejectionReason: 'Time slot or table already booked. Please choose another table or time.',
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return { status: 'rejected', reason: 'Double booking conflict prevented.' };
      }

      // Automatically confirm if table available
      await snap.ref.update({
        status: 'confirmed',
        confirmationCode: `NV-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return { status: 'confirmed' };
    } catch (error) {
      console.error('Error verifying reservation:', error);
      return { error: (error as Error).message };
    }
  });

/**
 * Cloud Function: Verify Zimbabwe Payment Callback (EcoCash, OneMoney, InnBucks, Zimswitch)
 */
export const verifyPaymentWebhook = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { orderId, transactionRef, provider, status, amount } = req.body;

  if (!orderId || !transactionRef) {
    res.status(400).json({ error: 'Missing required payment verification parameters' });
    return;
  }

  try {
    const orderRef = db.collection('orders').doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    if (status === 'PAID' || status === 'SUCCESS') {
      await orderRef.update({
        paymentStatus: 'paid',
        transactionReference: transactionRef,
        paymentProvider: provider,
        verifiedAmount: amount,
        status: 'confirmed', // Automatically move to confirmed on verified payment
        paidAt: admin.firestore.FieldValue.serverTimestamp()
      });

      res.status(200).json({ success: true, message: 'Payment successfully verified and order confirmed.' });
    } else {
      await orderRef.update({
        paymentStatus: 'failed',
        transactionReference: transactionRef,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      res.status(200).json({ success: false, message: 'Payment marked as failed.' });
    }
  } catch (error) {
    console.error('Error handling payment webhook:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});
