'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { OrderType, PaymentMethod } from '@/types';
import confetti from 'canvas-confetti';
import {
  X,
  MapPin,
  Clock,
  Phone,
  User,
  Banknote,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Loader2,
  Sparkles,
} from 'lucide-react';

function PaymentBrand({ method }: { method: PaymentMethod }) {
  if (method === 'ecocash') return <span aria-hidden="true" className="payment-brand-logo flex h-7 items-center text-emerald-400"><span className="mr-1.5 grid h-6 w-6 place-items-center rounded-md border-2 border-current font-black">e</span><span className="text-sm font-black tracking-tight">EcoCash</span></span>;
  if (method === 'innbucks') return <span aria-hidden="true" className="payment-brand-logo flex h-7 items-center text-amber-400"><span className="payment-brand-mark mr-1.5 grid h-6 w-6 place-items-center rounded-full bg-neutral-950 text-xs font-black text-amber-400">i</span><span className="text-sm font-black tracking-tight">InnBucks</span></span>;
  if (method === 'onemoney') return <span aria-hidden="true" className="flex h-7 items-center text-blue-400"><span className="mr-1.5 text-2xl font-black leading-none">1</span><span className="text-sm font-black tracking-tight">OneMoney</span></span>;
  if (method === 'card') return <span aria-hidden="true" className="payment-brand-logo flex h-7 items-center gap-2"><span className="text-sm font-black italic text-blue-400">VISA</span><span className="flex"><i className="payment-brand-mark h-4 w-4 rounded-full bg-amber-600"/><i className="payment-brand-mark -ml-1.5 h-4 w-4 rounded-full bg-amber-300/90"/></span></span>;
  return <Banknote aria-hidden="true" className="h-6 w-6 text-gray-300" />;
}

