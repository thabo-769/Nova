'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CalendarCheck, House, BookOpen, ShoppingBag, UserRound, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const tabs = [
  { href: '/', label: 'Home', icon: House },
  { href: '/menu', label: 'Menu', icon: BookOpen },
  { href: '/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/reservations', label: 'Bookings', icon: CalendarCheck },
  { href: '/profile', label: 'Profile', icon: UserRound },
];

export function MobileNav() {
  const pathname = usePathname();
  const { cartCount } = useApp();
  return <nav className="mobile-bottom-nav">
    {tabs.map(({ href, label, icon: Icon }) => {
      const active = href === '/' ? pathname === '/' : href === '/orders' ? pathname === '/orders' || pathname === '/cart' : pathname.startsWith(href);
      return <Link key={href} href={href} className={active ? 'active' : ''}>
        <span className="nav-icon-wrap"><Icon size={22} strokeWidth={1.8} />{label === 'Orders' && cartCount > 0 && <i>{cartCount}</i>}</span>
        <span>{label}</span>
      </Link>;
    })}
  </nav>;
}

export function NovaLogo({ className = '' }: { className?: string }) {
  return <svg className={`nova-logo ${className}`} viewBox="0 0 32 32" fill="none" aria-label="Nova Diner logo" role="img">
    <path d="M5 23h22M7 21a9 9 0 0 1 18 0M16 4v5m-2 0h4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="3.5" r="1.5" fill="currentColor" />
  </svg>;
}

export function FoodArt({ kind = 'steak', className = '', src, alt }: { kind?: string; className?: string; src?: string; alt?: string }) {
  return <div className={`food-art food-${kind} ${src ? 'has-photo' : ''} ${className}`} aria-label={alt || `${kind} image`}>
    {src ? <img src={src} alt={alt || kind} loading="lazy" /> : <><span /><i /></>}
  </div>;
}

export function ScreenHeader({ title, back = false, right }: { title: string; back?: boolean; right?: React.ReactNode }) {
  const router = useRouter();
  return <header className="mobile-screen-header">{back ? <button aria-label="Go back" onClick={() => router.back()}><ArrowLeft size={21}/></button> : <span />}
    <strong>{title}</strong>{right || <span />}</header>;
}
