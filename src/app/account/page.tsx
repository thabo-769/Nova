'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import {
  User,
  ShoppingBag,
  Calendar,
  Heart,
  MapPin,
  Sparkles,
  LogOut,
  Phone,
  Mail,
  Plus,
  Trash2,
  ChevronRight,
  Clock,
} from 'lucide-react';

export default function AccountPage() {
  const {
    user,
    logout,
    orders,
    reservations,
    menuItems,
    addDeliveryAddress,
    toggleFavorite,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'favorites' | 'addresses'>('orders');

  // New address form state
  const [newStreet, setNewStreet] = useState('');
  const [newSuburb, setNewSuburb] = useState('Burnside');
  const [newNotes, setNewNotes] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-nova-gold/30 flex items-center justify-center mx-auto text-nova-gold">
          <User className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-white">
          Sign In Required
        </h2>
        <p className="text-xs text-gray-400">
          Please sign in to view your profile, order history, and saved addresses.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-nova-gold text-nova-black font-bold text-xs uppercase tracking-wider"
        >
          Return Home & Sign In
        </Link>
      </div>
    );
  }

  const userOrders = orders.filter((o) => o.userId === user.id || o.customerEmail === user.email);
  const userReservations = reservations.filter(
    (r) => r.userId === user.id || r.customerEmail === user.email
  );
  const favoriteItems = menuItems.filter((i) => user.favoriteItemIds.includes(i.id));

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet) return;
    addDeliveryAddress({
      label: 'Home/Office',
      street: newStreet,
      suburb: newSuburb,
      city: 'Bulawayo',
      notes: newNotes,
    });
    setNewStreet('');
    setNewNotes('');
    setShowAddressModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Profile Header */}
      <div className="p-8 rounded-3xl bg-nova-cardDark border border-nova-gold/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-nova-gold shadow-gold bg-neutral-800">
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt={user.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-serif text-3xl font-bold text-nova-gold">
                {user.name.charAt(0)}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {user.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-nova-gold/20 text-nova-gold text-xs font-bold border border-nova-gold/40">
                {user.loyaltyTier}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-1">
              <span className="flex items-center">
                <Mail className="w-3.5 h-3.5 mr-1 text-nova-gold" /> {user.email}
              </span>
              {user.phone && (
                <span className="flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1 text-nova-gold" /> {user.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-right">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
              Loyalty Balance
            </span>
            <span className="font-serif text-xl font-bold text-nova-gold">
              {user.loyaltyPoints} pts
            </span>
          </div>

          <button
            onClick={logout}
            className="p-3 rounded-xl bg-red-950/30 hover:bg-nova-red text-red-400 hover:text-white border border-red-500/30 transition flex items-center space-x-2 text-xs font-bold"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-nova-gold/20 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'orders', label: 'Order History', icon: ShoppingBag, count: userOrders.length },
          { id: 'reservations', label: 'Table Reservations', icon: Calendar, count: userReservations.length },
          { id: 'favorites', label: 'Favorites', icon: Heart, count: favoriteItems.length },
          { id: 'addresses', label: 'Delivery Addresses', icon: MapPin, count: user.savedAddresses.length },
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
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded-full">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {userOrders.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <ShoppingBag className="w-12 h-12 mx-auto text-gray-600 mb-3" />
              <p>No food orders placed yet.</p>
              <Link href="/menu" className="text-xs text-nova-gold font-bold mt-2 inline-block">
                Start Ordering →
              </Link>
            </div>
          ) : (
            userOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-6 rounded-2xl bg-nova-cardDark border border-white/10 hover:border-nova-gold/30 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="font-mono font-bold text-nova-gold text-lg">
                      {ord.orderNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-bold uppercase text-gray-300">
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(ord.createdAt).toLocaleDateString()} • {ord.items.length} items • Total: ${ord.total.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-300 mt-2">
                    {ord.items.map((i) => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <Link
                    href={`/track-order?id=${ord.orderNumber}`}
                    className="px-4 py-2 rounded-xl bg-nova-gold/10 hover:bg-nova-gold hover:text-black text-nova-gold border border-nova-gold/30 text-xs font-bold transition"
                  >
                    Track Status
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Reservations */}
      {activeTab === 'reservations' && (
        <div className="space-y-4">
          {userReservations.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <Calendar className="w-12 h-12 mx-auto text-gray-600 mb-3" />
              <p>No reservations currently booked.</p>
              <Link href="/reservations" className="text-xs text-nova-gold font-bold mt-2 inline-block">
                Book a Table Now →
              </Link>
            </div>
          ) : (
            userReservations.map((res) => (
              <div
                key={res.id}
                className="p-6 rounded-2xl bg-nova-cardDark border border-white/10 hover:border-nova-gold/30 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="font-mono font-bold text-nova-gold text-lg">
                      {res.confirmationCode}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">
                      {res.status}
                    </span>
                    {res.dateNightPackageName && (
                      <span className="px-2 py-0.5 rounded-full bg-nova-red/30 text-red-300 text-[11px] font-bold">
                        Date Night Privé
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-300">
                    {res.date} at {res.time} • {res.guests} Guests • Table #{res.tableNumber || 'Assigned on arrival'} ({res.seatingPreference.toUpperCase()})
                  </p>
                  {res.specialRequests && (
                    <p className="text-xs text-gray-400 italic mt-1">
                      Note: {res.specialRequests}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Favorites */}
      {activeTab === 'favorites' && (
        <div>
          {favoriteItems.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <Heart className="w-12 h-12 mx-auto text-gray-600 mb-3" />
              <p>You haven’t favorited any dishes yet.</p>
              <Link href="/menu" className="text-xs text-nova-gold font-bold mt-2 inline-block">
                Browse Menu →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-nova-cardDark border border-white/10 flex space-x-4 items-center"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                    <p className="text-xs text-nova-gold font-bold">${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="p-2 text-nova-red hover:bg-white/5 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              Bulawayo Delivery Addresses
            </h3>
            <button
              onClick={() => setShowAddressModal(true)}
              className="px-4 py-2 rounded-xl bg-nova-gold text-nova-black font-bold text-xs uppercase flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.savedAddresses.map((addr) => (
              <div
                key={addr.id}
                className="p-5 rounded-2xl bg-nova-cardDark border border-white/10 space-y-1 relative"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-nova-gold" />
                  <span className="text-sm font-bold text-white">{addr.label}</span>
                  {addr.isDefault && (
                    <span className="text-[10px] bg-nova-gold/20 text-nova-gold px-2 py-0.5 rounded-full font-bold">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-300">{addr.street}</p>
                <p className="text-xs text-gray-400">
                  {addr.suburb}, {addr.city}
                </p>
                {addr.notes && (
                  <p className="text-[11px] text-gray-500 italic mt-2">Note: {addr.notes}</p>
                )}
              </div>
            ))}
          </div>

          {/* Add Address Modal */}
          {showAddressModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <form
                onSubmit={handleAddAddress}
                className="w-full max-w-md bg-nova-black border border-nova-gold/40 rounded-2xl p-6 space-y-4"
              >
                <h3 className="font-serif text-xl font-bold text-white">
                  Add Bulawayo Address
                </h3>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    placeholder="12 Park Road"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-nova-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Suburb
                  </label>
                  <select
                    value={newSuburb}
                    onChange={(e) => setNewSuburb(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-nova-gold"
                  >
                    <option value="Burnside">Burnside</option>
                    <option value="Suburbs">Suburbs</option>
                    <option value="Hillside">Hillside</option>
                    <option value="Bradfield">Bradfield</option>
                    <option value="Kumalo">Kumalo</option>
                    <option value="CBD">Bulawayo CBD</option>
                    <option value="Matsheumhlope">Matsheumhlope</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Gate / Delivery Note
                  </label>
                  <input
                    type="text"
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="e.g. Ring left buzzer"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-nova-gold"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddressModal(false)}
                    className="px-4 py-2 text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-nova-gold text-nova-black font-bold text-xs uppercase"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
