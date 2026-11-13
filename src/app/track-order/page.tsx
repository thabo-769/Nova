'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Order, OrderStatus } from '@/types';
import {
  Search,
  CheckCircle,
  Clock,
  ChefHat,
  Bike,
  PackageCheck,
  MapPin,
  Phone,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const { orders, getOrderById } = useApp();
  const [searchInput, setSearchInput] = useState(initialId);
  const [currentOrder, setCurrentOrder] = useState<Order | undefined>(() => {
    if (initialId) return getOrderById(initialId);
    return orders[0];
  });

  useEffect(() => {
    if (initialId) {
      const found = getOrderById(initialId);
      if (found) setCurrentOrder(found);
    }
  }, [initialId, orders, getOrderById]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const found = getOrderById(searchInput.trim());
    if (found) {
      setCurrentOrder(found);
    } else {
      alert(`No order found matching "${searchInput}". Please check your order reference number.`);
    }
  };

  const steps: { status: OrderStatus; label: string; desc: string; icon: any }[] = [
    {
      status: 'received',
      label: 'Order Received',
      desc: 'Sent to Nova Diner Bulawayo POS',
      icon: Clock,
    },
    {
      status: 'confirmed',
      label: 'Confirmed',
      desc: 'Payment verified & order approved',
      icon: CheckCircle,
    },
    {
      status: 'preparing',
      label: 'Kitchen Cooking',
      desc: 'Executive chef is on the grill',
      icon: ChefHat,
    },
    {
      status: 'ready',
      label: currentOrder?.orderType === 'delivery' ? 'Dispatched' : 'Ready for Collection',
      desc:
        currentOrder?.orderType === 'delivery'
          ? 'Courier on the road to your location'
          : 'Waiting at restaurant collection counter',
      icon: Bike,
    },
    {
      status: 'delivered',
      label: currentOrder?.orderType === 'delivery' ? 'Delivered' : 'Collected',
      desc: 'Enjoy your Nova Diner culinary feast',
      icon: PackageCheck,
    },
  ];

  const getStepIndex = (status: OrderStatus) => {
    const orderMap: Record<OrderStatus, number> = {
      received: 0,
      confirmed: 1,
      preparing: 2,
      ready: 3,
      delivered: 4,
      cancelled: -1,
    };
    return orderMap[status] ?? 0;
  };

  const currentStepIndex = currentOrder ? getStepIndex(currentOrder.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Search Order Bar */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-nova-gold font-semibold flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 mr-1 text-nova-gold" /> Live Order Tracking
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
          Track Your Culinary Order
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Enter your Nova order reference code (e.g. NV-9821) to check live cooking and dispatch progress.
        </p>

        <form onSubmit={handleSearch} className="flex mt-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Enter Order # (e.g. NV-9821)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-white/5 border border-nova-gold/30 rounded-l-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-nova-gold uppercase"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-r-xl bg-nova-gold text-nova-black font-bold text-xs uppercase tracking-wider hover:bg-nova-goldLight transition whitespace-nowrap"
          >
            Track Order
          </button>
        </form>
      </div>

      {currentOrder ? (
        <div className="p-6 sm:p-10 rounded-2xl bg-nova-cardDark border border-nova-gold/30 shadow-2xl space-y-10">
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs text-gray-400 uppercase tracking-wider block">
                Order Reference
              </span>
              <h2 className="font-mono text-2xl sm:text-3xl font-bold text-nova-gold">
                {currentOrder.orderNumber}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Placed on {new Date(currentOrder.createdAt).toLocaleTimeString()} • {currentOrder.orderType.toUpperCase()}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  currentOrder.status === 'delivered'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : currentOrder.status === 'cancelled'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'bg-nova-gold/20 text-nova-gold border border-nova-gold/40 animate-pulse'
                }`}
              >
                ● {currentOrder.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0" />
            <div
              className="hidden md:block absolute top-1/2 left-0 h-1 bg-nova-gold -translate-y-1/2 z-0 transition-all duration-500"
              style={{
                width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
              {steps.map((st, idx) => {
                const Icon = st.icon;
                const isCompleted = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div
                    key={st.status}
                    className="flex md:flex-col items-center md:text-center space-x-4 md:space-x-0 group"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                        isCurrent
                          ? 'bg-nova-gold text-nova-black shadow-gold scale-110'
                          : isCompleted
                          ? 'bg-emerald-500 text-black'
                          : 'bg-black/60 text-gray-500 border border-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="mt-0 md:mt-3">
                      <p
                        className={`text-xs font-bold uppercase tracking-wider ${
                          isCurrent
                            ? 'text-nova-gold'
                            : isCompleted
                            ? 'text-white'
                            : 'text-gray-500'
                        }`}
                      >
                        {st.label}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5 max-w-[140px] md:mx-auto">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Timeline Audit Feed */}
          <div className="p-5 rounded-xl bg-black/60 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-nova-gold">
              Live Status Log:
            </h4>
            <div className="space-y-2">
              {currentOrder.timeline.map((log, i) => (
                <div key={i} className="flex items-start text-xs text-gray-300 space-x-3">
                  <span className="text-gray-500 font-mono shrink-0">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="text-nova-gold font-bold uppercase shrink-0">[{log.status}]</span>
                  <span>{log.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details & Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
            {/* Customer & Delivery */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Customer & Destination
              </h4>
              <div className="text-xs text-gray-300 space-y-1.5">
                <p className="font-semibold text-white">{currentOrder.customerName}</p>
                <p className="flex items-center text-gray-400">
                  <Phone className="w-3.5 h-3.5 mr-2 text-nova-gold" />
                  {currentOrder.customerPhone}
                </p>
                {currentOrder.deliveryAddress ? (
                  <p className="flex items-start text-gray-400">
                    <MapPin className="w-3.5 h-3.5 mr-2 text-nova-gold shrink-0 mt-0.5" />
                    <span>
                      {currentOrder.deliveryAddress.street}, {currentOrder.deliveryAddress.suburb}, {currentOrder.deliveryAddress.city}
                      {currentOrder.deliveryAddress.notes && ` (${currentOrder.deliveryAddress.notes})`}
                    </span>
                  </p>
                ) : (
                  <p className="text-nova-gold font-medium">
                    Collection at Nova Diner (12th Ave & R. Mugabe Way)
                  </p>
                )}
                <p className="text-gray-400 pt-1">
                  Payment: <span className="text-white font-medium uppercase">{currentOrder.paymentMethod}</span> ({currentOrder.paymentStatus})
                </p>
              </div>
            </div>

            {/* Ordered Items List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Order Items ({currentOrder.items.length})
              </h4>
              <div className="space-y-2">
                {currentOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-gray-200">
                      <span className="font-bold text-nova-gold">{it.quantity}x</span> {it.menuItem.name}
                    </span>
                    <span className="font-semibold text-gray-300">${it.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-bold text-white">
                  <span>Total Paid</span>
                  <span className="text-nova-gold font-serif text-base">${currentOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p>Please enter an order number above to view tracking details.</p>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-nova-gold font-serif">
          Loading Order Tracker...
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
