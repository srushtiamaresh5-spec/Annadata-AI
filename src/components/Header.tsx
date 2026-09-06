import React from 'react';
import { 
  Sprout, 
  Globe, 
  UserCheck, 
  Bell, 
  ShieldCheck, 
  CloudSun,
  Sparkles,
  Layers
} from 'lucide-react';
import { AppLanguage, UserRole } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeEscrowCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  userRole,
  setUserRole,
  activeEscrowCount,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-amber-300 shadow-sm">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-emerald-950 font-serif">
                  {t.appTitle}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <Sparkles className="w-3 h-3 mr-1 text-emerald-600" />
                  AgTech OS
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium hidden sm:block">
                {t.appSubtitle} &bull; Mandya Agri-Cluster
              </p>
            </div>
          </div>

          {/* Center: Live Cluster Telemetry Pill */}
          <div className="hidden lg:flex items-center gap-3 bg-stone-50 border border-stone-200 px-3.5 py-1.5 rounded-full text-xs font-medium text-stone-700">
            <div className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold">Mandi Pulse:</span> ₹4,250/Qtl (Ragi +3.2%)
            </div>
            <span className="text-stone-300">|</span>
            <div className="flex items-center gap-1.5 text-amber-800">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>{activeEscrowCount} Active Escrows Locked</span>
            </div>
            <span className="text-stone-300">|</span>
            <div className="flex items-center gap-1.5 text-sky-800">
              <CloudSun className="w-3.5 h-3.5 text-sky-600" />
              <span>28°C &bull; 68% RH</span>
            </div>
          </div>

          {/* Right Controls: Role, Language, Notifications */}
          <div className="flex items-center gap-3">
            
            {/* Role Switcher */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
              <button
                type="button"
                onClick={() => setUserRole('farmer')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  userRole === 'farmer'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="View as Farmer (Sell produce, view advisory, manage ledger)"
              >
                {t.roleFarmer}
              </button>
              <button
                type="button"
                onClick={() => setUserRole('buyer')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  userRole === 'buyer'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="View as Agribusiness Buyer / Co-op (Bid on harvests)"
              >
                {t.roleBuyer}
              </button>
              <button
                type="button"
                onClick={() => setUserRole('fpo_admin')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all hidden md:block ${
                  userRole === 'fpo_admin'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="View as FPO Aggregator"
              >
                {t.roleFpo}
              </button>
            </div>

            {/* Language Picker */}
            <div className="relative flex items-center">
              <div className="flex items-center bg-emerald-50 border border-emerald-200 rounded-xl p-0.5 text-xs font-semibold text-emerald-900">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded-lg transition-colors ${
                    language === 'en' ? 'bg-white text-emerald-800 shadow-xs' : 'hover:text-emerald-700'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('kn')}
                  className={`px-2 py-1 rounded-lg transition-colors font-sans ${
                    language === 'kn' ? 'bg-white text-emerald-800 shadow-xs' : 'hover:text-emerald-700'
                  }`}
                  title="ಕನ್ನಡ (Kannada)"
                >
                  ಕನ್ನಡ
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('hi')}
                  className={`px-2 py-1 rounded-lg transition-colors font-sans ${
                    language === 'hi' ? 'bg-white text-emerald-800 shadow-xs' : 'hover:text-emerald-700'
                  }`}
                  title="हिन्दी (Hindi)"
                >
                  हिन्दी
                </button>
              </div>
            </div>

            {/* Bell notification with live badge */}
            <div className="relative p-2 rounded-xl text-stone-600 hover:bg-stone-100 hover:text-stone-900 cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white ring-1 ring-amber-400/40" />
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
