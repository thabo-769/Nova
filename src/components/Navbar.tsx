'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  ShoppingBag,
  Moon,
  Sun,
  Menu as MenuIcon,
  X,
  User,
  Heart,
  Calendar,
  Sparkles,
  Shield,
  UtensilsCrossed,
  LogOut,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC<{ onOpenAuth: () => void }> = ({ onOpenAuth }) => {
  const pathname = usePathname();
  const {
    theme,
    toggleTheme,
    user,
    logout,
    switchDemoUser,
    cartCount,
    total,
    setIsCartOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Digital Menu', href: '/menu' },
    { label: 'Book Table', href: '/reservations' },
    { label: 'Nova Date Night', href: '/date-night', highlight: true },
    { label: 'Track Order', href: '/track-order' },
    { label: 'Rewards', href: '/rewards' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-nova-gold/20 transition-all">
      {/* Top micro-bar for Zimbabwe location & quick role switcher */}
      <div className="bg-nova-black/95 dark:bg-black/80 text-xs text-gray-300 py-1 px-4 border-b border-nova-gold/10 hidden md:flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-nova-gold font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
            Nova Diner Bulawayo: Open Today 08:00 – 23:00
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-400">12th Ave & R. Mugabe Way, Bulawayo</span>
        </div>

        {/* Quick Demo Role Switcher for instant testing */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 text-[11px]">Role view:</span>
          <button
            onClick={() => switchDemoUser('customer')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
              user?.role === 'customer'
                ? 'bg-nova-gold text-nova-black'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => switchDemoUser('admin')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition flex items-center space-x-1 ${
              user?.role === 'admin'
                ? 'bg-nova-red text-white'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <Shield className="w-3 h-3 mr-0.5" /> Admin
          </button>
          <button
            onClick={() => switchDemoUser('kitchen')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition flex items-center space-x-1 ${
              user?.role === 'kitchen'
                ? 'bg-amber-600 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <UtensilsCrossed className="w-3 h-3 mr-0.5" /> Kitchen
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Branding */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-nova-gold to-nova-goldDark p-0.5 shadow-gold transition group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-nova-black flex items-center justify-center border border-nova-gold/50">
                <span className="font-serif text-nova-gold font-black text-xl tracking-wider">N</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-widest text-nova-gold uppercase">
                NOVA
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-400 font-semibold -mt-1">
                DINER • BULAWAYO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    link.highlight
                      ? 'text-nova-gold font-semibold flex items-center space-x-1 hover:text-amber-300'
                      : active
                      ? 'text-nova-gold font-semibold'
                      : 'text-gray-300 dark:text-gray-300 hover:text-nova-gold light:text-neutral-700'
                  }`}
                >
                  {link.highlight && <Sparkles className="w-3.5 h-3.5 text-nova-gold mr-1 inline" />}
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-nova-gold rounded-full"></span>
                  )}
                </Link>
              );
            })}

            {/* Admin or Kitchen direct shortcut if active */}
            {user?.role === 'admin' && (
              <Link
                href="/admin"
                className="px-3 py-1 text-xs font-semibold rounded-full bg-nova-red/20 border border-nova-red text-red-400 hover:bg-nova-red hover:text-white transition"
              >
                Admin Panel
              </Link>
            )}
            {user?.role === 'kitchen' && (
              <Link
                href="/kitchen"
                className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/20 border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black transition"
              >
                Kitchen KDS
              </Link>
            )}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-full text-gray-400 hover:text-nova-gold hover:bg-white/5 transition"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-nova-gold" /> : <Moon className="w-5 h-5 text-neutral-800" />}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
              className="relative flex items-center p-2 rounded-full hover:bg-white/5 transition group"
            >
              <ShoppingBag className="w-6 h-6 text-nova-gold group-hover:scale-105 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-nova-red text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-nova-gold/50 animate-bounce">
                  {cartCount}
                </span>
              )}
              {cartCount > 0 && (
                <span className="hidden xl:inline ml-2 text-xs font-semibold text-nova-gold">
                  ${total.toFixed(2)}
                </span>
              )}
            </button>

            {/* User Account / Profile */}
            <div className="relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-full border border-nova-gold/30 hover:border-nova-gold bg-nova-cardDark/60 transition"
                  >
                    <div className="w-7 h-7 rounded-full bg-nova-gold/20 flex items-center justify-center text-nova-gold text-xs font-bold border border-nova-gold/40">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-xs font-medium text-gray-200 hidden sm:inline max-w-[90px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl glass-panel shadow-2xl py-2 z-50 border border-nova-gold/30 text-sm">
                      <div className="px-4 py-2 border-b border-nova-gold/10">
                        <p className="font-semibold text-gray-100">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-[11px] px-2 py-0.5 rounded bg-nova-gold/20 text-nova-gold font-medium">
                            {user.loyaltyTier} Member
                          </span>
                          <span className="text-xs font-bold text-nova-gold">
                            {user.loyaltyPoints} pts
                          </span>
                        </div>
                      </div>

                      <Link
                        href="/account"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-gray-300 hover:bg-nova-gold/10 hover:text-nova-gold transition"
                      >
                        <User className="w-4 h-4 mr-3 text-nova-gold" />
                        My Profile & Orders
                      </Link>

                      <Link
                        href="/rewards"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-gray-300 hover:bg-nova-gold/10 hover:text-nova-gold transition"
                      >
                        <Sparkles className="w-4 h-4 mr-3 text-nova-gold" />
                        Nova Loyalty Rewards
                      </Link>

                      {user.role === 'admin' && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-red-400 hover:bg-nova-red/10 transition"
                        >
                          <Shield className="w-4 h-4 mr-3 text-nova-red" />
                          Restaurant Management
                        </Link>
                      )}

                      {user.role === 'kitchen' && (
                        <Link
                          href="/kitchen"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-amber-400 hover:bg-amber-500/10 transition"
                        >
                          <UtensilsCrossed className="w-4 h-4 mr-3 text-amber-400" />
                          Kitchen Display (KDS)
                        </Link>
                      )}

                      <div className="border-t border-nova-gold/10 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center px-4 py-2 text-left text-red-400 hover:bg-nova-red/10 transition"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-nova-gold to-nova-goldDark text-nova-black font-semibold text-xs tracking-wider uppercase hover:shadow-gold transition"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-nova-black border-b border-nova-gold/20 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-200 hover:text-nova-gold hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
          {user?.role === 'admin' && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-nova-red bg-nova-red/10"
            >
              Admin Dashboard
            </Link>
          )}
          {user?.role === 'kitchen' && (
            <Link
              href="/kitchen"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-amber-400 bg-amber-500/10"
            >
              Kitchen Display (KDS)
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