export const CheckoutModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const {
    user,
    cart,
    subtotal,
    discount,
    deliveryFee,
    total,
    createOrder,
  } = useApp();

  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');

  // Order Details Form State
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '077');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [street, setStreet] = useState(user?.savedAddresses[0]?.street || '');
  const [suburb, setSuburb] = useState(user?.savedAddresses[0]?.suburb || 'Burnside');
  const [city] = useState('Bulawayo');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [collectionTime, setCollectionTime] = useState('Ready in 25-30 mins');

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('ecocash');
  const [paymentPhone, setPaymentPhone] = useState(user?.phone || '077');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Result
  const [placedOrderNumber, setPlacedOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Please fill in your name and phone number');
      return;
    }
    if (orderType === 'delivery' && (!street || !suburb)) {
      alert('Please provide your Bulawayo delivery address');
      return;
    }
    setStep('payment');
  };

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    setStep('processing');

    try {
      // Simulate authentic payment handshake / verification delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newOrder = await createOrder({
        customerName,
        customerPhone,
        customerEmail,
        orderType,
        deliveryAddress:
          orderType === 'delivery'
            ? {
                id: `addr-${Date.now()}`,
                label: 'Order Address',
                street,
                suburb,
                city,
                notes: deliveryNotes,
              }
            : undefined,
        collectionTime: orderType === 'pickup' ? collectionTime : undefined,
        paymentMethod,
        paymentPhone: ['ecocash', 'onemoney'].includes(paymentMethod) ? paymentPhone : undefined,
        notes: deliveryNotes,
      });

      setPlacedOrderNumber(newOrder.orderNumber);
      setStep('success');

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#101010', '#FFFFFF'],
        });
      } catch (e) {
        console.log(e);
      }
    } catch (error) {
      alert((error as Error).message);
      setStep('payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-nova-black border border-nova-gold/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-gray-100 z-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: Details */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-nova-gold">
                Step 1 of 2
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                Delivery & Contact Info
              </h3>
            </div>

            {/* Delivery vs Pickup Tab */}
            <div className="grid grid-cols-2 gap-3 p-1 rounded-xl bg-nova-cardDark border border-white/10">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center justify-center space-x-2 ${
                  orderType === 'delivery'
                    ? 'bg-nova-gold text-nova-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Bulawayo Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center justify-center space-x-2 ${
                  orderType === 'pickup'
                    ? 'bg-nova-gold text-nova-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Diner Collection</span>
              </button>
            </div>

            {/* Personal Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Tendai Moyo"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-nova-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Phone Number (WhatsApp / Calls)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+263 77..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-nova-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Email (Receipts & Notifications)
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nova-gold"
                  />
                </div>
              </div>

              {/* Delivery specific address */}
              {orderType === 'delivery' ? (
                <div className="space-y-4 pt-2 border-t border-white/5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Street Address / House Number
                      </label>
                      <input
                        type="text"
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="e.g. 14 Burnside Road"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nova-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Suburb (Bulawayo)
                      </label>
                      <select
                        value={suburb}
                        onChange={(e) => setSuburb(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nova-gold"
                      >
                        <option value="Burnside">Burnside</option>
                        <option value="Suburbs">Suburbs</option>
                        <option value="Hillside">Hillside</option>
                        <option value="Bradfield">Bradfield</option>
                        <option value="Kumalo">Kumalo</option>
                        <option value="Morningside">Morningside</option>
                        <option value="Woodville">Woodville</option>
                        <option value="Bulawayo CBD">Bulawayo CBD</option>
                        <option value="Matsheumhlope">Matsheumhlope</option>
                        <option value="Other">Other Bulawayo Suburb</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Delivery Instructions / Gate Code
                    </label>
                    <input
                      type="text"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="e.g. Black gate, ring the bell on the left"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-nova-gold"
                    />
                  </div>
                </div>
              ) : (
                <div className="pt-2 border-t border-white/5">
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Estimated Collection Time at Diner
                  </label>
                  <select
                    value={collectionTime}
                    onChange={(e) => setCollectionTime(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nova-gold"
                  >
                    <option value="Ready in 25-30 mins">As soon as possible (25-30 mins)</option>
                    <option value="In 45 minutes">In 45 minutes</option>
                    <option value="In 1 hour">In 1 hour</option>
                    <option value="Dinner Time (19:00)">Tonight at 19:00</option>
                    <option value="Dinner Time (20:00)">Tonight at 20:00</option>
                  </select>
                  <p className="text-[11px] text-gray-400 mt-2">
                    Pickup Counter: Nova Diner, Corner 12th Ave & Robert Mugabe Way.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <div>
                <span className="text-xs text-gray-400">Total payable:</span>
                <p className="text-xl font-bold font-serif text-nova-gold">
                  ${orderType === 'delivery' ? total.toFixed(2) : (subtotal - discount).toFixed(2)}
                </p>
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-nova-gold to-nova-goldDark text-nova-black font-bold text-xs uppercase tracking-wider hover:shadow-gold transition flex items-center space-x-2"
              >
                <span>Select Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Payment */}
        {step === 'payment' && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-nova-gold">
                Step 2 of 2
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                Zimbabwe Payment Methods
              </h3>
              <p className="text-xs text-gray-400">
                Processed via secure gateway. Official Nova Diner verification.
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: 'ecocash', label: 'EcoCash' },
                { id: 'innbucks', label: 'InnBucks' },
                { id: 'onemoney', label: 'OneMoney' },
                { id: 'card', label: 'Bank Card' },
                { id: 'cash', label: 'Cash on Arrival' },
              ].map((m) => {
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as PaymentMethod)}
                    className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                      isSelected
                        ? 'border-nova-gold bg-nova-gold/10 shadow-gold'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <PaymentBrand method={m.id as PaymentMethod} />
                    <span className="text-xs font-bold text-gray-200">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Specific inputs per payment method */}
            <div className="p-4 rounded-xl bg-nova-cardDark border border-white/10 space-y-4">
              {['ecocash', 'onemoney'].includes(paymentMethod) && (
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    {paymentMethod === 'ecocash' ? 'EcoCash Phone Number' : 'OneMoney Phone Number'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={paymentPhone}
                    onChange={(e) => setPaymentPhone(e.target.value)}
                    placeholder="e.g. 0771234567"
                    className="w-full bg-black/60 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nova-gold"
                  />
                  <div className="mt-2 text-[11px] text-gray-400 flex items-start space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-nova-gold shrink-0 mt-0.5" />
                    <span>
                      A prompt will be pushed to this handset. Enter your PIN when prompted to confirm the payment.
                    </span>
                  </div>
                </div>
              )}

              {paymentMethod === 'innbucks' && (
                <div className="text-center py-2 space-y-2">
                  <p className="text-xs text-gray-300">
                    Pay through InnBucks at any Simbisa till or directly via the InnBucks App.
                  </p>
                  <div className="inline-block px-4 py-2 bg-black/70 border border-amber-500/40 rounded-lg">
                    <span className="text-xs text-gray-400 block">Nova Diner InnBucks Code:</span>
                    <span className="text-lg font-mono font-bold text-amber-400 tracking-wider">
                      #NV-77821
                    </span>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Card Number (Visa / Mastercard / Zimswitch)
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4000 1234 5678 9010"
                      className="w-full bg-black/60 border border-white/15 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-nova-gold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-black/60 border border-white/15 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-nova-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Security Code (CVV)
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        className="w-full bg-black/60 border border-white/15 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-nova-gold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cash' && (
                <div className="text-xs text-gray-300">
                  <p>
                    {orderType === 'delivery'
                      ? 'Pay with clean USD or ZiG notes directly to the Nova Diner delivery courier upon arrival.'
                      : 'Pay cash at our Bulawayo diner counter upon collection.'}
                  </p>
                </div>
              )}
            </div>

            {/* Order Summary Recap */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1.5 text-gray-300">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              {orderType === 'delivery' && (
                <div className="flex justify-between">
                  <span>Bulawayo Courier</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
              )}
              <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-bold text-white">
                <span>Amount to Pay</span>
                <span className="text-nova-gold font-serif text-base">
                  ${orderType === 'delivery' ? total.toFixed(2) : (subtotal - discount).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-gray-400 hover:text-white"
              >
                ← Back to Details
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmOrder}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-nova-gold to-nova-goldDark text-nova-black font-bold text-xs uppercase tracking-wider hover:shadow-gold transition flex items-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm & Pay Now</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Processing */}
        {step === 'processing' && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <Loader2 className="w-12 h-12 text-nova-gold animate-spin" />
            <h3 className="font-serif text-xl font-bold text-white">
              Securing Your Payment Handshake...
            </h3>
            <p className="text-xs text-gray-400 max-w-sm">
              Communicating with payment gateway and sending your order to Nova Diner Bulawayo for preparation.
            </p>
          </div>
        )}

        {/* STEP 4: Success */}
        {step === 'success' && (
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-semibold text-nova-gold uppercase tracking-wider">
                Order Confirmed!
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                Thank You For Dining With Nova
              </h3>
              <p className="text-xs text-gray-400 mt-1 max-w-md">
                We have received your order. Our chefs are already reviewing the ticket.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-nova-gold/30 w-full max-w-sm text-center">
              <span className="text-xs text-gray-400 uppercase">Order Reference:</span>
              <p className="text-2xl font-mono font-bold text-nova-gold mt-0.5 tracking-wider">
                {placedOrderNumber}
              </p>
              <div className="mt-2 text-xs text-emerald-400 flex items-center justify-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>+ {Math.floor(total * 10)} Nova Loyalty Points Earned!</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm pt-4">
              <button
                onClick={() => {
                  onClose();
                  router.push(`/track-order?id=${placedOrderNumber}`);
                }}
                className="flex-1 py-3 rounded-xl bg-nova-gold text-nova-black font-bold text-xs uppercase tracking-wider hover:bg-nova-goldLight transition"
              >
                Track Live Status
              </button>
              <button
                onClick={() => {
                  onClose();
                  router.push('/menu');
                }}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider transition"
              >
                Return to Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
