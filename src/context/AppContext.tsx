'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Role,
  MenuItem,
  CategoryItem,
  CartItem,
  Order,
  OrderStatus,
  OrderType,
  PaymentMethod,
  PaymentStatus,
  Reservation,
  ReservationStatus,
  TableInfo,
  DateNightPackage,
  Promotion,
  LoyaltyReward,
  DeliveryAddress,
  PortionOption,
} from '@/types';
import {
  CATEGORIES,
  MENU_ITEMS,
  TABLES,
  DATE_NIGHT_PACKAGES,
  PROMOTIONS,
  DEMO_USERS,
  INITIAL_ORDERS,
  INITIAL_RESERVATIONS,
} from '@/data/mockData';

interface AppContextType {
  // Theme
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // Auth & Profile
  user: UserProfile | null;
  switchDemoUser: (role: Role) => void;
  loginAs: (email: string) => void;
  logout: () => void;
  toggleFavorite: (itemId: string) => void;
  addDeliveryAddress: (address: Omit<DeliveryAddress, 'id'>) => void;

  // Menu State & Admin Actions
  menuItems: MenuItem[];
  categories: CategoryItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  toggleItemAvailability: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (
    item: MenuItem,
    quantity?: number,
    portion?: PortionOption,
    customizations?: Record<string, string[]>,
    specialInstructions?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  appliedPromo: Promotion | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    orderType: OrderType;
    deliveryAddress?: DeliveryAddress;
    collectionTime?: string;
    paymentMethod: PaymentMethod;
    paymentPhone?: string;
    notes?: string;
  }) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // Table Reservations & Date Night
  reservations: Reservation[];
  tables: TableInfo[];
  dateNightPackages: DateNightPackage[];
  createReservation: (data: Omit<Reservation, 'id' | 'confirmationCode' | 'createdAt' | 'status'>) => Promise<Reservation>;
  updateReservationStatus: (reservationId: string, status: ReservationStatus) => void;

  // Marketing & Promotions
  promotions: Promotion[];
  addPromotion: (promo: Omit<Promotion, 'id'>) => void;
  togglePromotionActive: (id: string) => void;

  // Loyalty Rewards
  redeemReward: (reward: LoyaltyReward) => { success: boolean; message: string };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  // User state
  const [user, setUser] = useState<UserProfile | null>(DEMO_USERS.customer);

  // Menu items & Categories
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [categories] = useState<CategoryItem[]>(CATEGORIES);

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<Promotion | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Orders
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Reservations
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [tables] = useState<TableInfo[]>(TABLES);
  const [dateNightPackages] = useState<DateNightPackage[]>(DATE_NIGHT_PACKAGES);

  // Promotions
  const [promotions, setPromotions] = useState<Promotion[]>(PROMOTIONS);

  // Load saved state from localStorage on client mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('nova_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      document.documentElement.classList.add('dark');
    }

    const savedCart = localStorage.getItem('nova_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }

    const savedUser = localStorage.getItem('nova_active_user');
    if (savedUser && DEMO_USERS[savedUser]) {
      setUser(DEMO_USERS[savedUser]);
    }
  }, []);

  // Sync theme changes to html class and localStorage
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('nova_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Sync cart to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('nova_cart', JSON.stringify(cart));
    }
  }, [cart, mounted]);

  // Auth actions
  const switchDemoUser = (role: Role) => {
    const targetUser = DEMO_USERS[role] || DEMO_USERS.customer;
    setUser(targetUser);
    localStorage.setItem('nova_active_user', role);
  };

  const loginAs = (email: string) => {
    const found = Object.values(DEMO_USERS).find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser(found);
      localStorage.setItem('nova_active_user', found.role);
    } else {
      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email,
        role: 'customer',
        loyaltyPoints: 100, // Welcome bonus
        loyaltyTier: 'Bronze',
        savedAddresses: [],
        favoriteItemIds: [],
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nova_active_user');
  };

  const toggleFavorite = (itemId: string) => {
    if (!user) return;
    const exists = user.favoriteItemIds.includes(itemId);
    const updated = exists
      ? user.favoriteItemIds.filter((id) => id !== itemId)
      : [...user.favoriteItemIds, itemId];
    setUser({ ...user, favoriteItemIds: updated });
  };

  const addDeliveryAddress = (address: Omit<DeliveryAddress, 'id'>) => {
    if (!user) return;
    const newAddress: DeliveryAddress = {
      ...address,
      id: `addr-${Date.now()}`,
    };
    setUser({
      ...user,
      savedAddresses: [...user.savedAddresses, newAddress],
    });
  };

  // Menu Management
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}`,
    };
    setMenuItems((prev) => [newItem, ...prev]);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleItemAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isAvailable: !item.isAvailable } : item))
    );
  };

  // Cart Calculations
  const addToCart = (
    item: MenuItem,
    quantity = 1,
    portion?: PortionOption,
    customizations: Record<string, string[]> = {},
    specialInstructions = ''
  ) => {
    let unitPrice = item.price;
    if (portion) {
      unitPrice += portion.priceDelta;
    }
    // Calculate extra customization prices
    if (item.customizations) {
      item.customizations.forEach((customGroup) => {
        const selectedForGroup = customizations[customGroup.id] || [];
        customGroup.options.forEach((opt) => {
          if (selectedForGroup.includes(opt.label)) {
            unitPrice += opt.extraPrice;
          }
        });
      });
    }

    const cartItemId = `${item.id}-${portion?.name || 'std'}-${JSON.stringify(customizations)}`;
    setCart((prev) => {
      const existing = prev.find((ci) => ci.cartItemId === cartItemId);
      if (existing) {
        const newQty = existing.quantity + quantity;
        return prev.map((ci) =>
          ci.cartItemId === cartItemId
            ? { ...ci, quantity: newQty, totalPrice: Number((unitPrice * newQty).toFixed(2)) }
            : ci
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          menuItem: item,
          quantity,
          selectedPortion: portion,
          selectedCustomizations: customizations,
          specialInstructions,
          unitPrice,
          totalPrice: Number((unitPrice * quantity).toFixed(2)),
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: Number((item.unitPrice * newQty).toFixed(2)),
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string) => {
    const promo = promotions.find(
      (p) => p.code.toUpperCase() === code.trim().toUpperCase() && p.active
    );
    if (!promo) {
      return { success: false, message: 'Invalid or expired promotional voucher.' };
    }
    const currentSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    if (currentSubtotal < promo.minSpend) {
      return {
        success: false,
        message: `Minimum order spend of $${promo.minSpend.toFixed(2)} required for this code.`,
      };
    }
    setAppliedPromo(promo);
    return { success: true, message: `Promo code ${promo.code} applied! ${promo.discountPercent}% discount.` };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const subtotal = Number(cart.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2));
  const discount = appliedPromo
    ? Number(((subtotal * appliedPromo.discountPercent) / 100).toFixed(2))
    : 0;
  const deliveryFee = cart.length > 0 ? (subtotal > 50 ? 0 : 3.50) : 0;
  const total = Number(Math.max(0, subtotal - discount + deliveryFee).toFixed(2));
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Orders
  const createOrder = async (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    orderType: OrderType;
    deliveryAddress?: DeliveryAddress;
    collectionTime?: string;
    paymentMethod: PaymentMethod;
    paymentPhone?: string;
    notes?: string;
  }): Promise<Order> => {
    const orderNumber = `NV-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowIso = new Date().toISOString();

    const paymentStatus: PaymentStatus =
      orderData.paymentMethod === 'cash' ? 'cash_on_delivery' : 'paid';

    const transactionRef =
      orderData.paymentMethod === 'cash'
        ? undefined
        : `${orderData.paymentMethod.toUpperCase()}-${Date.now().toString().slice(-6)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      userId: user?.id,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerEmail: orderData.customerEmail,
      items: [...cart],
      subtotal,
      discount,
      discountCode: appliedPromo?.code,
      deliveryFee: orderData.orderType === 'delivery' ? deliveryFee : 0,
      total: orderData.orderType === 'delivery' ? total : Number((subtotal - discount).toFixed(2)),
      orderType: orderData.orderType,
      deliveryAddress: orderData.deliveryAddress,
      collectionTime: orderData.collectionTime,
      paymentMethod: orderData.paymentMethod,
      paymentStatus,
      paymentPhone: orderData.paymentPhone,
      transactionReference: transactionRef,
      status: 'received',
      notes: orderData.notes,
      createdAt: nowIso,
      estimatedDeliveryMinutes: orderData.orderType === 'delivery' ? 35 : 20,
      timeline: [
        {
          status: 'received',
          timestamp: nowIso,
          note: `Order received via Nova Diner Online. Method: ${orderData.paymentMethod.toUpperCase()}`,
        },
      ],
    };

    // Award loyalty points to user (10 points per dollar)
    if (user) {
      const earnedPoints = Math.floor(newOrder.total * 10);
      const newPoints = user.loyaltyPoints + earnedPoints;
      let newTier = user.loyaltyTier;
      if (newPoints >= 2500) newTier = 'Platinum';
      else if (newPoints >= 1000) newTier = 'Gold';
      else if (newPoints >= 400) newTier = 'Silver';

      setUser({
        ...user,
        loyaltyPoints: newPoints,
        loyaltyTier: newTier,
      });
    }

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    const statusMessages: Record<OrderStatus, string> = {
      received: 'Order received into restaurant system',
      confirmed: 'Order confirmed and ingredients prepped',
      preparing: 'Chef is actively cooking your meal in the kitchen',
      ready: 'Meal is freshly packaged and ready for collection or courier dispatch',
      delivered: 'Order fulfilled and handed over to customer',
      cancelled: 'Order cancelled',
    };

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const nowIso = new Date().toISOString();
          return {
            ...order,
            status,
            timeline: [
              ...order.timeline,
              {
                status,
                timestamp: nowIso,
                note: note || statusMessages[status],
              },
            ],
          };
        }
        return order;
      })
    );
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  };

  // Reservations
  const createReservation = async (
    data: Omit<Reservation, 'id' | 'confirmationCode' | 'createdAt' | 'status'>
  ): Promise<Reservation> => {
    // Check conflicts (same date, time, table)
    const conflict = reservations.some(
      (r) =>
        r.date === data.date &&
        r.time === data.time &&
        r.tableId === data.tableId &&
        ['pending', 'confirmed'].includes(r.status)
    );

    if (conflict) {
      throw new Error('This table is already booked for the selected time slot. Please choose another table or time.');
    }

    const confirmationCode = `NV-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const newReservation: Reservation = {
      ...data,
      id: `res-${Date.now()}`,
      confirmationCode,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    setReservations((prev) => [newReservation, ...prev]);
    return newReservation;
  };

  const updateReservationStatus = (reservationId: string, status: ReservationStatus) => {
    setReservations((prev) =>
      prev.map((res) => (res.id === reservationId ? { ...res, status } : res))
    );
  };

  // Marketing
  const addPromotion = (promo: Omit<Promotion, 'id'>) => {
    const newPromo: Promotion = {
      ...promo,
      id: `promo-${Date.now()}`,
    };
    setPromotions((prev) => [newPromo, ...prev]);
  };

  const togglePromotionActive = (id: string) => {
    setPromotions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  // Loyalty Rewards Redemption
  const redeemReward = (reward: LoyaltyReward) => {
    if (!user) {
      return { success: false, message: 'Please log in to redeem loyalty rewards.' };
    }
    if (user.loyaltyPoints < reward.pointsCost) {
      return {
        success: false,
        message: `Insufficient points. You need ${reward.pointsCost} points, but have ${user.loyaltyPoints}.`,
      };
    }

    const updatedPoints = user.loyaltyPoints - reward.pointsCost;
    setUser({ ...user, loyaltyPoints: updatedPoints });

    // Apply automatically as promo voucher
    const rewardPromo: Promotion = {
      id: `reward-${Date.now()}`,
      code: `REWARD-${reward.discountValue}`,
      title: reward.title,
      subtitle: reward.description,
      discountPercent: 100, // Or handled via discountValue
      minSpend: reward.discountValue,
      validUntil: '2026-12-31',
      bannerImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=600&auto=format&fit=crop',
      active: true,
    };
    setAppliedPromo(rewardPromo);

    return {
      success: true,
      message: `Successfully redeemed ${reward.title}! $${reward.discountValue} discount applied to your checkout.`,
    };
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        switchDemoUser,
        loginAs,
        logout,
        toggleFavorite,
        addDeliveryAddress,
        menuItems,
        categories,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleItemAvailability,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discount,
        deliveryFee,
        total,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById,
        reservations,
        tables,
        dateNightPackages,
        createReservation,
        updateReservationStatus,
        promotions,
        addPromotion,
        togglePromotionActive,
        redeemReward,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
