'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CalendarDays, Crown, UtensilsCrossed } from 'lucide-react';

export default function WelcomePage() {
  return (
    <main className="min-h-screen bg-[#100f0d] text-white lg:grid lg:grid-cols-[1.1fr_.9fr]">
      <section className="relative hidden min-h-screen overflow-hidden lg:block">
        <Image src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=90" alt="Warmly lit Nova Diner dining room" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/25 to-[#100f0d]" />
        <div className="absolute inset-x-0 bottom-0 p-16">
          <span className="text-xs uppercase tracking-[.35em] text-[#d4af37]">Nova Diner · Bulawayo</span>
          <h1 className="mt-5 max-w-xl font-serif text-6xl leading-tight">A table for every occasion.</h1>
          <p className="mt-5 max-w-md text-base leading-7 text-white/70">Charcoal-fired flavor, warm hospitality, and evenings made memorable.</p>
        </div>
      </section>
      <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-lg">
          <Link href="/" className="mb-14 inline-flex items-center gap-3 lg:hidden">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-[#d4af37]/70 font-serif text-xl font-bold text-[#d4af37]">N</span>
            <span className="font-serif text-lg tracking-[.2em]">NOVA <small className="text-[10px] text-[#d4af37]">DINER</small></span>
          </Link>
          <div className="mb-10 hidden lg:block">
            <span className="text-xs uppercase tracking-[.35em] text-[#d4af37]">Welcome to Nova</span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#d4af37]">Your Nova experience begins here</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Come in. We’ve saved you a seat.</h2>
          <p className="mt-5 leading-7 text-white/60">Create an account or sign in to order your favorites, reserve a table, and enjoy Nova Privé rewards.</p>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {[{ icon: UtensilsCrossed, title: 'Order', text: 'Your favorites' }, { icon: CalendarDays, title: 'Reserve', text: 'A perfect table' }, { icon: Crown, title: 'Earn', text: 'Privé rewards' }].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                <Icon size={19} className="text-[#d4af37]" />
                <p className="mt-3 text-sm font-semibold">{title}</p>
                <p className="mt-1 text-xs text-white/45">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <Link href="/auth?mode=signup" className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-6 text-sm font-bold uppercase tracking-wider text-[#17140c] transition hover:bg-[#e4c65c]">Create account <ArrowRight size={17} /></Link>
            <Link href="/auth?mode=signin" className="inline-flex h-14 items-center justify-center rounded-xl border border-white/20 px-6 text-sm font-semibold transition hover:border-[#d4af37]/70 hover:bg-white/5">Sign in</Link>
          </div>
          <p className="mt-7 text-center text-xs text-white/35">By continuing, you agree to our terms and privacy policy.</p>
        </div>
      </section>
    </main>
  );
}
