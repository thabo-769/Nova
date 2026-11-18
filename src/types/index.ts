export type Role = 'customer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  photoURL?: string;
  loyaltyPoints: number;
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  savedAddresses: DeliveryAddress[];
  favoriteItemIds: string[];
  createdAt: string;
}

export interface DeliveryAddress {
  id: string;
  label: string; // 'Home', 'Work', etc.
  street: string;
  suburb: string;
  city: string; // Default Bulawayo
  notes?: string;
  isDefault?: boolean;
}

export type FoodCategory =
  | 'all'
  | 'starters'
  | 'mains'
  | 'grills'
  | 'burgers'
  | 'pizza'
  | 'chicken'
  | 'breakfast'
  | 'salads'
  | 'desserts'
  | 'drinks'
  | 'specials';

export interface CategoryItem {
  id: FoodCategory;
  name: string;
  description: string;
  iconName: string;
  image?: string;
}

export interface PortionOption {
  name: string;
  priceDelta: number; // e.g. +3.00 for Large or +0 for Standard
}

export interface CustomizationOption {
  id: string;
  name: string;
  options: {
    label: string;
    extraPrice: number;
  }[];
  maxSelect?: number;
  required?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: FoodCategory;
  image: string;
  ingredients: string[];
  portionSizes?: PortionOption[];
  customizations?: CustomizationOption[];
  dietary: ('halal' | 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free' | 'chefs-special' | 'spicy')[];
  allergens: string[];
  isAvailable: boolean;
  rating: number;
  reviewsCount: number;
  prepTimeMinutes: number;
  featured?: boolean;
  popular?: boolean;
}

export interface CartItem {
  cartItemId: string; // unique item instance id
  menuItem: MenuItem;
  quantity: number;
  selectedPortion?: PortionOption;
  selectedCustomizations: Record<string, string[]>; // categoryId -> selected option labels
  specialInstructions?: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderType = 'delivery' | 'pickup';

export type PaymentMethod = 'ecocash' | 'onemoney' | 'innbucks' | 'card' | 'cash';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cash_on_delivery';

export type OrderStatus =
  | 'received'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  deliveryFee: number;
  total: number;
  orderType: OrderType;
  deliveryAddress?: DeliveryAddress;
  collectionTime?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentPhone?: string;
  transactionReference?: string;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
  estimatedDeliveryMinutes: number;
  timeline: {
    status: OrderStatus;
    timestamp: string;
    note: string;
  }[];
}

export type SeatingPreference = 'indoor' | 'patio' | 'vip' | 'window';

export type OccasionType =
  | 'casual'
  | 'date_night'
  | 'anniversary'
  | 'birthday'
  | 'business'
  | 'proposal'
  | 'group_celebration';

export type ReservationStatus = 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled';

export interface TableInfo {
  id: string;
  number: number;
  capacity: number;
  section: SeatingPreference;
  isAvailable: boolean;
}

export interface DateNightPackage {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  description: string;
  includes: string[];
  image: string;
  isPopular?: boolean;
}

export interface Reservation {
  id: string;
  confirmationCode: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  guests: number;
  seatingPreference: SeatingPreference;
  tableId?: string;
  tableNumber?: number;
  occasion: OccasionType;
  specialRequests?: string;
  dateNightPackageId?: string;
  dateNightPackageName?: string;
  customDecorations?: string[];
  status: ReservationStatus;
  createdAt: string;
}

export interface Promotion {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  discountPercent: number;
  minSpend: number;
  validUntil: string;
  bannerImage: string;
  active: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  mealName?: string;
  createdAt: string;
}

export interface LoyaltyReward {
  id: string;
  title: string;
  pointsCost: number;
  discountValue: number;
  description: string;
  iconName: string;
}
