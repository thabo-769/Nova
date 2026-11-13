'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { MenuCard } from '@/components/MenuCard';
import { MealDetailModal } from '@/components/MealDetailModal';
import { MenuItem } from '@/types';
import {
  Sparkles,
  ArrowRight,
  Search,
  Calendar,
  Heart,
  Clock,
  ShieldCheck,
  Star,
  Award,
  ChevronRight,
  Flame,
  UtensilsCrossed,
  Gift
} from 'lucide-react';

export default function HomePage() {
  const { menuItems, categories, user, promotions } = useApp();
  const [selectedMeal, setSelectedMeal] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Featured meals
  const featuredDishes = menuItems.filter((i) => i.featured);
  const popularDishes = menuItems.filter((i) => i.popular);

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background imagery with dark luxury gradient overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop"
            alt="Nova Diner Bulawayo Dining Room"
            fill
            priority
            className="object-cover object-center scale-105 filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nova-black via-nova-black/70 to-nova-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08)_0%,_transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Top Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/60 border border-nova-gold/40 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-nova-gold animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold text-nova-gold">
              Bulawayo’s Finest Culinary Destination
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            A Symphony of <span className="gold-shimmer">Charcoal Flame</span> & Fine Living
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-10">
            Welcome to Nova Diner. Savor prime Zimbabwean aged steaks, woodfired artisan pizzas, and handcrafted cocktails. Order online for swift delivery or reserve an unforgettable table.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              href="/menu"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-nova-red to-nova-redDark text-white font-bold text-sm tracking-wider uppercase hover:shadow-redGlow transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Order Now</span>
            </Link>

            <Link
              href="/reservations"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-nova-gold hover:text-black text-white font-bold text-sm tracking-wider uppercase border border-nova-gold/40 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Table</span>
            </Link>

            <Link
              href="/date-night"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-nova-gold/20 hover:bg-nova-gold text-nova-gold hover:text-black font-bold text-sm tracking-wider uppercase border border-nova-gold transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-1.5"
            >
              <Heart className="w-4 h-4" />
              <span>Date Night</span>
            </Link>
          </div>

          {/* Quick Search Bar */}
          <div className="mt-12 max-w-xl mx-auto">
            <div className="relative glass-panel rounded-2xl p-2 shadow-2xl flex items-center">
              <Search className="w-5 h-5 text-nova-gold ml-3 mr-2" />
              <input
                type="text"
                placeholder="Search Wagyu burgers, Ribeye steak, Piri Piri chicken, cocktails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none px-2"
              />
              <Link
                href={searchQuery ? `/menu?q=${encodeURIComponent(searchQuery)}` : '/menu'}
                className="px-5 py-2.5 rounded-xl bg-nova-gold text-nova-black font-bold text-xs uppercase tracking-wider hover:bg-nova-goldLight transition whitespace-nowrap"
              >
                Find Food
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROMOTIONS & ANNOUNCEMENT BANNER */}
      {promotions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border border-nova-gold/30 p-6 sm:p-8 bg-gradient-to-r from-red-950/70 via-black to-neutral-900 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="px-3 py-1 rounded-full bg-nova-red text-white text-xs font-bold uppercase tracking-wider">
                  Special Offer Today
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {promotions[0].title}
                </h3>
                <p className="text-sm text-gray-300">
                  {promotions[0].subtitle} — Use voucher code{' '}
                  <span className="font-mono font-bold text-nova-gold bg-black/60 px-2 py-0.5 rounded border border-nova-gold/40">
                    {promotions[0].code}
                  </span>
                </p>
              </div>

              <Link
                href="/menu"
                className="px-6 py-3 rounded-xl bg-nova-gold text-nova-black font-bold text-xs uppercase tracking-wider hover:bg-nova-goldLight transition whitespace-nowrap flex items-center space-x-2"
              >
                <span>Claim Voucher</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 3. EXPERIENCE SHORTCUTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-nova-cardDark border border-nova-borderDark hover:border-nova-gold/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-nova-gold/10 border border-nova-gold/30 flex items-center justify-center text-nova-gold mb-4 group-hover:scale-110 transition">
              <Flame className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-white mb-1">
              Bulawayo Fast Delivery
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Piping hot meals dispatched straight to your doorstep across Burnside, Kumalo, Suburbs, & CBD.
            </p>
            <Link
              href="/menu"
              className="text-xs font-bold text-nova-gold flex items-center hover:text-amber-300 transition"
            >
              Order for Delivery <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-nova-cardDark border border-nova-borderDark hover:border-nova-gold/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-nova-red/10 border border-nova-red/30 flex items-center justify-center text-nova-red mb-4 group-hover:scale-110 transition">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-white mb-1">
              Nova Date Night
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Candlelight setups, velvet rose petals, custom lettering, and 3-course romance dining packages.
            </p>
            <Link
              href="/date-night"
              className="text-xs font-bold text-nova-gold flex items-center hover:text-amber-300 transition"
            >
              Explore Packages <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-nova-cardDark border border-nova-borderDark hover:border-nova-gold/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-white mb-1">
              Table Reservations
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Real-time table booking with double-booking prevention. Indoor, Patio, and VIP dining booths.
            </p>
            <Link
              href="/reservations"
              className="text-xs font-bold text-nova-gold flex items-center hover:text-amber-300 transition"
            >
              Reserve Table <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-nova-cardDark border border-nova-borderDark hover:border-nova-gold/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition">
              <Gift className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-white mb-1">
              Nova Privé Rewards
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Earn 10 points for every dollar spent. Redeem points for Wagyu burgers, vouchers, and table upgrades.
            </p>
            <Link
              href="/rewards"
              className="text-xs font-bold text-nova-gold flex items-center hover:text-amber-300 transition"
            >
              View My Rewards <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FOOD CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-nova-gold font-semibold">
              Curated Offerings
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">
              Explore Our Digital Menu
            </h2>
          </div>
          <Link
            href="/menu"
            className="text-xs font-bold text-nova-gold hover:underline flex items-center"
          >
            Full Menu <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.slice(1).map((cat) => (
            <Link
              key={cat.id}
              href={`/menu?category=${cat.id}`}
              className="p-4 rounded-xl bg-nova-cardDark border border-nova-borderDark hover:border-nova-gold/50 transition-all text-center group hover:-translate-y-1"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-white/5 group-hover:bg-nova-gold/20 flex items-center justify-center text-nova-gold mb-3 transition">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-gray-200 group-hover:text-nova-gold transition">
                {cat.name}
              </h4>
              <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. CHEF'S RECOMMENDATIONS (FEATURED DISHES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-nova-gold font-semibold flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-nova-gold" /> Executive Chef’s Selection
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">
              Today’s Featured Dishes
            </h2>
          </div>
          <Link
            href="/menu"
            className="text-xs font-bold text-nova-gold hover:underline flex items-center"
          >
            View All ({menuItems.length}) <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDishes.slice(0, 3).map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onSelect={(meal) => setSelectedMeal(meal)}
            />
          ))}
        </div>
      </section>

      {/* 6. POPULAR BULAWAYO FAVORITES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-nova-red font-semibold">
              Customer Highlights
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">
              Bulawayo Crowd Favorites
            </h2>
          </div>
          <Link
            href="/menu"
            className="text-xs font-bold text-nova-gold hover:underline flex items-center"
          >
            Explore Menu <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDishes.slice(0, 3).map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onSelect={(meal) => setSelectedMeal(meal)}
            />
          ))}
        </div>
      </section>

      {/* 7. NOVA DATE NIGHT SPOTLIGHT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-nova-gold/40 shadow-2xl">
          <div className="relative h-96 sm:h-[450px] w-full">
            <Image
              src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1600&auto=format&fit=crop"
              alt="Romantic Date Night Setup"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </div>

          <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-14 max-w-xl text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-nova-red/90 text-white text-[11px] font-bold uppercase tracking-wider mb-4 w-fit">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Exclusive Romantic Experience</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Plan Your Dream <span className="gold-shimmer">Nova Date Night</span>
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed mb-8">
              Celebrate anniversaries, romantic dates, or plan the ultimate surprise proposal. Enjoy private candlelit booths, fresh roses, chilled bubbly, and bespoke multi-course menus.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/date-night"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-nova-gold to-nova-goldDark text-nova-black font-bold text-xs uppercase tracking-wider hover:shadow-gold transition"
              >
                Book Date Night Package
              </Link>
              <Link
                href="/reservations"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider transition border border-white/20"
              >
                Standard Table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LOYALTY SUMMARY CARD IF USER LOGGED IN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-nova-cardDark to-neutral-900 border border-nova-gold/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-nova-gold/20 border border-nova-gold/40 flex items-center justify-center text-nova-gold">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-nova-gold font-bold">
                Nova Privé Club
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                {user ? `${user.name}’s Loyalty Rewards` : 'Earn Points With Every Meal'}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {user
                  ? `You currently have ${user.loyaltyPoints} points (${user.loyaltyTier} Tier).`
                  : 'Get 10 points per $1 spent on food orders & table reservations.'}
              </p>
            </div>
          </div>

          <Link
            href="/rewards"
            className="px-6 py-3 rounded-xl bg-nova-gold text-nova-black font-bold text-xs uppercase tracking-wider hover:bg-nova-goldLight transition whitespace-nowrap"
          >
            Redeem Rewards & Perks
          </Link>
        </div>
      </section>

      {/* Meal Customization Modal */}
      <MealDetailModal
        item={selectedMeal}
        isOpen={!!selectedMeal}
        onClose={() => setSelectedMeal(null)}
      />
    </div>
  );
}
