'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { LOYALTY_REWARDS } from '@/data/mockData';
import { LoyaltyReward } from '@/types';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Award,
  Crown,
  Gift,
  CheckCircle,
  Copy,
  ChevronRight,
  TrendingUp,
  Share2,
} from 'lucide-react';

export default function RewardsPage() {
  const { user, redeemReward } = useApp();
  const [feedback, setFeedback] = useState<{ message: string; success: boolean } | null>(null);
  const [copiedReferral, setCopiedReferral] = useState(false);

  const points = user?.loyaltyPoints || 0;
  const tier = user?.loyaltyTier || 'Bronze';

  const tierRequirements = {
    Bronze: { min: 0, next: 400, nextTier: 'Silver' },
    Silver: { min: 400, next: 1000, nextTier: 'Gold' },
    Gold: { min: 1000, next: 2500, nextTier: 'Platinum' },
    Platinum: { min: 2500, next: 2500, nextTier: 'Max Tier' },
  };

  const currentTierInfo = tierRequirements[tier];
  const progressPercent = Math.min(
    100,
    Math.round(((points - currentTierInfo.min) / (currentTierInfo.next - currentTierInfo.min)) * 100)
  );

  const handleRedeem = (reward: LoyaltyReward) => {
    const res = redeemReward(reward);
    setFeedback(res);
    if (res.success) {
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFFFFF'],
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const referralCode = `NOVA-${user?.name?.slice(0, 4)?.toUpperCase() || 'VIP'}263`;

  const handleCopyReferral = () => {
    navigator.clipboard?.writeText(referralCode);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Loyalty & Dining Rewards
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Earn 10 points for every $1 spent at Nova Diner. Unlock fine dining vouchers, birthday gifts, and VIP date night upgrades.
        </p>
      </div>

      {/* User Tier Status Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-nova-cardDark to-neutral-900 border border-nova-gold/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Crown className="w-64 h-64 text-nova-gold" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-nova-gold/20 text-nova-gold text-xs font-bold uppercase tracking-wider mb-3">
              <Crown className="w-4 h-4" />
              <span>{tier} Member Status</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {user ? user.name : 'Guest Customer'}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Member since {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2024'}
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs uppercase tracking-wider text-gray-400 block">
              Available Balance
            </span>
            <span className="font-serif text-4xl sm:text-5xl font-black text-nova-gold">
              {points} <span className="text-lg font-sans text-white font-normal">pts</span>
            </span>
            <p className="text-xs text-emerald-400 mt-1">
              ≈ ${(points / 40).toFixed(2)} in dining vouchers
            </p>
          </div>
        </div>

        {/* Progress Bar towards Next Tier */}
        {tier !== 'Platinum' && (
          <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
            <div className="flex justify-between text-xs font-medium mb-2">
              <span className="text-gray-300">
                Progress to <strong className="text-nova-gold">{currentTierInfo.nextTier} Tier</strong>
              </span>
              <span className="text-gray-400">
                {currentTierInfo.next - points} points remaining
              </span>
            </div>
            <div className="w-full bg-black/60 h-2.5 rounded-full overflow-hidden border border-white/10">
              <div
                className="bg-gradient-to-r from-nova-gold to-nova-goldLight h-full rounded-full transition-all duration-500 shadow-gold"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between ${
            feedback.success
              ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300'
              : 'bg-amber-950/40 border border-amber-500/40 text-amber-300'
          }`}
        >
          <span>{feedback.message}</span>
          <button onClick={() => setFeedback(null)} className="text-gray-400 hover:text-white text-xs">
            Dismiss
          </button>
        </div>
      )}

      {/* Rewards Catalog */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Redeem Your Points
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOYALTY_REWARDS.map((rew) => {
            const canAfford = points >= rew.pointsCost;
            return (
              <div
                key={rew.id}
                className="p-6 rounded-2xl bg-nova-cardDark border border-nova-borderDark flex flex-col justify-between transition hover:border-nova-gold/40 shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-nova-gold/10 border border-nova-gold/30 flex items-center justify-center text-nova-gold mb-4">
                    <Gift className="w-6 h-6" />
                  </div>

                  <h4 className="font-serif text-lg font-bold text-white mb-1">
                    {rew.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {rew.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-gray-400">Cost:</span>
                    <span className="font-mono text-base font-bold text-nova-gold">
                      {rew.pointsCost} pts
                    </span>
                  </div>

                  <button
                    onClick={() => handleRedeem(rew)}
                    disabled={!canAfford}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                      canAfford
                        ? 'bg-nova-gold text-nova-black hover:bg-nova-goldLight shadow-gold'
                        : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
                    }`}
                  >
                    {canAfford ? 'Redeem Voucher' : `Need ${rew.pointsCost - points} more pts`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tiers Breakdown & Referral Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        {/* Referral Card */}
        <div className="p-6 rounded-2xl bg-nova-cardDark border border-white/10 space-y-4">
          <div className="flex items-center space-x-3">
            <Share2 className="w-5 h-5 text-nova-gold" />
            <h4 className="font-serif text-lg font-bold text-white">
              Refer Friends & Earn 200 Pts
            </h4>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Share your unique invite code with friends in Bulawayo. When they place their first order, you both receive 200 points ($5 reward credit).
          </p>

          <div className="flex items-center space-x-2">
            <span className="bg-black/60 border border-nova-gold/40 px-4 py-2.5 rounded-xl font-mono font-bold text-nova-gold text-sm flex-1 tracking-wider">
              {referralCode}
            </span>
            <button
              onClick={handleCopyReferral}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition flex items-center space-x-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedReferral ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Tier Benefits */}
        <div className="p-6 rounded-2xl bg-nova-cardDark border border-white/10 space-y-3">
          <h4 className="font-serif text-lg font-bold text-white">
            VIP Tier Privileges
          </h4>
          <ul className="text-xs space-y-2 text-gray-300">
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-nova-gold mr-2 shrink-0 mt-0.5" />
              <span><strong>Bronze (0 - 399 pts):</strong> Standard 10 pts per $1, birthday welcome treat.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-nova-gold mr-2 shrink-0 mt-0.5" />
              <span><strong>Silver (400 - 999 pts):</strong> Free delivery on all Bulawayo orders over $35, priority reservations.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-nova-gold mr-2 shrink-0 mt-0.5" />
              <span><strong>Gold (1000 - 2499 pts):</strong> Complimentary welcome drink on table arrival, 15% anniversary discount.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-nova-gold mr-2 shrink-0 mt-0.5" />
              <span><strong>Platinum (2500+ pts):</strong> Dedicated VIP private dining table booking, secret chef tasting menu access.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
