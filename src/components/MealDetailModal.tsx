'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItem, PortionOption } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  X,
  Star,
  Clock,
  Plus,
  Minus,
  Check,
  AlertCircle,
  Heart,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';

export const MealDetailModal: React.FC<{
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ item, isOpen, onClose }) => {
  const { addToCart, user, toggleFavorite } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedPortion, setSelectedPortion] = useState<PortionOption | undefined>(
    item?.portionSizes?.[0]
  );
  const [selectedCustomizations, setSelectedCustomizations] = useState<
    Record<string, string[]>
  >({});
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Reset or initialize when item changes
  React.useEffect(() => {
    if (item) {
      setQuantity(1);
      setSelectedPortion(item.portionSizes?.[0]);
      // set defaults for required customizations
      const defaults: Record<string, string[]> = {};
      if (item.customizations) {
        item.customizations.forEach((c) => {
          if (c.required && c.options.length > 0) {
            defaults[c.id] = [c.options[0].label];
          }
        });
      }
      setSelectedCustomizations(defaults);
      setSpecialInstructions('');
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const isFavorite = user?.favoriteItemIds.includes(item.id);

  // Calculate live item price including portion & customizations
  let calculatedUnitPrice = item.price;
  if (selectedPortion) {
    calculatedUnitPrice += selectedPortion.priceDelta;
  }
  if (item.customizations) {
    item.customizations.forEach((customGroup) => {
      const selectedForGroup = selectedCustomizations[customGroup.id] || [];
      customGroup.options.forEach((opt) => {
        if (selectedForGroup.includes(opt.label)) {
          calculatedUnitPrice += opt.extraPrice;
        }
      });
    });
  }
  const calculatedTotalPrice = Number((calculatedUnitPrice * quantity).toFixed(2));

  const handleToggleOption = (
    groupId: string,
    optionLabel: string,
    maxSelect = 1
  ) => {
    setSelectedCustomizations((prev) => {
      const current = prev[groupId] || [];
      if (maxSelect === 1) {
        return { ...prev, [groupId]: [optionLabel] };
      }
      if (current.includes(optionLabel)) {
        return {
          ...prev,
          [groupId]: current.filter((l) => l !== optionLabel),
        };
      } else {
        if (current.length < maxSelect) {
          return { ...prev, [groupId]: [...current, optionLabel] };
        }
        return prev;
      }
    });
  };

  const handleAddToCart = () => {
    addToCart(
      item,
      quantity,
      selectedPortion,
      selectedCustomizations,
      specialInstructions
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-nova-black border border-nova-gold/30 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col text-gray-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition backdrop-blur-sm border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(item.id)}
          className={`absolute top-4 left-4 z-20 p-2 rounded-full transition backdrop-blur-sm border ${
            isFavorite
              ? 'bg-nova-gold/80 border-nova-gold text-black'
              : 'bg-black/60 border-white/20 text-white hover:text-nova-gold'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Hero Photo & Badges */}
        <div className="relative h-64 sm:h-72 w-full bg-neutral-900 shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nova-black via-nova-black/30 to-transparent" />

          {/* Dietary tags */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
            {item.dietary.map((d) => (
              <span
                key={d}
                className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-nova-gold/40 text-[10px] font-bold uppercase tracking-wider text-nova-gold"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Title, rating, prep time */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-nova-gold font-semibold">
                Nova Diner Signature
              </span>
              <div className="flex items-center space-x-3 text-xs text-gray-300">
                <span className="flex items-center text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  {item.rating} ({item.reviewsCount} reviews)
                </span>
                <span>•</span>
                <span className="flex items-center text-gray-400">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {item.prepTimeMinutes} mins
                </span>
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              {item.name}
            </h2>

            <p className="text-gray-300 text-sm mt-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Ingredients list */}
          {item.ingredients.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Ingredients & Fresh Sourcing
              </h4>
              <p className="text-xs text-gray-300 bg-white/5 p-3 rounded-xl border border-white/10 leading-relaxed">
                {item.ingredients.join(' • ')}
              </p>
            </div>
          )}

          {/* Allergens warning */}
          {item.allergens.length > 0 && (
            <div className="flex items-center space-x-2 text-xs text-amber-300 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>
                <strong>Allergen notice:</strong> Contains{' '}
                {item.allergens.join(', ')}. Please advise staff of any severe allergies.
              </span>
            </div>
          )}

          {/* Portion Sizes */}
          {item.portionSizes && item.portionSizes.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                Select Portion Size
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {item.portionSizes.map((portion) => {
                  const isSelected = selectedPortion?.name === portion.name;
                  return (
                    <button
                      key={portion.name}
                      type="button"
                      onClick={() => setSelectedPortion(portion)}
                      className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                        isSelected
                          ? 'border-nova-gold bg-nova-gold/10 shadow-gold'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-gray-100">{portion.name}</p>
                        <p className="text-[11px] text-gray-400">
                          {portion.priceDelta > 0
                            ? `+$${portion.priceDelta.toFixed(2)}`
                            : 'Standard cut'}
                        </p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-nova-gold" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Customizations / Add-ons */}
          {item.customizations &&
            item.customizations.map((group) => {
              const selectedInGroup = selectedCustomizations[group.id] || [];
              return (
                <div key={group.id}>
                  <div className="flex justify-between items-center mb-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      {group.name}
                    </h4>
                    {group.required && (
                      <span className="text-[10px] text-nova-gold uppercase font-semibold">
                        Required
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.options.map((opt) => {
                      const isOptSelected = selectedInGroup.includes(opt.label);
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() =>
                            handleToggleOption(
                              group.id,
                              opt.label,
                              group.maxSelect || 1
                            )
                          }
                          className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
                            isOptSelected
                              ? 'border-nova-gold bg-nova-gold/10'
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs text-gray-200">{opt.label}</span>
                          <span className="text-xs font-semibold text-nova-gold">
                            {opt.extraPrice > 0
                              ? `+$${opt.extraPrice.toFixed(2)}`
                              : 'Free'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

          {/* Special Instructions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Special Chef Instructions
            </h4>
            <textarea
              rows={2}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra sauce on the side, dressing separate, no onions..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-nova-gold resize-none"
            />
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-5 border-t border-nova-gold/20 bg-gradient-to-b from-nova-cardDark to-nova-black flex items-center justify-between">
          <div className="flex items-center space-x-3 bg-black/60 rounded-xl border border-white/10 px-3 py-1.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 text-gray-400 hover:text-white transition"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold text-white px-2">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 text-gray-400 hover:text-white transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-nova-gold to-nova-goldDark text-nova-black font-bold text-xs uppercase tracking-wider hover:shadow-gold transition flex items-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart • ${calculatedTotalPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
