'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-nova-black border-t border-nova-gold/20 text-gray-300 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-nova-gold to-nova-goldDark p-0.5 shadow-gold">
                <div className="w-full h-full rounded-full bg-nova-black flex items-center justify-center">
                  <span className="font-serif text-nova-gold font-bold text-lg">N</span>
                </div>
              </div>
              <span className="font-serif text-xl font-bold tracking-widest text-nova-gold uppercase">
                NOVA DINER
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Bulawayo’s benchmark of culinary luxury. From charcoal flame grills to romantic starlight dining and artisanal stone-baked pizzas, crafted with passion.
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-nova-gold/30 flex items-center justify-center text-nova-gold hover:bg-nova-gold hover:text-black transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-nova-gold/30 flex items-center justify-center text-nova-gold hover:bg-nova-gold hover:text-black transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-nova-gold text-base font-semibold tracking-wider uppercase mb-5">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/menu" className="hover:text-nova-gold transition">
                  A La Carte Menu
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="hover:text-nova-gold transition">
                  Table Reservations
                </Link>
              </li>
              <li>
                <Link href="/date-night" className="text-nova-gold hover:text-amber-300 transition flex items-center">
                  Nova Date Night <span className="ml-2 text-[10px] bg-nova-gold/20 px-1.5 py-0.5 rounded text-nova-gold">VIP</span>
                </Link>
              </li>
              <li>
                <Link href="/rewards" className="hover:text-nova-gold transition">
                  Loyalty & Rewards
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-nova-gold transition">
                  Live Order Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours & Bulawayo Location */}
          <div>
            <h4 className="font-serif text-nova-gold text-base font-semibold tracking-wider uppercase mb-5">
              Bulawayo Diner
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-nova-gold mr-3 mt-1 shrink-0" />
                <span>Corner 12th Avenue & Robert Mugabe Way, Bulawayo, Zimbabwe</span>
              </li>
              <li className="flex items-center">
                <Clock className="w-4 h-4 text-nova-gold mr-3 shrink-0" />
                <span>Mon – Sun: 08:00 AM – 11:00 PM</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 text-nova-gold mr-3 shrink-0" />
                <span>+263 77 900 1122 / +263 9 881234</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 text-nova-gold mr-3 shrink-0" />
                <span>reservations@novadiner.co.zw</span>
              </li>
            </ul>
          </div>

          {/* Supported Zimbabwe Payments & Newsletter */}
          <div>
            <h4 className="font-serif text-nova-gold text-base font-semibold tracking-wider uppercase mb-5">
              Payments & VIP Club
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Accepted methods in Zimbabwe:
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2.5 py-1 text-xs rounded bg-white/5 border border-white/10 font-medium text-emerald-400">
                EcoCash
              </span>
              <span className="px-2.5 py-1 text-xs rounded bg-white/5 border border-white/10 font-medium text-amber-400">
                InnBucks
              </span>
              <span className="px-2.5 py-1 text-xs rounded bg-white/5 border border-white/10 font-medium text-blue-400">
                OneMoney
              </span>
              <span className="px-2.5 py-1 text-xs rounded bg-white/5 border border-white/10 font-medium text-gray-200">
                Visa / MC
              </span>
            </div>

            <p className="text-xs text-gray-400 mb-2">Subscribe for chef tastings & secret promotions:</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Nova Diner Bulawayo VIP list!'); }} className="flex">
              <input
                type="email"
                placeholder="Your email address"
                required
                className="bg-white/5 border border-nova-gold/30 rounded-l-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-nova-gold w-full"
              />
              <button
                type="submit"
                className="bg-nova-gold hover:bg-nova-goldLight text-nova-black font-bold px-3 py-2 rounded-r-lg text-xs transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-nova-gold/15 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Nova Diner Bulawayo. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center space-x-4">
            <span className="hover:text-nova-gold cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-nova-gold cursor-pointer">Terms of Dining</span>
            <span>•</span>
            <span className="text-nova-gold">Crafted with Luxury</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
