'use client';

import React from 'react';
import Image from 'next/image';
import { MenuItem } from '@/types';
import { useApp } from '@/context/AppContext';
import { Star, Clock, Plus, Heart, Sparkles } from 'lucide-react';

export const MenuCard: React.FC<{
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}> = ({ item, onSelect }) => {
  const { addToCart, user, toggleFavorite } = useApp();
  const isFavorite = user?.favoriteItemIds.includes(item.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item, 1, item.portionSizes?.[0]);
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className="group relative bg-nova-cardDark rounded-2xl overflow-hidden border border-nova-borderDark hover:border-nova-gold/40 shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
    >
      {/* Top Image Box */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-900">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nova-cardDark via-transparent to-black/30" />

        {/* Favorite Button */}
        <button
          onClick={handleToggleFav}
          aria-label="Add to favorites"
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
            isFavorite
              ? 'bg-nova-red/90 text-white'
              : 'bg-black/40 text-white hover:text-nova-red hover:bg-black/70'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {item.featured && (
            <span className="px-2.5 py-0.5 rounded-full bg-nova-gold/90 text-nova-black text-[10px] font-black uppercase tracking-wider shadow-md flex items-center">
              <Sparkles className="w-3 h-3 mr-1" /> Chef Recommends
            </span>
          )}
          {item.popular && (
            <span className="px-2.5 py-0.5 rounded-full bg-nova-red/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
              Most Popular
            </span>
          )}
        </div>

        {/* Dietary pills */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px]">
          <div className="flex gap-1">
            {item.dietary.slice(0, 2).map((d) => (
              <span
                key={d}
                className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-gray-300 border border-white/10 uppercase text-[9px] font-semibold"
              >
                {d}
              </span>
            ))}
          </div>

          <span className="flex items-center bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-md text-amber-400 font-bold border border-white/10">
            <Star className="w-3 h-3 fill-current mr-1" />
            {item.rating}
          </span>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between mb-1.5">
            <h3 className="font-serif text-lg font-bold text-white group-hover:text-nova-gold transition-colors line-clamp-1">
              {item.name}
            </h3>
          </div>

          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
            {item.description}
          </p>
        </div>

        {/* Price & Quick Add Button */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-500 block">
              Price
            </span>
            <span className="font-serif text-lg font-bold text-nova-gold">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-nova-gold hover:text-black border border-nova-gold/30 text-nova-gold font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center space-x-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
