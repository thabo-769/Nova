'use client';

import React, { useState } from 'react';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { AuthModal } from '@/components/AuthModal';
import { MobileNav } from '@/components/MobileNav';

export const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authOpen, setAuthOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <AppProvider>
      <div className="site-shell min-h-screen min-h-[100dvh] w-full flex flex-col bg-nova-black text-gray-100 transition-colors">
        <div className="desktop-chrome desktop-navbar"><Navbar onOpenAuth={() => setAuthOpen(true)} /></div>
        <main className="flex-1 mobile-main">{children}</main>
        <div className="desktop-chrome desktop-footer"><Footer /></div>
        <div className="mobile-chrome"><MobileNav /></div>

        <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
        <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
    </AppProvider>
  );
};
