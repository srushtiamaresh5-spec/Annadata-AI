import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Warehouse, 
  Sparkles, 
  Calculator, 
  Bot, 
  ShieldCheck, 
  PhoneCall, 
  TrendingUp,
  Sprout
} from 'lucide-react';
import { ActiveTab, AppLanguage, UserRole } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: AppLanguage;
  userRole: UserRole;
  pendingBidsCount: number;
  alertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  language,
  userRole,
  pendingBidsCount,
  alertCount,
}) => {
  const t = TRANSLATIONS[language];

  const navItems: Array<{
    id: ActiveTab;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
    badgeColor?: string;
  }> = [
    {
      id: 'dashboard',
      label: t.navDashboard,
      icon: LayoutDashboard,
    },
    {
      id: 'marketplace',
      label: t.navMarket,
      icon: ShoppingBag,
      badge: pendingBidsCount > 0 ? `${pendingBidsCount} Live` : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      id: 'coldstorage',
      label: t.navColdStorage,
      icon: Warehouse,
      badge: alertCount > 0 ? '1 Alert' : undefined,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      id: 'advisory',
      label: t.navAdvisory,
      icon: Sparkles,
      badge: 'AI Matrix',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    },
    {
      id: 'ledger',
      label: t.navLedger,
      icon: Calculator,
      badge: 'Score 785',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      id: 'agronomist',
      label: t.navAgronomist,
      icon: Bot,
      badge: 'Voice + Vision',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    },
  ];

  return (
    <aside className="w-64 bg-stone-900 text-stone-200 flex flex-col shrink-0 border-r border-stone-800 min-h-[calc(100vh-4rem)]">
      
      {/* Active Profile Context */}
      <div className="p-4 border-b border-stone-800">
        <div className="flex items-center gap-3 bg-stone-800/80 p-3 rounded-xl border border-stone-700/60">
          <div className="w-9 h-9 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Sprout className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              {userRole === 'farmer' ? 'Active Farmer' : userRole === 'buyer' ? 'Agri Buyer' : 'FPO Lead'}
            </p>
            <p className="text-sm font-bold text-stone-100 truncate">
              {userRole === 'farmer' ? 'Basavarajappa H.' : userRole === 'buyer' ? 'Deccan Agro Exports' : 'Mandya Millets FPO'}
            </p>
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-sm font-semibold'
                  : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/60'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-amber-300' : 'text-stone-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border shrink-0 ${
                    isActive ? 'bg-emerald-800/80 text-emerald-100 border-emerald-600' : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Trust & Guarantee Box */}
      <div className="p-4 m-3 rounded-2xl bg-gradient-to-br from-emerald-950 to-stone-900 border border-emerald-800/50">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Fair Price Escrow</span>
        </div>
        <p className="text-xs text-stone-300 leading-relaxed mb-3">
          100% verified digital escrow. Buyer funds locked before farm dispatch.
        </p>
        <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-800">
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> Zero Middlemen
          </span>
          <span className="text-stone-400">NABARD Grade</span>
        </div>
      </div>

      {/* Kisan Call Center Helpline */}
      <div className="p-4 border-t border-stone-800 text-xs text-stone-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-emerald-400" />
          <div>
            <p className="text-[11px] text-stone-400">Kisan Toll-Free</p>
            <p className="font-bold text-stone-200">1800-180-1551</p>
          </div>
        </div>
        <span className="text-[10px] bg-stone-800 px-2 py-1 rounded text-stone-400">
          24x7 Live
        </span>
      </div>

    </aside>
  );
};
