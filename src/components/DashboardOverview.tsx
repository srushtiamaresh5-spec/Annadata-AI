import React from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Warehouse, 
  Sparkles, 
  Clock, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle, 
  ThermometerSnowflake, 
  Droplet,
  FileCheck2,
  ChevronRight,
  Sprout,
  ScanEye,
  CreditCard
} from 'lucide-react';
import { 
  ActiveTab, 
  AppLanguage, 
  ProduceListing, 
  ColdStorageFacility, 
  EscrowDeal 
} from '../types';
import { TRANSLATIONS } from '../data/translations';

interface DashboardOverviewProps {
  language: AppLanguage;
  setActiveTab: (tab: ActiveTab) => void;
  listings: ProduceListing[];
  coldFacilities: ColdStorageFacility[];
  activeEscrows: EscrowDeal[];
  onOpenListModal: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  language,
  setActiveTab,
  listings,
  coldFacilities,
  activeEscrows,
  onOpenListModal,
}) => {
  const t = TRANSLATIONS[language];

  // Calculate totals
  // Calculate totals safely
const totalListedQuintals = (listings || []).reduce((acc, curr) => acc + curr.quantityQuintals, 0);
const totalMarketVal = (listings || []).reduce((acc, curr) => acc + (curr.quantityQuintals * curr.pricePerQuintal), 0);
const totalEscrowLocked = (activeEscrows || []).reduce((acc, curr) => acc + curr.amountEscrowed, 0);
const totalAvailableColdCapacity = (coldFacilities || []).reduce((acc, curr) => acc + curr.availableCapacityQuintals, 0);
  

  return (
    <div className="space-y-6">
      
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-stone-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-xs font-semibold mb-3 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Mandya & Southern Deccan Agricultural Cluster &bull; Kharif Harvest Cycle
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-serif mb-2">
            Welcome to Annadata AI Operating System
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
            Empowering smallholder farmers with direct-to-buyer spot trading, IoT cold chain logistics, AI agronomy, and digital warehouse receipt credit.
          </p>
          
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenListModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm transition-all shadow-sm"
            >
              <Sprout className="w-4 h-4 text-stone-900" />
              {t.listProduceBtn}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('agronomist')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 border border-emerald-600/60 text-emerald-100 font-semibold text-sm transition-all"
            >
              <ScanEye className="w-4 h-4 text-emerald-300" />
              Disease Scanner & Multilingual Voice
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('coldstorage')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-700 border border-stone-700 text-stone-200 font-medium text-sm transition-all"
            >
              <Warehouse className="w-4 h-4 text-stone-300" />
              Nearby Cold Rooms ({totalAvailableColdCapacity} MT Free)
            </button>
          </div>
        </div>

        {/* Ambient decorative graphic */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <Sprout className="w-96 h-96 text-emerald-200" />
        </div>
      </div>

      {/* 4 Key Pillar Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Harvest Spot Value */}
        <div 
          onClick={() => setActiveTab('marketplace')}
          className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-emerald-500/60 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Spot Market Listed
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-stone-900 font-serif">
            ₹{(totalMarketVal / 100000).toFixed(2)} Lakhs
          </div>
          <div className="flex items-center justify-between text-xs text-stone-500 mt-2 pt-2 border-t border-stone-100">
            <span>{totalListedQuintals} Quintals across {listings.length} batches</span>
            <span className="text-emerald-700 font-bold flex items-center">
              View <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Metric 2: Digital Escrow Vault */}
        <div 
          onClick={() => setActiveTab('marketplace')}
          className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-500/60 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Escrow Protection
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-stone-900 font-serif">
            ₹{(totalEscrowLocked / 100000).toFixed(2)} Lakhs
          </div>
          <div className="flex items-center justify-between text-xs text-stone-500 mt-2 pt-2 border-t border-stone-100">
            <span className="text-amber-700 font-semibold">{activeEscrows.length} Contracts in Safe Transit</span>
            <span className="text-amber-700 font-bold flex items-center">
              Audit <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Metric 3: Cold Storage Capacity */}
        <div 
          onClick={() => setActiveTab('coldstorage')}
          className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-sky-500/60 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Cold Chain Reserve
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Warehouse className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-stone-900 font-serif">
            {totalAvailableColdCapacity} MT Free
          </div>
          <div className="flex items-center justify-between text-xs text-stone-500 mt-2 pt-2 border-t border-stone-100">
            <span>4 Certified Facilities Nearby</span>
            <span className="text-sky-700 font-bold flex items-center">
              Map <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Metric 4: Credit Score Index */}
        <div 
          onClick={() => setActiveTab('ledger')}
          className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-emerald-500/60 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Rural Credit Score
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-800 font-serif">
            785 <span className="text-sm font-sans font-medium text-stone-500">/ 900</span>
          </div>
          <div className="flex items-center justify-between text-xs text-stone-500 mt-2 pt-2 border-t border-stone-100">
            <span className="text-emerald-700 font-semibold">Tier-1 Institutional KCC</span>
            <span className="text-emerald-700 font-bold flex items-center">
              Check <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
        </div>

      </div>

      {/* Main Grid: Live Escrow Tracker + Weather/Telemetry Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Active Digital Escrow Highlights */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900 font-serif">
                Active Digital Escrow Pipeline
              </h2>
              <p className="text-xs text-stone-500">
                Guaranteed payments backed by tamper-proof quality checkpoints and cold transit tracking
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('marketplace')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center"
            >
              All Trades ({listings.length}) <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>

          <div className="space-y-4">
            {activeEscrows.map((deal) => (
              <div 
                key={deal.id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-stone-50 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      Escrow #{deal.id}
                    </span>
                    <h3 className="font-bold text-stone-900 text-sm mt-1">
                      {deal.cropName}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-500 block">Total Locked Value</span>
                    <span className="text-base font-extrabold text-stone-900 font-serif">
                      ₹{deal.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Progress bar steps */}
                <div className="grid grid-cols-4 gap-2 pt-2 pb-1 text-center">
                  
                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-emerald-600" />
                    <span className="text-[10px] font-bold text-emerald-800 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Funded
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-emerald-600" />
                    <span className="text-[10px] font-bold text-emerald-800 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> QC Passed
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-amber-800 flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" /> In Reefer
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-stone-200" />
                    <span className="text-[10px] font-medium text-stone-400">
                      OTP Release
                    </span>
                  </div>

                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-stone-600 bg-white p-2 rounded-lg border border-stone-200">
                  <span className="font-medium text-stone-700">
                    Buyer: <strong className="text-stone-900">{deal.buyerName}</strong>
                  </span>
                  <span className="font-mono text-emerald-800 font-semibold">
                    Inspection: {deal.inspectionCode}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Micro-Climate Agromet Radar & Telemetry Snapshot */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
          
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900 font-serif">
              Agromet & IoT Telemetry
            </h2>
            <span className="text-[11px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full border border-sky-200">
              Live Mandya Hub
            </span>
          </div>

          {/* Current Weather Pill */}
          <div className="bg-gradient-to-br from-sky-50 to-stone-50 p-4 rounded-xl border border-sky-100">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-black text-stone-900 font-serif">28.4°C</span>
                <p className="text-xs text-stone-600">Scattered clouds &bull; 68% RH</p>
              </div>
              <div className="text-right text-xs">
                <span className="text-emerald-700 font-bold block">Soil Moisture: 34%</span>
                <span className="text-stone-500">Evapo-transpiration: Low</span>
              </div>
            </div>
            <p className="text-[11px] text-stone-600 mt-3 pt-2 border-t border-sky-200/60 leading-normal">
              🌤️ <strong>Agromet Advisory:</strong> Mild evening showers expected. Perfect window for bio-fertilizer foliar drenching before sunset.
            </p>
          </div>

          {/* Real-time Spoilage Monitoring Alert */}
          <div className="border border-amber-200 bg-amber-50/70 p-3.5 rounded-xl text-xs space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Chamber 2 Thermal Drift Notice</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              Deccan Agro Hub: Chamber #2 reported a +3.9°C fluctuation. Backup chiller engaged. Zero perishable spoilage reported.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('coldstorage')}
              className="w-full text-center py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px] transition-colors"
            >
              Open Cold Room Telemetry Monitor
            </button>
          </div>

          {/* Quick links to AI Advisory & Micro-Credit */}
          <div className="pt-2 border-t border-stone-100 space-y-2">
            <button
              type="button"
              onClick={() => setActiveTab('advisory')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-xs font-semibold text-stone-700"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Forecast Next Season Yield & ROI
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ledger')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-xs font-semibold text-stone-700"
            >
              <span className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                Apply 4% Kisan Credit Card (KCC)
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
