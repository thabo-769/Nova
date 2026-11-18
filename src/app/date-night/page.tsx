'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { DateNightPackage } from '@/types';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  Calendar,
  Clock,
  CheckCircle,
  Wine,
  Gift,
  Music,
  Check,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export default function DateNightPage() {
  const { dateNightPackages, createReservation, user } = useApp();

  const [selectedPackage, setSelectedPackage] = useState<DateNightPackage>(
    dateNightPackages[0]
  );

  // Form State
  const [partnerName, setPartnerName] = useState('');
  const [yourName, setYourName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '+263 77');
  const [email, setEmail] = useState(user?.email || '');
  const [date, setDate] = useState(() => {
    const nextFriday = new Date();
    nextFriday.setDate(nextFriday.getDate() + 2);
    return nextFriday.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('19:30');
  const [customPlateMessage, setCustomPlateMessage] = useState('Happy Anniversary, My Love');
  const [selectedDecorations, setSelectedDecorations] = useState<string[]>([
    'Fresh Red Rose Petals on Table',
    'Crystal Candlelight Setup',
  ]);
  const [musicSongRequest, setMusicSongRequest] = useState('');

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const decorationOptions = [
    { label: 'Fresh Red Rose Petals on Table', price: 0 },
    { label: 'Crystal Candlelight Setup', price: 0 },
    { label: 'Bouquet of 12 Velvet Red Roses', price: 25.0 },
    { label: 'Bespoke Celebration Cake with Sparkler', price: 20.0 },
    { label: 'Chilled Moët & Chandon Champagne Bottle', price: 65.0 },
  ];

  const handleToggleDecor = (label: string) => {
    setSelectedDecorations((prev) =>
      prev.includes(label) ? prev.filter((d) => d !== label) : [...prev, label]
    );
  };

  const handleBookDateNight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!yourName || !phone) {
      alert('Please fill in your name and contact phone.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await createReservation({
        userId: user?.id,
        customerName: yourName,
        customerPhone: phone,
        customerEmail: email,
        date,
        time,
        guests: 2,
        seatingPreference: 'vip',
        occasion: 'date_night',
        dateNightPackageId: selectedPackage.id,
        dateNightPackageName: selectedPackage.title,
        customDecorations: selectedDecorations,
        specialRequests: `Partner: ${partnerName}. Plate Message: "${customPlateMessage}". Music request: ${musicSongRequest}`,
      });

      setConfirmationCode(res.confirmationCode);
      setBookingConfirmed(true);

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#101010', '#D4AF37', '#FFFFFF'],
        });
      } catch (e) {
        console.error(e);
      }
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO HEADER */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1920&auto=format&fit=crop"
            alt="Candlelit Dining Nova Diner"
            fill
            priority
            className="object-cover filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nova-black via-nova-black/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-16">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight mb-6">
            Nova <span className="gold-shimmer">Date Night</span> Privé
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            Crafted for pure romance, anniversaries, birthdays, and life’s most meaningful moments. Candlelight tables, customized desserts, fine bubbly, and romantic playlists in Bulawayo.
          </p>
        </div>
      </section>

      {/* 2. PACKAGES CAROUSEL / GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Choose Your Romance Package
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dateNightPackages.map((pkg) => {
            const isSelected = selectedPackage.id === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
                className={`rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-nova-gold bg-nova-cardDark shadow-goldGlow scale-[1.02]'
                    : 'border-white/10 bg-nova-cardDark hover:border-nova-gold/40'
                }`}
              >
                <div>
                  <div className="relative h-48 w-full bg-neutral-900">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-nova-cardDark via-transparent to-black/40" />
                    {pkg.isPopular && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-nova-gold text-nova-black text-[10px] font-black uppercase tracking-wider shadow-md">
                        Most Romantic
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="font-serif text-xl font-bold text-white">
                        {pkg.title}
                      </h3>
                    </div>
                    <p className="font-serif text-2xl font-bold text-nova-gold mb-3">
                      ${pkg.price.toFixed(2)}{' '}
                      <span className="text-xs font-sans text-gray-400 font-normal">
                        / for two
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed mb-5">
                      {pkg.description}
                    </p>

                    <div className="space-y-2 border-t border-white/5 pt-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                        Included Luxuries:
                      </span>
                      {pkg.includes.map((inc, i) => (
                        <div key={i} className="flex items-start text-xs text-gray-300">
                          <Check className="w-3.5 h-3.5 text-nova-gold mr-2 mt-0.5 shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    type="button"
                    className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                      isSelected
                        ? 'bg-nova-gold text-nova-black shadow-gold'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {isSelected ? 'Selected Package' : 'Select This Experience'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. BOOKING INTERFACE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {bookingConfirmed ? (
          <div className="p-8 sm:p-12 rounded-2xl bg-nova-cardDark border border-nova-gold/40 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-nova-gold/20 border border-nova-gold/40 flex items-center justify-center mx-auto text-nova-gold">
              <Heart className="w-9 h-9 fill-current" />
            </div>

            <div>
              <span className="text-xs font-semibold text-nova-gold uppercase tracking-wider">
                Date Night Confirmed!
              </span>
              <h2 className="font-serif text-3xl font-bold text-white mt-1">
                Your Romantic Evening is Set
              </h2>
              <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
                We have notified our Executive Chef and Maitre D’ to prepare the candlelit setup and custom messaging for {partnerName || 'your partner'}.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-black/60 border border-white/10 text-left space-y-3 max-w-md mx-auto">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-xs text-gray-400">Confirmation Code:</span>
                <span className="font-mono font-bold text-nova-gold text-base">
                  {confirmationCode}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Experience Package:</span>
                <span className="text-white font-medium">{selectedPackage.title}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Date & Time:</span>
                <span className="text-white font-medium">{date} at {time}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Custom Plate Lettering:</span>
                <span className="text-nova-gold italic">&quot;{customPlateMessage}&quot;</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => {
                  setBookingConfirmed(false);
                }}
                className="px-8 py-3.5 rounded-xl bg-nova-gold text-nova-black font-bold text-xs uppercase tracking-wider hover:bg-nova-goldLight transition"
              >
                Plan Another Romantic Night
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleBookDateNight}
            className="p-8 sm:p-12 rounded-2xl bg-nova-cardDark border border-nova-gold/30 space-y-8 shadow-2xl"
          >
            <div className="border-b border-white/10 pb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-nova-gold">
                Customizing: {selectedPackage.title} (${selectedPackage.price.toFixed(2)})
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Personalize Your Romantic Evening
              </h3>
            </div>

            {/* Couple names & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  placeholder="e.g. Tendai"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-nova-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Partner’s Name (for table greeting)
                </label>
                <input
                  type="text"
                  required
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="e.g. Ruvimbo"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-nova-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-nova-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-nova-gold"
                >
                  <option value="18:30">06:30 PM (Sunset)</option>
                  <option value="19:00">07:00 PM</option>
                  <option value="19:30">07:30 PM (Most Popular)</option>
                  <option value="20:00">08:00 PM</option>
                  <option value="20:30">08:30 PM (Late Candlelight)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Phone (WhatsApp)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+263 77..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-nova-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Email (Confirmation)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-nova-gold"
                />
              </div>
            </div>

            {/* Custom Dessert Plate Lettering */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 flex items-center">
                <Sparkles className="w-3.5 h-3.5 text-nova-gold mr-1" />
                Custom Lettering on Dessert Plate (Written in Molten Chocolate)
              </label>
              <input
                type="text"
                value={customPlateMessage}
                onChange={(e) => setCustomPlateMessage(e.target.value)}
                placeholder="e.g. Happy 3rd Anniversary, My Queen! or Will You Marry Me?"
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-nova-gold"
              />
            </div>

            {/* Optional Extras & Decorations */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-3 flex items-center">
                <Gift className="w-3.5 h-3.5 text-nova-gold mr-1" />
                Table Atmosphere & Floral Additions
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {decorationOptions.map((opt) => {
                  const isChecked = selectedDecorations.includes(opt.label);
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleToggleDecor(opt.label)}
                      className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                        isChecked
                          ? 'border-nova-gold bg-nova-gold/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <span className="text-xs text-gray-200">{opt.label}</span>
                      <span className="text-xs font-bold text-nova-gold ml-2">
                        {opt.price === 0 ? 'Included' : `+$${opt.price}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Song request */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 flex items-center">
                <Music className="w-3.5 h-3.5 text-nova-gold mr-1" />
                Special Song Request / Artist
              </label>
              <input
                type="text"
                value={musicSongRequest}
                onChange={(e) => setMusicSongRequest(e.target.value)}
                placeholder="e.g. Ed Sheeran - Perfect or Jah Prayzah ballad"
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-nova-gold"
              />
            </div>

            {/* Submit */}
            <div className="pt-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 block">Package Total:</span>
                <span className="font-serif text-2xl font-bold text-nova-gold">
                  ${selectedPackage.price.toFixed(2)}
                </span>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-nova-gold to-nova-goldDark text-nova-black font-bold text-xs uppercase tracking-wider hover:shadow-gold transition flex items-center space-x-2"
              >
                <span>{submitting ? 'Confirming Arrangement...' : 'Book Date Night Experience'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
