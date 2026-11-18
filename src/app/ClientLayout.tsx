'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AppProvider, useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { AuthModal } from '@/components/AuthModal';
import { MobileNav } from '@/components/MobileNav';

export const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authOpen, setAuthOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <AppProvider>
      <GuardedLayout pathname={pathname} router={router} authOpen={authOpen} setAuthOpen={setAuthOpen} checkoutOpen={checkoutOpen} setCheckoutOpen={setCheckoutOpen}>
        {children}
      </GuardedLayout>
    </AppProvider>
  );
};

function GuardedLayout({ pathname, router, authOpen, setAuthOpen, checkoutOpen, setCheckoutOpen, children }: {
  pathname: string;
  router: ReturnType<typeof useRouter>;
  authOpen: boolean;
  setAuthOpen: (open: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const { user, isAuthReady } = useApp();
  const isPublic = pathname === '/' || pathname === '/auth';

  useEffect(() => {
    if (!isAuthReady) return;
    if (user && isPublic) router.replace('/home');
    else if (!user && !isPublic) router.replace('/');
  }, [isAuthReady, user, isPublic, router]);

  if (!isAuthReady || (!user && !isPublic) || (user && isPublic)) {
    return <div className="min-h-screen bg-nova-black" />;
  }
  const isEntry = pathname === '/' || pathname === '/auth';
  return (
      <div className="site-shell min-h-screen min-h-[100dvh] w-full flex flex-col bg-nova-black text-gray-100 transition-colors">
        {!isEntry && <div className="desktop-chrome desktop-navbar"><Navbar onOpenAuth={() => setAuthOpen(true)} /></div>}
        <main className="flex-1 mobile-main">{children}</main>
        {!isEntry && <div className="desktop-chrome desktop-footer"><Footer /></div>}
        {!isEntry && <div className="mobile-chrome"><MobileNav /></div>}

        <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
        <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
  );
}
