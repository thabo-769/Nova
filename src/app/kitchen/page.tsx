'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Order, OrderStatus } from '@/types';
import {
  UtensilsCrossed,
  Clock,
  CheckCircle,
  AlertCircle,
  Flame,
  Volume2,
  ChefHat,
  PackageCheck,
  Sparkles,
} from 'lucide-react';

export default function KitchenDashboardPage() {
  const { orders, updateOrderStatus } = useApp();
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Filter for active orders that require kitchen attention
  const kitchenOrders = orders.filter((o) =>
    ['received', 'confirmed', 'preparing'].includes(o.status)
  );
  const readyOrders = orders.filter((o) => o.status === 'ready');

  const playAudioPing = () => {
    if (!soundEnabled) return;
    try {
      // Audio synth beep simulation
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.log('Audio Context unavailable:', e);
    }
  };

  const handleStartCooking = (orderId: string) => {
    updateOrderStatus(orderId, 'preparing', 'Chef Sibanda started firing the order on the grill.');
    playAudioPing();
  };

  const handleMarkReady = (orderId: string) => {
    updateOrderStatus(
      orderId,
      'ready',
      'Food is plated, garnished and waiting under heat lamps / dispatched to courier.'
    );
    playAudioPing();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* KDS Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-2xl bg-neutral-900 border border-amber-500/40 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
              Nova Diner Kitchen Display System (KDS)
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Grill & Prep Line
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playAudioPing();
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition ${
              soundEnabled
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                : 'bg-white/5 border-white/10 text-gray-400'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>Audio Chimes: {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            {kitchenOrders.length} Active Tickets
          </span>
        </div>
      </div>

      {/* Main Kitchen Orders Board */}
      {kitchenOrders.length === 0 ? (
        <div className="py-24 text-center space-y-4 bg-nova-cardDark rounded-3xl border border-white/5">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            All Kitchen Tickets Cleared!
          </h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            The pass is clear. New incoming orders from the online app will automatically appear here with audio chime.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kitchenOrders.map((order) => {
            const isCooking = order.status === 'preparing';
            return (
              <div
                key={order.id}
                className={`rounded-2xl overflow-hidden border transition-all flex flex-col justify-between shadow-2xl ${
                  isCooking
                    ? 'border-amber-500/60 bg-gradient-to-b from-amber-950/20 to-nova-cardDark'
                    : 'border-white/10 bg-nova-cardDark'
                }`}
              >
                {/* Ticket Header */}
                <div className="p-4 bg-black/60 border-b border-white/10 flex justify-between items-center">
                  <div>
                    <span className="font-mono text-xl font-black text-nova-gold">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs text-gray-400 block">
                      {order.customerName} • {order.orderType.toUpperCase()}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      isCooking
                        ? 'bg-amber-500 text-black animate-pulse'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {isCooking ? 'Cooking Now' : 'New Ticket'}
                  </span>
                </div>

                {/* Items & Cooking Checklist */}
                <div className="p-5 flex-1 space-y-4">
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1"
                      >
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-sm text-white">
                            <span className="text-nova-gold text-base mr-1">
                              {item.quantity}x
                            </span>{' '}
                            {item.menuItem.name}
                          </span>
                        </div>

                        {item.selectedPortion && (
                          <p className="text-xs text-nova-gold">
                            Portion: {item.selectedPortion.name}
                          </p>
                        )}

                        {/* Customizations tags */}
                        {Object.entries(item.selectedCustomizations).length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Object.values(item.selectedCustomizations).flat().map((c, i) => (
                              <span
                                key={i}
                                className="text-[10px] bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/20 font-bold"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.specialInstructions && (
                          <div className="mt-1.5 p-2 rounded bg-red-950/40 border border-red-500/30 text-[11px] text-red-200 font-medium">
                            ⚠️ Note: {item.specialInstructions}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {order.notes && (
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-xs text-gray-400 italic">
                      Order Note: {order.notes}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="p-4 bg-black/40 border-t border-white/10 flex items-center space-x-2">
                  {!isCooking ? (
                    <button
                      onClick={() => handleStartCooking(order.id)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <Flame className="w-4 h-4" />
                      <span>Start Cooking</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMarkReady(order.id)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-black text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <PackageCheck className="w-4 h-4" />
                      <span>Mark Ready for Pass</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pass / Ready for Pickup shelf */}
      {readyOrders.length > 0 && (
        <div className="p-6 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-4">
          <h3 className="font-serif text-lg font-bold text-emerald-400 flex items-center">
            <PackageCheck className="w-5 h-5 mr-2" /> Plated & Waiting at Pass ({readyOrders.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {readyOrders.map((ro) => (
              <div
                key={ro.id}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center"
              >
                <div>
                  <span className="font-mono font-bold text-white text-sm">
                    {ro.orderNumber}
                  </span>
                  <span className="text-xs text-gray-400 block">
                    {ro.customerName} ({ro.orderType.toUpperCase()})
                  </span>
                </div>
                <button
                  onClick={() => updateOrderStatus(ro.id, 'delivered', 'Order handed over.')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-bold uppercase transition"
                >
                  Handed Over
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
