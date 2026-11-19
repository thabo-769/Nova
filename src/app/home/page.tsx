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
import { BookOpen, Coffee, Plus, Search, ShoppingCart, ChefHat } from 'lucide-react';
import { FoodArt, NovaLogo } from '@/components/MobileNav';

function MobileHome() {
  const { menuItems, addToCart, cartCount } = useApp();
  const featured = menuItems.filter((item) => item.featured || item.popular).slice(0, 2);
  return <div className="mobile-page mobile-home">
    <div className="mobile-brandbar"><Link href="/" className="mobile-brand"><NovaLogo/> <span>NOVA <b>DINER</b></span></Link><div className="mobile-head-actions"><Link href="/menu" aria-label="Search menu"><Search/></Link><Link href="/cart" aria-label={`Cart, ${cartCount} items`} className="mobile-cart-link"><ShoppingCart/>{cartCount > 0 && <i>{cartCount}</i>}</Link></div></div>
    <section className="mobile-hero-card"><FoodArt kind="steak" src={featured[0]?.image} alt={featured[0]?.name || 'Grilled steak'} /><div className="mobile-hero-shade"/><div className="mobile-hero-copy"><span className="mobile-eyebrow">WELCOME TO NOVA DINER</span><h1>A Taste of<br/><em>Elegance</em></h1><p>Charcoal-fired flavor,<br/> made for sharing.</p><Link href="/menu" className="mobile-cta small order-cta">Order Now <ArrowRight size={18}/></Link></div><div className="mobile-hero-dots"><i/><i/><i/><i/></div></section>
    <div className="mobile-shortcuts">{[{name:'Food',icon:UtensilsCrossed,href:'/menu'},{name:'Drinks',icon:Coffee,href:'/menu?category=drinks'},{name:'Offers',icon:Gift,href:'/rewards'},{name:'Menu',icon:BookOpen,href:'/menu'}].map(({name,icon:Icon,href})=><Link href={href} key={name}><Icon size={24} strokeWidth={1.8}/>{name}</Link>)}</div>
    <section className="mobile-section"><div className="mobile-section-title"><h2>Popular Dishes</h2><Link href="/menu">See all <ArrowRight size={14}/></Link></div><div className="mobile-feature-grid">{featured.map((item,index)=><article className="mobile-feature-card" key={item.id}><FoodArt kind={index ? 'pasta' : 'steak'} src={item.image} alt={item.name}/><strong>{item.name}</strong><b>${item.price.toFixed(2)}</b><button onClick={()=>addToCart(item)} aria-label={`Add ${item.name} to cart`}><Plus size={22}/></button></article>)}</div></section>
    <Link href="/about" className="mobile-about-link"><span className="promo-chef"><ChefHat/></span><span><strong>Good Food.<br/>Great Mood.</strong><small>Dine, Share, Enjoy.</small><b>View Menu <ArrowRight size={14}/></b></span><FoodArt kind="restaurant" src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop" alt="Warmly lit restaurant table"/></Link>
  </div>;
}

export default function HomePage() {
  const { menuItems, categories, user, promotions } = useApp();
  const [selectedMeal, setSelectedMeal] = useState<MenuItem | null>(null);

  // Featured meals
  const featuredDishes = menuItems.filter((i) => i.featured);
  const popularDishes = menuItems.filter((i) => i.popular);

  return (
    <><MobileHome /><div className="space-y-16 pb-20 desktop-home">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

        <div className="relative z-10 min-h-screen w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 text-left py-20 flex flex-col items-start justify-center">
          {/* Main Headline */}
          <p className="relative -top-6 text-xs sm:text-sm font-semibold uppercase tracking-[.32em] text-nova-gold mb-5">Welcome to Nova Diner</p>
          <h1 className="relative -top-6 font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6 max-w-3xl">
            A Taste of <span className="gold-shimmer">Elegance</span>
          </h1>

          <p className="relative -top-6 max-w-xl text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-10">
            Charcoal-fired flavor, made for sharing.
          </p>

          {/* Primary Action Buttons */}
          <div className="absolute bottom-16 left-6 sm:left-10 lg:left-14 mt-0 w-full max-w-md px-0 flex flex-col sm:flex-row items-start justify-start gap-4">
            <Link
              href="/menu"
              className="order-cta w-full sm:w-auto px-8 py-4 rounded-xl bg-black text-nova-gold border border-nova-gold font-bold text-sm tracking-wider uppercase hover:shadow-gold transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
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

          </div>

        </div>
      </section>

      {/* 2. PROMOTIONS & ANNOUNCEMENT BANNER */}
      {promotions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border border-nova-gold/30 p-6 sm:p-8 bg-gradient-to-r from-amber-950/40 via-black to-neutral-900 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="px-3 py-1 rounded-full bg-nova-gold text-black text-xs font-bold uppercase tracking-wider">
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
            <div className="w-12 h-12 rounded-xl bg-nova-gold/10 border border-nova-gold/30 flex items-center justify-center text-nova-gold mb-4 group-hover:scale-110 transition">
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
            <h2 className="font-serif text-3xl font-bold text-white">
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
            <h2 className="font-serif text-3xl font-bold text-white">
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
            <h2 className="font-serif text-3xl font-bold text-white">
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
    </div></>
  );
}
