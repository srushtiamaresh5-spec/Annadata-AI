import React, { useState } from 'react';
import { 
  AppLanguage, 
  UserRole, 
  ActiveTab, 
  ProduceListing, 
  EscrowDeal, 
  ColdStorageFacility, 
  ReeferTruck, 
  FinancialEntry, 
  LoanProduct 
} from './types';
import { 
  INITIAL_PRODUCE_LISTINGS, 
  INITIAL_ESCROW_DEALS, 
  INITIAL_COLD_STORAGE, 
  INITIAL_REEFER_TRUCKS, 
  INITIAL_FINANCIAL_ENTRIES, 
  INITIAL_LOAN_PRODUCTS 
} from './data/agriData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { MarketplaceView } from './components/MarketplaceView';
import { ColdStorageView } from './components/ColdStorageView';
import { CropAdvisoryView } from './components/CropAdvisoryView';
import { FinancialLedgerView } from './components/FinancialLedgerView';
import { AgronomistView } from './components/AgronomistView';
import { Bot, Sparkles } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<AppLanguage>('en');
  const [userRole, setUserRole] = useState<UserRole>('farmer');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Shared Application State
  const [listings, setListings] = useState<ProduceListing[]>(INITIAL_PRODUCE_LISTINGS);
  const [activeEscrows, setActiveEscrows] = useState<EscrowDeal[]>(INITIAL_ESCROW_DEALS);
  const [facilities, setFacilities] = useState<ColdStorageFacility[]>(INITIAL_COLD_STORAGE);
  const [reeferTrucks, setReeferTrucks] = useState<ReeferTruck[]>(INITIAL_REEFER_TRUCKS);
  const [ledgerEntries, setLedgerEntries] = useState<FinancialEntry[]>(INITIAL_FINANCIAL_ENTRIES);
  const [loanProducts] = useState<LoanProduct[]>(INITIAL_LOAN_PRODUCTS);

  // Global listing modal trigger
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  // Escrows in active progress (not yet completed/settled)
  const pendingEscrowCount = activeEscrows.filter(
    (e) => e.escrowStatus !== 'PAYMENT_RELEASED'
  ).length;

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Top Global Navigation Bar */}
      <Header
        language={language}
        setLanguage={setLanguage}
        userRole={userRole}
        setUserRole={setUserRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenListProduceModal={() => {
          setActiveTab('marketplace');
          setIsListModalOpen(true);
        }}
      />

      {/* Main Layout Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row gap-6">
        
        {/* Left Desktop Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userRole={userRole}
          language={language}
          activeEscrowCount={pendingEscrowCount}
        />

        {/* Dynamic Center Stage View */}
        <main className="flex-1 min-w-0 pb-12">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              language={language}
              userRole={userRole}
              listings={listings}
              activeEscrows={activeEscrows}
              facilities={facilities}
              ledgerEntries={ledgerEntries}
              setActiveTab={setActiveTab}
              onOpenListProduceModal={() => {
                setActiveTab('marketplace');
                setIsListModalOpen(true);
              }}
            />
          )}

          {activeTab === 'marketplace' && (
            <MarketplaceView
              language={language}
              userRole={userRole}
              listings={listings}
              setListings={setListings}
              activeEscrows={activeEscrows}
              setActiveEscrows={setActiveEscrows}
              isListModalOpen={isListModalOpen}
              setIsListModalOpen={setIsListModalOpen}
            />
          )}

          {activeTab === 'coldstorage' && (
            <ColdStorageView
              language={language}
              facilities={facilities}
              setFacilities={setFacilities}
              reeferTrucks={reeferTrucks}
              setReeferTrucks={setReeferTrucks}
            />
          )}

          {activeTab === 'advisory' && (
            <CropAdvisoryView language={language} />
          )}

          {activeTab === 'ledger' && (
            <FinancialLedgerView
              language={language}
              entries={ledgerEntries}
              setEntries={setLedgerEntries}
              loanProducts={loanProducts}
            />
          )}

          {activeTab === 'agronomist' && (
            <AgronomistView language={language} />
          )}
        </main>

      </div>

      {/* Floating Quick Agronomist Access Pill (Visible when on other tabs) */}
      {activeTab !== 'agronomist' && (
        <button
          type="button"
          onClick={() => setActiveTab('agronomist')}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 border border-emerald-600/40 group cursor-pointer"
        >
          <div className="w-6 h-6 rounded-lg bg-emerald-600/60 flex items-center justify-center">
            <Bot className="w-4 h-4 text-emerald-200" />
          </div>
          <span className="group-hover:translate-x-0.5 transition-transform">
            Ask Annadata AI
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}

      {/* Persistent Bottom Bar / Footer */}
      <footer className="mt-auto border-t border-stone-200/80 bg-white py-4 px-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-900 font-serif">Annadata AI</span>
            <span>&bull; Rural Economic Operating System</span>
          </div>
          <p className="text-[11px] text-stone-400">
            Hackathon Edition &bull; Direct Farmer P2P &bull; Smart Escrow &bull; IoT Cold Chain &bull; Multilingual ICAR Advisory
          </p>
        </div>
      </footer>

    </div>
  );
}
