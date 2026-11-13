'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { MenuItem, OrderStatus, FoodCategory, Order } from '@/types';
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  Calendar,
  Users,
  Tag,
  TrendingUp,
  DollarSign,
  Clock,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  AlertCircle,
  Eye,
  Shield,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    user,
    orders,
    reservations,
    menuItems,
    promotions,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleItemAvailability,
    updateOrderStatus,
    updateReservationStatus,
    addPromotion,
    togglePromotionActive,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'menu' | 'orders' | 'reservations' | 'marketing'
  >('overview');

  // Menu Modal State
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [editingMeal, setEditingMeal] = useState<MenuItem | null>(null);

  const [mealFormName, setMealFormName] = useState('');
  const [mealFormDesc, setMealFormDesc] = useState('');
  const [mealFormPrice, setMealFormPrice] = useState(15);
  const [mealFormCategory, setMealFormCategory] = useState<FoodCategory>('mains');
  const [mealFormImage, setMealFormImage] = useState(
    'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop'
  );

  // Marketing Form State
  const [promoCode, setPromoCode] = useState('');
  const [promoTitle, setPromoTitle] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(15);
  const [promoMinSpend, setPromoMinSpend] = useState(30);

  // Analytics Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const activeOrdersCount = orders.filter((o) => !['delivered', 'cancelled'].includes(o.status)).length;
  const completedOrdersCount = orders.filter((o) => o.status === 'delivered').length;
  const upcomingReservationsCount = reservations.filter((r) => r.status === 'confirmed').length;

  const handleOpenAddMeal = () => {
    setEditingMeal(null);
    setMealFormName('');
    setMealFormDesc('');
    setMealFormPrice(15);
    setMealFormCategory('mains');
    setShowAddMealModal(true);
  };

  const handleOpenEditMeal = (meal: MenuItem) => {
    setEditingMeal(meal);
    setMealFormName(meal.name);
    setMealFormDesc(meal.description);
    setMealFormPrice(meal.price);
    setMealFormCategory(meal.categoryId);
    setMealFormImage(meal.image);
    setShowAddMealModal(true);
  };

  const handleSaveMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealFormName) return;

    if (editingMeal) {
      updateMenuItem(editingMeal.id, {
        name: mealFormName,
        description: mealFormDesc,
        price: Number(mealFormPrice),
        categoryId: mealFormCategory,
        image: mealFormImage,
      });
    } else {
      addMenuItem({
        name: mealFormName,
        description: mealFormDesc,
        price: Number(mealFormPrice),
        categoryId: mealFormCategory,
        image: mealFormImage,
        ingredients: ['Fresh seasonal herbs', 'Signature house spices'],
        dietary: ['chefs-special'],
        allergens: [],
        isAvailable: true,
        rating: 5.0,
        reviewsCount: 1,
        prepTimeMinutes: 20,
      });
    }
    setShowAddMealModal(false);
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode || !promoTitle) return;
    addPromotion({
      code: promoCode.toUpperCase(),
      title: promoTitle,
      subtitle: `${promoDiscount}% off orders above $${promoMinSpend}`,
      discountPercent: Number(promoDiscount),
      minSpend: Number(promoMinSpend),
      validUntil: '2026-12-31',
      bannerImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
      active: true,
    });
    setPromoCode('');
    setPromoTitle('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-red-950/60 via-nova-cardDark to-neutral-900 border border-nova-red/40 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-nova-red/20 border border-nova-red/40 flex items-center justify-center text-nova-red">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-nova-gold">
              Nova Diner Bulawayo
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Restaurant Management Suite
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            System Online
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-nova-gold/20 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
          { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
          { id: 'reservations', label: `Table Bookings (${reservations.length})`, icon: Calendar },
          { id: 'menu', label: `Menu Manager (${menuItems.length})`, icon: UtensilsCrossed },
          { id: 'marketing', label: 'Marketing & Vouchers', icon: Tag },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center space-x-2 shrink-0 ${
                isActive
                  ? 'bg-nova-gold text-nova-black shadow-gold'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-nova-cardDark border border-white/10">
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Total Revenue
              </span>
              <p className="font-serif text-3xl font-bold text-nova-gold mt-1">
                ${totalRevenue.toFixed(2)}
              </p>
              <p className="text-[11px] text-emerald-400 mt-2 flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-1" /> +18.4% vs last week
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-nova-cardDark border border-white/10">
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Active Kitchen Orders
              </span>
              <p className="font-serif text-3xl font-bold text-amber-400 mt-1">
                {activeOrdersCount}
              </p>
              <p className="text-[11px] text-gray-400 mt-2">
                Currently cooking or dispatched
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-nova-cardDark border border-white/10">
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Upcoming Reservations
              </span>
              <p className="font-serif text-3xl font-bold text-white mt-1">
                {upcomingReservationsCount}
              </p>
              <p className="text-[11px] text-nova-gold mt-2">
                Confirmed tables tonight & tomorrow
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-nova-cardDark border border-white/10">
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Completed Orders
              </span>
              <p className="font-serif text-3xl font-bold text-emerald-400 mt-1">
                {completedOrdersCount}
              </p>
              <p className="text-[11px] text-gray-400 mt-2">
                Fulfilled customer orders
              </p>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="p-6 rounded-2xl bg-nova-cardDark border border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-white">
                Incoming Live Orders
              </h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs text-nova-gold font-bold hover:underline"
              >
                View All Orders →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider">
                    <th className="pb-3">Order #</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Items</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Method</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord.id} className="hover:bg-white/5">
                      <td className="py-3 font-mono font-bold text-nova-gold">{ord.orderNumber}</td>
                      <td className="py-3 text-white">{ord.customerName}</td>
                      <td className="py-3 text-gray-300">{ord.items.length} items</td>
                      <td className="py-3 font-bold text-white">${ord.total.toFixed(2)}</td>
                      <td className="py-3 uppercase text-gray-400">{ord.paymentMethod}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full bg-white/10 font-bold uppercase text-[10px]">
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORDER MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h3 className="font-serif text-xl font-bold text-white">
            Live Order Management Board
          </h3>

          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-6 rounded-2xl bg-nova-cardDark border border-white/10 space-y-4 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-white/5">
                  <div>
                    <span className="font-mono text-xl font-bold text-nova-gold">
                      {ord.orderNumber}
                    </span>
                    <span className="ml-3 text-xs text-gray-400">
                      {new Date(ord.createdAt).toLocaleTimeString()} • {ord.customerName} ({ord.customerPhone})
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">Status:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      className="bg-neutral-900 border border-nova-gold/40 text-nova-gold rounded-lg px-3 py-1.5 text-xs font-bold uppercase focus:outline-none"
                    >
                      <option value="received">Received</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready / Dispatched</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 block font-semibold">Ordered Dishes:</span>
                    <ul className="space-y-1 mt-1 text-gray-200">
                      {ord.items.map((i, idx) => (
                        <li key={idx}>
                          {i.quantity}x {i.menuItem.name}{' '}
                          {i.selectedPortion && `(${i.selectedPortion.name})`}
                          {i.specialInstructions && (
                            <span className="text-nova-gold block text-[10px]">
                              Note: {i.specialInstructions}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-gray-400 block font-semibold">Fulfillment Info:</span>
                    <p className="text-gray-200 mt-1 uppercase font-bold">{ord.orderType}</p>
                    {ord.deliveryAddress ? (
                      <p className="text-gray-400">
                        {ord.deliveryAddress.street}, {ord.deliveryAddress.suburb}
                      </p>
                    ) : (
                      <p className="text-gray-400">Customer will collect at counter</p>
                    )}
                  </div>

                  <div>
                    <span className="text-gray-400 block font-semibold">Payment & Total:</span>
                    <p className="text-nova-gold font-bold text-sm mt-1">${ord.total.toFixed(2)}</p>
                    <p className="text-gray-400 uppercase">
                      {ord.paymentMethod} • {ord.paymentStatus}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: RESERVATION MANAGEMENT */}
      {activeTab === 'reservations' && (
        <div className="space-y-6">
          <h3 className="font-serif text-xl font-bold text-white">
            Table Reservations Management
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reservations.map((res) => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-nova-cardDark border border-white/10 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-base font-bold text-nova-gold">
                      {res.confirmationCode}
                    </span>
                    <h4 className="text-sm font-bold text-white">{res.customerName}</h4>
                    <p className="text-xs text-gray-400">{res.customerPhone} • {res.customerEmail}</p>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                      res.status === 'confirmed'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {res.status}
                  </span>
                </div>

                <div className="text-xs text-gray-300 space-y-1 bg-white/5 p-3 rounded-xl border border-white/5">
                  <p>
                    <strong>Date & Time:</strong> {res.date} at {res.time}
                  </p>
                  <p>
                    <strong>Guests:</strong> {res.guests} | <strong>Section:</strong> {res.seatingPreference.toUpperCase()} | <strong>Table:</strong> #{res.tableNumber || 'Auto'}
                  </p>
                  {res.dateNightPackageName && (
                    <p className="text-nova-gold font-bold">
                      Package: {res.dateNightPackageName}
                    </p>
                  )}
                  {res.specialRequests && (
                    <p className="text-gray-400 italic">Special: {res.specialRequests}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={() => updateReservationStatus(res.id, 'confirmed')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateReservationStatus(res.id, 'rejected')}
                    className="px-3 py-1.5 rounded-lg bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white text-xs font-bold transition"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MENU MANAGEMENT */}
      {activeTab === 'menu' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-bold text-white">
              Menu Items Catalog ({menuItems.length})
            </h3>
            <button
              onClick={handleOpenAddMeal}
              className="px-4 py-2.5 rounded-xl bg-nova-gold text-nova-black font-bold text-xs uppercase tracking-wider flex items-center space-x-1 hover:bg-nova-goldLight transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Dish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-nova-cardDark border border-white/10 flex space-x-3 items-center"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-900">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                  <p className="text-xs text-nova-gold font-bold">${item.price.toFixed(2)}</p>
                  <span className="text-[10px] uppercase text-gray-400 block mt-0.5">
                    Category: {item.categoryId}
                  </span>

                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => toggleItemAvailability(item.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.isAvailable
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {item.isAvailable ? 'In Stock' : 'Sold Out'}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <button
                    onClick={() => handleOpenEditMeal(item)}
                    className="p-2 text-gray-400 hover:text-nova-gold rounded-lg hover:bg-white/5"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteMenuItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Modal */}
          {showAddMealModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <form
                onSubmit={handleSaveMeal}
                className="w-full max-w-lg bg-nova-black border border-nova-gold/40 rounded-2xl p-6 sm:p-8 space-y-4"
              >
                <h3 className="font-serif text-2xl font-bold text-white">
                  {editingMeal ? 'Edit Dish' : 'Add New Dish to Menu'}
                </h3>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Dish Name
                  </label>
                  <input
                    type="text"
                    required
                    value={mealFormName}
                    onChange={(e) => setMealFormName(e.target.value)}
                    placeholder="e.g. Harare Prawn Skewers"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-nova-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Price (USD)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={mealFormPrice}
                      onChange={(e) => setMealFormPrice(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-nova-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      value={mealFormCategory}
                      onChange={(e) => setMealFormCategory(e.target.value as FoodCategory)}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-nova-gold"
                    >
                      <option value="grills">Flame Grills</option>
                      <option value="mains">Main Courses</option>
                      <option value="burgers">Burgers</option>
                      <option value="pizza">Pizza</option>
                      <option value="chicken">Chicken</option>
                      <option value="starters">Starters</option>
                      <option value="desserts">Desserts</option>
                      <option value="drinks">Drinks</option>
                      <option value="breakfast">Breakfast</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Description & Ingredients
                  </label>
                  <textarea
                    rows={3}
                    value={mealFormDesc}
                    onChange={(e) => setMealFormDesc(e.target.value)}
                    placeholder="Provide a luxurious sensory description of the dish..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-nova-gold resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Photo URL (Unsplash or Firebase Storage)
                  </label>
                  <input
                    type="url"
                    value={mealFormImage}
                    onChange={(e) => setMealFormImage(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-nova-gold"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddMealModal(false)}
                    className="px-4 py-2 text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-nova-gold text-nova-black font-bold text-xs uppercase"
                  >
                    Save Dish
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: MARKETING & PROMOTIONS */}
      {activeTab === 'marketing' && (
        <div className="space-y-8">
          <div className="p-6 rounded-2xl bg-nova-cardDark border border-white/10">
            <h3 className="font-serif text-lg font-bold text-white mb-4">
              Create Promotional Voucher Code
            </h3>
            <form onSubmit={handleCreatePromo} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Code (e.g. VIP20)"
                required
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white uppercase focus:outline-none focus:border-nova-gold"
              />
              <input
                type="text"
                placeholder="Promo Title"
                required
                value={promoTitle}
                onChange={(e) => setPromoTitle(e.target.value)}
                className="bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-nova-gold"
              />
              <input
                type="number"
                placeholder="Discount %"
                required
                value={promoDiscount}
                onChange={(e) => setPromoDiscount(Number(e.target.value))}
                className="bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-nova-gold"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-nova-gold text-nova-black font-bold text-xs uppercase hover:bg-nova-goldLight transition"
              >
                Add Promotion
              </button>
            </form>
          </div>

          {/* Active promotions list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {promotions.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-nova-cardDark border border-white/10 flex justify-between items-center"
              >
                <div>
                  <span className="font-mono font-bold text-nova-gold text-base">
                    {p.code}
                  </span>
                  <h4 className="text-sm font-bold text-white">{p.title}</h4>
                  <p className="text-xs text-gray-400">
                    {p.discountPercent}% discount • Min Spend: ${p.minSpend}
                  </p>
                </div>
                <button
                  onClick={() => togglePromotionActive(p.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    p.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {p.active ? 'Active' : 'Inactive'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
