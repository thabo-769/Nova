'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  User,
  Heart,
  Calendar,
  Sparkles,
  LogOut,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC<{ onOpenAuth: () => void }> = ({ onOpenAuth }) => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const {
    user,
    logout,
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
    <header className={isHome ? 'absolute inset-x-0 top-0 z-40 w-full bg-transparent border-0 shadow-none' : 'sticky top-0 z-40 w-full glass-panel border-b border-nova-gold/20 transition-all'}>
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

          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
              className="relative flex items-center p-2 rounded-full hover:bg-white/5 transition group"
            >
              <ShoppingBag className="w-6 h-6 text-nova-gold group-hover:scale-105 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-nova-gold text-black text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-black/20 animate-bounce">
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


                      <div className="border-t border-nova-gold/10 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center px-4 py-2 text-left text-nova-gold hover:bg-nova-gold/10 transition"
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
        </div>
      )}
    </header>
  );
};
