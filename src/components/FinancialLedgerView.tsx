import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Plus, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  FileCheck, 
  ArrowUpRight, 
  Calendar, 
  Tag, 
  X,
  CreditCard,
  Percent,
  Landmark
} from 'lucide-react';
import { FinancialEntry, LoanProduct, AppLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FinancialLedgerViewProps {
  language: AppLanguage;
  entries: FinancialEntry[];
  setEntries: React.Dispatch<React.SetStateAction<FinancialEntry[]>>;
  loanProducts: LoanProduct[];
}

export const FinancialLedgerView: React.FC<FinancialLedgerViewProps> = ({
  language,
  entries,
  setEntries,
  loanProducts,
}) => {
  const t = TRANSLATIONS[language];

  // Modals & States
  const [isAddEntryModalOpen, setIsAddEntryModalOpen] = useState(false);
  const [selectedLoanForCalculator, setSelectedLoanForCalculator] = useState<LoanProduct>(loanProducts[0]);
  const [loanAmount, setLoanAmount] = useState<number>(150000);
  const [loanTenureMonths, setLoanTenureMonths] = useState<number>(12);
  const [sanctionLetter, setSanctionLetter] = useState<any>(null);

  // New Ledger Entry Form
  const [entryType, setEntryType] = useState<'expense' | 'income'>('expense');
  const [entryCategory, setEntryCategory] = useState<any>('seeds');
  const [entryAmount, setEntryAmount] = useState<number>(5000);
  const [entryDescription, setEntryDescription] = useState('');
  const [entrySeason, setEntrySeason] = useState<any>('Kharif 2026');

  // Totals
  const totalIncome = entries
    .filter((e) => e.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = entries
    .filter((e) => e.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netFarmProfit = totalIncome - totalExpense;

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entryAmount) return;

    const newEntry: FinancialEntry = {
      id: `led-${Date.now()}`,
      type: entryType,
      category: entryCategory,
      amount: Number(entryAmount),
      description: entryDescription || (entryType === 'income' ? 'Produce sale proceed' : 'Farming input expenditure'),
      date: new Date().toISOString().split('T')[0],
      season: entrySeason,
    };

    setEntries([newEntry, ...entries]);
    setIsAddEntryModalOpen(false);
    setEntryDescription('');
  };

  // Monthly EMI Calculation: [P x R x (1+R)^N]/[(1+R)^N-1]
  const monthlyRate = (selectedLoanForCalculator.interestRateAnnual / 100) / 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTenureMonths)) /
    (Math.pow(1 + monthlyRate, loanTenureMonths) - 1)
  );
  const totalRepayment = emi * loanTenureMonths;
  const totalInterest = totalRepayment - loanAmount;

  const handleApplySimulatedLoan = () => {
    const sanction = {
      sanctionId: `SANCTION-SBI-KCC-${Math.floor(10000 + Math.random() * 90000)}`,
      schemeName: selectedLoanForCalculator.name,
      institution: selectedLoanForCalculator.institution,
      sanctionedAmount: loanAmount,
      effectiveInterestRate: `${selectedLoanForCalculator.interestRateAnnual}% p.a.`,
      monthlyEmi: emi,
      tenureMonths: loanTenureMonths,
      farmerName: 'Basavarajappa H. (Mandya Cluster)',
      aadhaarKyc: 'Aadhaar Verified (Bhoomi Land Records Linked)',
      creditScoreRef: 'Annadata Credit Index: 785 / 900 (Tier-1 Prime)',
      disbursementStatus: 'Direct Credit to Savings Bank Account in 15 Minutes',
    };
    setSanctionLetter(sanction);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-stone-900 font-serif">
              {t.navLedger}
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              NABARD Credit Linked
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Transparent farm accounting, cost accounting, and instant institutional micro-credit underwriting
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddEntryModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          {t.addTransaction}
        </button>
      </div>

      {/* 3 Summary Ledger Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Income Card */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="font-semibold uppercase tracking-wider">{t.totalIncome}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-950 font-serif">
            ₹{totalIncome.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Spot market sales & DBT subsidies
          </p>
        </div>

        {/* Expense Card */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="font-semibold uppercase tracking-wider">{t.totalExpenses}</span>
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-950 font-serif">
            ₹{totalExpense.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Seeds, bio-fertilizers, labor & logistics
          </p>
        </div>

        {/* Net Profit Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900 to-stone-900 text-white shadow-2xs">
          <div className="flex items-center justify-between text-xs text-emerald-300 mb-2">
            <span className="font-semibold uppercase tracking-wider">{t.netFarmProfit}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-700/60 text-emerald-200 flex items-center justify-center border border-emerald-500/40">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-serif">
            ₹{netFarmProfit.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-stone-300 mt-1">
            Kharif Season Net Crop Margin
          </p>
        </div>

      </div>

      {/* Main Grid: Credit Score & Loan Matching | Ledger Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Rural Credit Score & Micro-Finance Matching */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Annadata Farmer Credit Index Card */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-stone-900 font-serif">
                    {t.creditScoreLabel}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                    Tier-1 Gold Credit Tier
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Algorithmic underwriting derived from verified escrow transactions, harvest consistency, and cold warehouse receipts
                </p>
              </div>

              <div className="text-right">
                <span className="text-3xl font-black text-emerald-900 font-serif">785</span>
                <span className="text-xs font-semibold text-stone-400 ml-1">/ 900</span>
              </div>
            </div>

            {/* 4 Underlying Credit Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-500 block uppercase">Escrow Fulfillment</span>
                <strong className="text-emerald-800 font-bold block mt-0.5">100% (14/14 Deals)</strong>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-500 block uppercase">Warehouse Receipts</span>
                <strong className="text-emerald-800 font-bold block mt-0.5">3 e-NWR Active</strong>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-500 block uppercase">Land Record Verified</span>
                <strong className="text-stone-900 font-bold block mt-0.5">Bhoomi 3.5 Acres</strong>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-500 block uppercase">Subvention Benefit</span>
                <strong className="text-amber-800 font-bold block mt-0.5">3% Prompt Pay Rate</strong>
              </div>
            </div>
          </div>

          {/* Institutional Credit Schemes Matching */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-stone-900 font-serif">
              Matched Low-Interest Institutional Financing Options
            </h3>

            <div className="space-y-3">
              {loanProducts.map((prod) => {
                const isSelected = selectedLoanForCalculator.id === prod.id;

                return (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setSelectedLoanForCalculator(prod);
                      setSanctionLetter(null);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500/20'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-stone-900 text-sm">
                            {prod.name}
                          </h4>
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800">
                            {prod.eligibilityStatus}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {prod.institution} &bull; {prod.approvalSpeed}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-stone-500 block">Annual Interest</span>
                        <span className="text-lg font-black text-emerald-900 font-serif">
                          {prod.interestRateAnnual}% p.a.
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100 text-[11px] text-stone-600">
                      {prod.features.map((feat) => (
                        <span key={feat} className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-stone-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Loan EMI Calculator & Instant Application */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-serif">
                  Interactive Micro-Credit Calculator: {selectedLoanForCalculator.name}
                </h3>
                <p className="text-xs text-stone-500">
                  Adjust principal and repayment horizon to compute exact monthly EMI
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
                {selectedLoanForCalculator.interestRateAnnual}% Interest
              </span>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                  <span>Required Credit Facility Amount:</span>
                  <span className="text-base font-extrabold text-stone-900 font-serif">
                    ₹{loanAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max={selectedLoanForCalculator.maxAmount}
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-emerald-700"
                />
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>₹20,000</span>
                  <span>Max: ₹{selectedLoanForCalculator.maxAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                  <span>Repayment Tenure:</span>
                  <span className="text-sm font-bold text-stone-900">{loanTenureMonths} Months</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max={selectedLoanForCalculator.tenureMonths}
                  step="3"
                  value={loanTenureMonths}
                  onChange={(e) => setLoanTenureMonths(Number(e.target.value))}
                  className="w-full accent-emerald-700"
                />
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>3 Months</span>
                  <span>Max: {selectedLoanForCalculator.tenureMonths} Months</span>
                </div>
              </div>

              {/* EMI Output Box */}
              <div className="grid grid-cols-3 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200 text-center text-xs">
                <div>
                  <span className="text-[10px] text-stone-500 block uppercase">Monthly Installment (EMI)</span>
                  <span className="text-lg font-black text-emerald-950 font-serif">₹{emi.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 block uppercase">Total Interest Cost</span>
                  <span className="text-lg font-bold text-stone-700 font-serif">₹{totalInterest.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 block uppercase">Total Repayable</span>
                  <span className="text-lg font-bold text-stone-900 font-serif">₹{totalRepayment.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleApplySimulatedLoan}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Landmark className="w-4 h-4" />
                Submit Instant Loan Application & Generate Sanction Letter
              </button>

              {/* Sanction Letter Preview */}
              {sanctionLetter && (
                <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/80 text-xs space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                    <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>In-Principle Credit Sanction Approved</span>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-800">{sanctionLetter.sanctionId}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-stone-700">
                    <div>Lender: <strong>{sanctionLetter.institution}</strong></div>
                    <div>Sanctioned Limit: <strong>₹{sanctionLetter.sanctionedAmount.toLocaleString('en-IN')}</strong></div>
                    <div>Subsidized Interest: <strong>{sanctionLetter.effectiveInterestRate}</strong></div>
                    <div>Tenure: <strong>{sanctionLetter.tenureMonths} Months (EMI ₹{sanctionLetter.monthlyEmi})</strong></div>
                  </div>
                  <p className="text-[11px] text-emerald-900 pt-1 border-t border-emerald-200">
                    ✓ {sanctionLetter.disbursementStatus}
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Right 1 Col: Recent Farm Ledger Entries */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-sm font-serif">
              Logged Farm Expenses & Sales
            </h3>
            <span className="text-xs text-stone-400">{entries.length} items</span>
          </div>

          <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-3 rounded-xl border border-stone-100 bg-stone-50/80 hover:bg-stone-50 transition-colors text-xs space-y-1"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase mb-1 ${
                      entry.type === 'income' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {entry.category.replace('_', ' ')}
                    </span>
                    <p className="font-medium text-stone-800 line-clamp-2">
                      {entry.description}
                    </p>
                  </div>
                  <span className={`font-serif font-black text-sm whitespace-nowrap ${
                    entry.type === 'income' ? 'text-emerald-800' : 'text-rose-800'
                  }`}>
                    {entry.type === 'income' ? '+' : '-'}₹{entry.amount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1 border-t border-stone-200/50">
                  <span>{entry.date}</span>
                  <span>{entry.season}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal: Log New Transaction */}
      {isAddEntryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-stone-200 relative my-8">
            <button
              type="button"
              onClick={() => setIsAddEntryModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 font-serif">
                  {t.addTransaction}
                </h3>
                <p className="text-xs text-stone-500">
                  Track inputs, labor expenses, and harvest revenues
                </p>
              </div>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-4 text-xs">
              
              <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setEntryType('expense')}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                    entryType === 'expense' ? 'bg-white text-rose-700 shadow-2xs' : 'text-stone-600'
                  }`}
                >
                  Expense / Input Cost
                </button>
                <button
                  type="button"
                  onClick={() => setEntryType('income')}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                    entryType === 'income' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-stone-600'
                  }`}
                >
                  Income / Harvest Sale
                </button>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Category</label>
                <select
                  value={entryCategory}
                  onChange={(e) => setEntryCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
                >
                  {entryType === 'expense' ? (
                    <>
                      <option value="seeds">Breeder & Certified Seeds</option>
                      <option value="fertilizer">Bio-fertilizer & Vermicompost</option>
                      <option value="labor">Manual Labor & Weeding</option>
                      <option value="irrigation">Irrigation & Pump Energy</option>
                      <option value="transport">Reefer Truck & Mandi Logistics</option>
                      <option value="equipment">Tractor & Farm Implements</option>
                    </>
                  ) : (
                    <>
                      <option value="harvest_sale">Direct Spot Market Harvest Sale</option>
                      <option value="subsidy">Government DBT Subsidy (PM-Kisan/KUSUM)</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={entryAmount}
                  onChange={(e) => setEntryAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Description / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. 2 bags enriched vermicompost"
                  value={entryDescription}
                  onChange={(e) => setEntryDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddEntryModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 font-medium text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs"
                >
                  Save Entry
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
