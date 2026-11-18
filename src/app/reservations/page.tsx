'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SeatingPreference, OccasionType, TableInfo } from '@/types';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Heart,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { MobileReservation } from '@/components/MobileCustomerScreens';

export default function ReservationsPage() {
  const { user, tables, reservations, createReservation } = useApp();

  // Form State
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('19:00');
  const [guests, setGuests] = useState(2);
  const [seatingPreference, setSeatingPreference] = useState<SeatingPreference>('indoor');
  const [selectedTableId, setSelectedTableId] = useState<string>('');
  const [occasion, setOccasion] = useState<OccasionType>('casual');
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '+263 77');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [specialRequests, setSpecialRequests] = useState('');

  const [bookingStatus, setBookingStatus] = useState<
    'idle' | 'submitting' | 'confirmed' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<any>(null);

  // Available tables calculation
  const availableTables = tables.filter((t) => {
    // Capacity check
    if (t.capacity < guests) return false;
    // Section preference
    if (seatingPreference && t.section !== seatingPreference) return false;

    // Check conflict with existing reservations
    const isConflict = reservations.some(
      (r) =>
        r.date === date &&
        r.time === time &&
        r.tableId === t.id &&
        ['pending', 'confirmed'].includes(r.status)
    );
    return !isConflict;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      alert('Please fill in your name, contact phone and email.');
      return;
    }

    setBookingStatus('submitting');
    setErrorMessage('');

    try {
      // Pick table automatically if not selected
      const tableToAssign = selectedTableId
        ? tables.find((t) => t.id === selectedTableId)
        : availableTables[0];

      if (!tableToAssign) {
        throw new Error(
          'No table is currently available for this party size and seating preference at the requested time. Please try another time or seating area.'
        );
      }

      const res = await createReservation({
        userId: user?.id,
        customerName: customerName.trim(),
        customerPhone,
        customerEmail,
        date,
        time,
        guests,
        seatingPreference,
        tableId: tableToAssign.id,
        tableNumber: tableToAssign.number,
        occasion,
        specialRequests,
      });

      setConfirmedReservation(res);
      setBookingStatus('confirmed');

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
            colors: ['#D4AF37', '#101010', '#FFFFFF'],
        });
      } catch (e) {
        console.error(e);
      }
    } catch (err) {
      setErrorMessage((err as Error).message);
      setBookingStatus('error');
    }
  };

  return (
    <><MobileReservation /><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 desktop-reservation">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Table Reservation Experience
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Reserve your dining table at Bulawayo’s leading fine restaurant. Indoor seating, starlight patio, and VIP booths available.
        </p>
      </div>

      <div className="relative isolate overflow-hidden rounded-2xl border border-nova-gold/20 shadow-2xl h-48 sm:h-64 lg:h-72">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=85"
          alt="An elegantly set restaurant table beneath warm evening lights"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/10" />
        <div className="absolute inset-0 flex items-end p-6 sm:p-9">
          <div className="max-w-md">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-nova-gold">Your evening, beautifully set</p>
            <p className="mt-2 font-serif text-2xl sm:text-3xl text-white">A table worth looking forward to.</p>
          </div>
        </div>
      </div>

      {bookingStatus === 'confirmed' ? (
        <div className="max-w-xl mx-auto p-8 rounded-2xl bg-nova-cardDark border border-nova-gold/40 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs font-semibold text-nova-gold uppercase tracking-wider">
              Reservation Confirmed!
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">
              We Look Forward to Welcoming You
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              A confirmation email and SMS reminder has been generated.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-black/60 border border-white/10 text-left space-y-3">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-xs text-gray-400">Confirmation Code:</span>
              <span className="font-mono font-bold text-nova-gold text-base">
                {confirmedReservation.confirmationCode}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Guest Name:</span>
              <span className="text-white font-medium">{confirmedReservation.customerName}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Date & Time:</span>
              <span className="text-white font-medium">
                {confirmedReservation.date} at {confirmedReservation.time}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Party Size:</span>
              <span className="text-white font-medium">{confirmedReservation.guests} Guests</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Allocated Table:</span>
              <span className="text-nova-gold font-bold">
                Table #{confirmedReservation.tableNumber} ({confirmedReservation.seatingPreference.toUpperCase()})
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setBookingStatus('idle');
                setConfirmedReservation(null);
              }}
              className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider transition"
            >
              Make Another Reservation
            </button>
            <a
              href="/menu"
              className="flex-1 py-3 rounded-xl bg-nova-gold text-nova-black font-bold text-xs uppercase tracking-wider hover:bg-nova-goldLight transition flex items-center justify-center"
            >
              Preview Menu
            </a>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-10 rounded-2xl bg-nova-cardDark border border-nova-borderDark space-y-8 shadow-2xl"
        >
          {bookingStatus === 'error' && (
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-100 text-xs flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Date, Time & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2 flex items-center">
                <Calendar className="w-3.5 h-3.5 text-nova-gold mr-1.5" /> Date
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
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2 flex items-center">
                <Clock className="w-3.5 h-3.5 text-nova-gold mr-1.5" /> Time Slot
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-nova-gold"
              >
                <option value="12:00">12:00 PM (Lunch)</option>
                <option value="13:00">01:00 PM (Lunch)</option>
                <option value="14:00">02:00 PM (Lunch)</option>
                <option value="17:30">05:30 PM (Early Dinner)</option>
                <option value="18:30">06:30 PM (Dinner)</option>
                <option value="19:00">07:00 PM (Prime Dinner)</option>
                <option value="19:30">07:30 PM (Prime Dinner)</option>
                <option value="20:00">08:00 PM (Dinner)</option>
                <option value="20:30">08:30 PM (Late Dinner)</option>
                <option value="21:00">09:00 PM (Late Dinner)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2 flex items-center">
                <Users className="w-3.5 h-3.5 text-nova-gold mr-1.5" /> Number of Guests
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 4, 6, 8, 12].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuests(num)}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold transition ${
                      guests === num
                        ? 'bg-nova-gold text-nova-black shadow-gold'
                        : 'bg-black/40 text-gray-300 hover:text-white border border-white/10'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Seating Preference & Occasion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Seating Atmosphere
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'indoor', label: 'Main Dining Hall', desc: 'Air-conditioned & intimate' },
                  { id: 'patio', label: 'Starlight Patio', desc: 'Open-air Bulawayo breeze' },
                  { id: 'vip', label: 'VIP Private Booth', desc: 'Secluded luxury lounge' },
                  { id: 'window', label: 'Window View', desc: 'Street lights & skyline' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSeatingPreference(s.id as SeatingPreference)}
                    className={`p-3 rounded-xl border text-left transition ${
                      seatingPreference === s.id
                        ? 'border-nova-gold bg-nova-gold/10 shadow-gold'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <p className="text-xs font-bold text-gray-100">{s.label}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Occasion
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'casual', label: 'Casual Dining' },
                  { id: 'date_night', label: 'Romantic Date' },
                  { id: 'birthday', label: 'Birthday Celebration' },
                  { id: 'anniversary', label: 'Anniversary' },
                  { id: 'business', label: 'Business Meeting' },
                  { id: 'proposal', label: 'Surprise Proposal' },
                ].map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setOccasion(o.id as OccasionType)}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      occasion === o.id
                        ? 'border-nova-gold bg-nova-gold/10 text-white font-bold'
                        : 'border-white/10 bg-white/5 hover:border-white/20 text-gray-300'
                    }`}
                  >
                    <span className="text-xs">{o.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Available Tables Preview */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Live Table Availability ({availableTables.length} Tables Open)
              </span>
              <span className="text-[11px] text-emerald-400 flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Double-Booking Protection Active
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {availableTables.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTableId(t.id)}
                  className={`p-2 rounded-lg border text-center transition ${
                    selectedTableId === t.id
                      ? 'border-nova-gold bg-nova-gold text-nova-black font-bold'
                      : 'border-white/10 bg-black/40 text-gray-300 hover:border-nova-gold/40'
                  }`}
                >
                  <span className="text-xs block">Table {t.number}</span>
                  <span className="text-[10px] text-gray-400 block">{t.capacity} seats</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Tendai Moyo"
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nova-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+263 77..."
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nova-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nova-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Special Requests or Dietary Requirements
            </label>
            <textarea
              rows={2}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="e.g. Quiet table away from kitchen, anniversary card, wheelchair access..."
              className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-nova-gold resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={bookingStatus === 'submitting'}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-nova-gold to-nova-goldDark text-nova-black font-bold text-xs uppercase tracking-wider hover:shadow-gold transition flex items-center space-x-2"
            >
              <span>{bookingStatus === 'submitting' ? 'Confirming Availability...' : 'Confirm Table Reservation'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div></>
  );
}
