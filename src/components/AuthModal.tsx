'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Mail, Lock, User, Sparkles } from 'lucide-react';

export const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { loginAs, switchDemoUser } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginAs(email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-md bg-nova-black border border-nova-gold/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-gray-100 z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nova-gold to-nova-goldDark p-0.5 shadow-gold mx-auto mb-3">
            <div className="w-full h-full rounded-full bg-nova-black flex items-center justify-center">
              <span className="font-serif text-nova-gold font-black text-xl">N</span>
            </div>
          </div>
          <h3 className="font-serif text-2xl font-bold text-nova-gold">
            {isSignUp ? 'Join Nova Privé Club' : 'Welcome to Nova Diner'}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {isSignUp
              ? 'Earn 100 bonus loyalty points upon sign up'
              : 'Sign in to access reservations, order history & loyalty rewards'}
          </p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-2 text-center">
            One-Click Demo Profiles:
          </p>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => {
                switchDemoUser('customer');
                onClose();
              }}
              className="px-3 py-2 rounded-lg bg-nova-gold/20 hover:bg-nova-gold hover:text-black text-nova-gold text-xs font-bold transition flex items-center justify-center"
            >
              <User className="w-4 h-4 mr-2" />
              <span>Continue as demo customer</span>
            </button>
          </div>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-nova-black px-2 text-gray-500">or use email credentials</span>
          </div>
        </div>

        {/* Standard Email Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tendai Moyo"
                  className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-nova-gold"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@gmail.com"
                className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-nova-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-nova-gold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-nova-gold to-nova-goldDark text-nova-black font-bold text-xs uppercase tracking-wider hover:shadow-gold transition"
          >
            {isSignUp ? 'Create Account & Claim 100 Pts' : 'Sign In to Account'}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-gray-400">
          {isSignUp ? (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-nova-gold font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              New to Nova Diner?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-nova-gold font-semibold hover:underline"
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
