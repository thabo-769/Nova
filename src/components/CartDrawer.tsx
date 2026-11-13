'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { X, Plus, Minus, Trash2, ArrowRight, Tag, ShoppingBag, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC<{ onCheckout: () => void }> = ({ onCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    subtotal,
    discount,
    deliveryFee,
    total,
    appliedPromo,
    applyPromoCode,
    removePromoCode
  } = useApp();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ message: string; success: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res);
  };

  const freeDeliveryThreshold = 50;
  const progressToFreeDelivery = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-nova-black border-l border-nova-gold/30 shadow-2xl flex flex-col text-gray-100">
          {/* Header */}
          <div className="p-5 border-b border-nova-gold/20 flex items-center justify-between bg-gradient-to-r from-nova-cardDark to-nova-black">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-5 h-5 text-nova-gold" />
              <h2 className="font-serif text-lg font-bold text-nova-gold tracking-wide">
                Your Culinary Selection
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          {cart.length > 0 && (
            <div className="px-5 py-3 bg-nova-gold/10 border-b border-nova-gold/20">
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-nova-gold flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  {remainingForFreeDelivery === 0
                    ? '🎉 You unlocked FREE Delivery across Bulawayo!'
                    : `Add $${remainingForFreeDelivery.toFixed(2)} more for FREE Delivery`}
                </span>
                <span className="text-gray-400">{Math.round(progressToFreeDelivery)}%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-nova-gold h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressToFreeDelivery}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-12">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-nova-gold/30 flex items-center justify-center mb-4 text-nova-gold">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-gray-200 mb-1">
                  Your cart is empty
                </h3>
                <p className="text-xs text-gray-400 max-w-xs mb-6">
                  Discover our flame grills, Wagyu burgers, and decadent desserts.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-nova-gold text-nova-black font-semibold text-xs tracking-wider uppercase hover:bg-nova-goldLight transition"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3.5 rounded-xl bg-nova-cardDark border border-nova-borderDark flex space-x-3 transition hover:border-nova-gold/30"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-neutral-800">
                    <Image
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-semibold text-gray-100 line-clamp-1">
                          {item.menuItem.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-gray-500 hover:text-red-400 transition ml-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedPortion && (
                        <p className="text-xs text-nova-gold mt-0.5">
                          {item.selectedPortion.name}
                        </p>
                      )}

                      {/* Customizations tags */}
                      {Object.entries(item.selectedCustomizations).length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {Object.values(item.selectedCustomizations).flat().map((c, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-gray-300"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.specialInstructions && (
                        <p className="text-[11px] text-gray-400 italic mt-1 line-clamp-1">
                          Note: {item.specialInstructions}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
                      <div className="flex items-center space-x-2 bg-black/40 rounded-lg border border-white/10 px-2 py-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, -1)}
                          className="text-gray-400 hover:text-nova-gold transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, 1)}
                          className="text-gray-400 hover:text-nova-gold transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-nova-gold">
                        ${item.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-nova-gold/20 bg-gradient-to-b from-nova-cardDark to-nova-black space-y-4">
              {/* Voucher Code Form */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-500/30 rounded-lg px-3 py-2 text-xs">
                    <span className="text-emerald-400 font-medium flex items-center">
                      <Tag className="w-3.5 h-3.5 mr-1.5" />
                      Code {appliedPromo.code} applied ({appliedPromo.discountPercent}% OFF)
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-gray-400 hover:text-red-400 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex">
                    <input
                      type="text"
                      placeholder="Promo voucher (e.g. NOVAGOLD)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="bg-black/60 border border-nova-gold/30 rounded-l-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-nova-gold uppercase w-full"
                    />
                    <button
                      type="submit"
                      className="bg-nova-gold/20 hover:bg-nova-gold text-nova-gold hover:text-black font-semibold px-4 py-2 rounded-r-lg text-xs border-y border-r border-nova-gold/30 transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoFeedback && !appliedPromo && (
                  <p className={`text-[11px] mt-1.5 ${promoFeedback.success ? 'text-emerald-400' : 'text-red-400'}`}>
                    {promoFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Voucher Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Bulawayo Express Delivery</span>
                  <span>{deliveryFee === 0 ? <span className="text-emerald-400 uppercase font-semibold">Free</span> : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between text-base font-bold text-white">
                  <span>Total Due</span>
                  <span className="text-nova-gold font-serif text-lg">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onCheckout();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-nova-gold to-nova-goldDark text-nova-black font-bold text-sm tracking-wider uppercase hover:shadow-gold transition flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
