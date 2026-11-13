'use client';

import React, { useState } from 'react';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { AuthModal } from '@/components/AuthModal';

export const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authOpen, setAuthOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-nova-black text-gray-100 transition-colors">
        <Navbar onOpenAuth={() => setAuthOpen(true)} />
        <main className="flex-1">{children}</main>
        <Footer />

        <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
        <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
    </AppProvider>
  );
};
