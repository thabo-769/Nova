'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { MenuCard } from '@/components/MenuCard';
import { MealDetailModal } from '@/components/MealDetailModal';
import { MenuItem, FoodCategory } from '@/types';
import { Search, SlidersHorizontal, Utensils, Sparkles, Filter, Plus } from 'lucide-react';
import Link from 'next/link';
import { FoodArt, ScreenHeader } from '@/components/MobileNav';

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as FoodCategory) || 'all';
  const initialQuery = searchParams.get('q') || '';

  const { menuItems, categories, addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedMeal, setSelectedMeal] = useState<MenuItem | null>(null);
  const [mobileCategory, setMobileCategory] = useState('All');

  // Filtered and sorted meals
  const filteredMeals = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.categoryId !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter !== 'all' && !item.dietary.includes(dietaryFilter as any)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients.some((ing) => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesIngredients) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default featured
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [menuItems, selectedCategory, dietaryFilter, searchQuery, sortBy]);

  const mobileCategories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];
  const mobileMeals = filteredMeals.filter((item) => mobileCategory === 'All' ||
    item.categoryId.toLowerCase().includes(mobileCategory === 'Mains' ? 'main' : mobileCategory.toLowerCase().replace(/s$/, '')));
  return (
    <><div className="mobile-page mobile-menu-page"><ScreenHeader title="Menu" back right={<Link href="/cart" aria-label="Open cart"><Search size={21}/></Link>}/>
      <div className="mobile-pills">{mobileCategories.map((category)=><button key={category} className={mobileCategory===category?'selected':''} onClick={()=>setMobileCategory(category)}>{category}</button>)}</div>
      <div className="mobile-menu-list">{mobileMeals.map((item,index)=><article className="mobile-menu-card" key={item.id}><FoodArt kind={index%4===1?'pasta':index%4===2?'burger':index%4===3?'pizza':'steak'} src={item.image} alt={item.name}/><div><strong>{item.name}</strong><p>{item.description}</p><b>${item.price.toFixed(2)}</b></div><button aria-label={`Add ${item.name} to cart`} onClick={()=>addToCart(item)}><Plus size={22}/></button></article>)}</div>
      <Link className="mobile-cart-fab" href="/cart">View Cart</Link>
    </div><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 desktop-menu">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Digital Culinary Menu
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Handcrafted by our culinary team. All steaks 28-day aged, pizzas stone-baked, and chicken flame-roasted to perfection.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-nova-gold/20 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search meal or ingredient..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-nova-gold"
          />
        </div>

        {/* Dietary Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs text-gray-400 flex items-center shrink-0 mr-1">
            <Filter className="w-3 h-3 mr-1 text-nova-gold" /> Filter:
          </span>
          {[
            { id: 'all', label: 'All' },
            { id: 'halal', label: 'Halal' },
            { id: 'vegetarian', label: 'Vegetarian' },
            { id: 'gluten-free', label: 'Gluten-Free' },
            { id: 'spicy', label: 'Spicy' },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setDietaryFilter(d.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition ${
                dietaryFilter === d.id
                  ? 'bg-nova-gold text-nova-black font-bold'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center space-x-2 shrink-0 w-full md:w-auto justify-end">
          <SlidersHorizontal className="w-3.5 h-3.5 text-nova-gold" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-neutral-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-nova-gold"
          >
            <option value="featured">Featured / Chef Pick</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-nova-gold/15">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                isActive
                  ? 'bg-nova-gold text-nova-black shadow-gold scale-105'
                  : 'bg-nova-cardDark text-gray-400 hover:text-white border border-nova-borderDark'
              }`}
            >
              <Utensils className="w-3 h-3" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Meals Grid */}
      {filteredMeals.length === 0 ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-nova-gold/30 flex items-center justify-center mx-auto text-nova-gold">
            <Utensils className="w-8 h-8 opacity-50" />
          </div>
          <h3 className="font-serif text-xl font-bold text-white">
            No dishes found matching your criteria
          </h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Try adjusting your search terms or dietary filters to browse other items.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setDietaryFilter('all');
              setSearchQuery('');
            }}
            className="px-5 py-2 rounded-xl bg-nova-gold text-nova-black font-bold text-xs uppercase"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onSelect={(meal) => setSelectedMeal(meal)}
            />
          ))}
        </div>
      )}

      {/* Meal Customization Modal */}
      <MealDetailModal
        item={selectedMeal}
        isOpen={!!selectedMeal}
        onClose={() => setSelectedMeal(null)}
      />
    </div></>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-nova-gold font-serif">
          Loading Nova Diner Menu...
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
