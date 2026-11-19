'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function WelcomePage() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#100f0d] text-white">
      <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=90" alt="Elegant candlelit restaurant dining room" fill priority className="absolute inset-0 -z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,6,4,.88),rgba(7,6,4,.62)),linear-gradient(0deg,rgba(7,6,4,.78),rgba(7,6,4,.2))]" />
      <section className="flex min-h-screen w-full items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-lg rounded-[30px] border border-white/10 bg-black/35 p-6 shadow-2xl backdrop-blur-[3px] sm:p-10">
          <Link href="/" className="mb-14 inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-[#d4af37]/70 font-serif text-xl font-bold text-[#d4af37]">N</span>
            <span className="font-serif text-lg tracking-[.2em]">NOVA <small className="text-[10px] text-[#d4af37]">DINER</small></span>
          </Link>
          <div className="mb-10 hidden lg:block">
            <span className="text-xs uppercase tracking-[.35em] text-[#d4af37]">Welcome to Nova</span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#d4af37]">Nova Diner · Bulawayo</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">A seat at the table.</h2>
          <p className="mt-4 leading-7 text-white/65">Good food. Warm welcomes. Memorable evenings.</p>
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            <Link href="/auth?mode=signup" className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-6 text-sm font-bold uppercase tracking-wider text-[#17140c] transition hover:bg-[#e4c65c]">Create account <ArrowRight size={17} /></Link>
            <Link href="/auth?mode=signin" className="inline-flex h-14 items-center justify-center rounded-xl border border-white/20 px-6 text-sm font-semibold transition hover:border-[#d4af37]/70 hover:bg-white/5">Sign in</Link>
          </div>
          <p className="mt-7 text-center text-xs text-white/45">By continuing, you agree to our terms and privacy policy.</p>
        </div>
      </section>
    </main>
  );
}
