import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  ShieldCheck, 
  Clock, 
  Droplet, 
  MapPin, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  TrendingUp, 
  DollarSign, 
  Sparkles,
  Truck,
  Check,
  Building2,
  AlertCircle
} from 'lucide-react';
import { 
  ProduceListing, 
  CropCategory, 
  AppLanguage, 
  UserRole, 
  QualityGrade, 
  EscrowDeal, 
  EscrowStatus 
} from '../types';
import { TRANSLATIONS } from '../data/translations';

interface MarketplaceViewProps {
  language: AppLanguage;
  userRole: UserRole;
  listings: ProduceListing[];
  setListings: React.Dispatch<React.SetStateAction<ProduceListing[]>>;
  activeEscrows: EscrowDeal[];
  setActiveEscrows: React.Dispatch<React.SetStateAction<EscrowDeal[]>>;
  isListModalOpen: boolean;
  setIsListModalOpen: (open: boolean) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  language,
  userRole,
  listings,
  setListings,
  activeEscrows,
  setActiveEscrows,
  isListModalOpen,
  setIsListModalOpen,
}) => {
  const t = TRANSLATIONS[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CropCategory | 'all'>('all');
  const [selectedListingForBid, setSelectedListingForBid] = useState<ProduceListing | null>(null);
  const [selectedEscrowForTracking, setSelectedEscrowForTracking] = useState<EscrowDeal | null>(null);

  // New Listing Form State
  const [newCropName, setNewCropName] = useState('');
  const [newVariety, setNewVariety] = useState('');
  const [newCategory, setNewCategory] = useState<CropCategory>('grains');
  const [newQuantity, setNewQuantity] = useState<number>(50);
  const [newMinOrder, setNewMinOrder] = useState<number>(5);
  const [newPrice, setNewPrice] = useState<number>(4500);
  const [newQualityGrade, setNewQualityGrade] = useState<QualityGrade>('Grade A+ Organic');
  const [newOrganic, setNewOrganic] = useState<boolean>(true);
  const [newCertAgency, setNewCertAgency] = useState('Vedic Organic Certification (NPOP)');
  const [newLocation, setNewLocation] = useState('Pandavapura, Mandya, Karnataka');
  const [newShelfLifeDays, setNewShelfLifeDays] = useState<number>(180);
  const [newMoisture, setNewMoisture] = useState<number>(11.5);
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80');

  // Bid Form State
  const [bidPrice, setBidPrice] = useState<number>(0);
  const [bidQuantity, setBidQuantity] = useState<number>(0);
  const [bidBuyerName, setBidBuyerName] = useState('Deccan Agri-Processor Ltd');
  const [bidBuyerType, setBidBuyerType] = useState<'Bulk Processor' | 'Consumer Co-op' | 'FPO Aggregator' | 'Export House'>('Bulk Processor');

  // OTP confirmation simulation
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  // Filter listings
  const filteredListings = listings.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const localizedName = language === 'kn' ? item.cropNameKn || item.cropName : language === 'hi' ? item.cropNameHi || item.cropName : item.cropName;
    const matchesSearch = 
      localizedName.toLowerCase().includes(query) ||
      item.variety.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.farmerName.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCropName) return;

    const newListing: ProduceListing = {
      id: `prod-${Date.now()}`,
      cropName: newCropName,
      cropNameKn: `${newCropName} (ಸ್ಥಳೀಯ)`,
      cropNameHi: `${newCropName} (स्थानीय)`,
      variety: newVariety || 'Native High-Yield Certified',
      category: newCategory,
      farmerName: 'Basavarajappa H.',
      farmerPhone: '+91 94812 34567',
      location: newLocation,
      district: 'Mandya',
      state: 'Karnataka',
      quantityQuintals: Number(newQuantity),
      minOrderQuintals: Number(newMinOrder),
      pricePerQuintal: Number(newPrice),
      qualityGrade: newQualityGrade,
      organicCertified: newOrganic,
      certificationAgency: newOrganic ? newCertAgency : undefined,
      harvestTimestamp: 'Harvested today (Fresh)',
      shelfLifeDays: Number(newShelfLifeDays),
      moisturePercent: Number(newMoisture),
      imageUrl: newImageUrl || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
      status: 'active',
      bids: [],
    };

    setListings([newListing, ...listings]);
    setIsListModalOpen(false);
    // Reset form
    setNewCropName('');
    setNewVariety('');
  };

  const handleOpenBidModal = (listing: ProduceListing) => {
    setSelectedListingForBid(listing);
    setBidPrice(listing.pricePerQuintal);
    setBidQuantity(listing.minOrderQuintals);
  };

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListingForBid) return;

    const newBid = {
      id: `bid-${Date.now()}`,
      buyerName: bidBuyerName,
      buyerType: bidBuyerType,
      bidPricePerQuintal: Number(bidPrice),
      quantityRequested: Number(bidQuantity),
      timestamp: 'Just now',
      status: 'pending' as const,
    };

    // Update listings
    const updated = listings.map((l) => {
      if (l.id === selectedListingForBid.id) {
        return {
          ...l,
          status: 'in_bidding' as const,
          bids: [newBid, ...l.bids],
        };
      }
      return l;
    });

    setListings(updated);
    setSelectedListingForBid(null);
  };

  const handleAcceptBidAndLockEscrow = (listing: ProduceListing, bid: any) => {
    const totalAmount = bid.bidPricePerQuintal * bid.quantityRequested;
    const newEscrow: EscrowDeal = {
      id: `escrow-${Date.now().toString().slice(-4)}`,
      listingId: listing.id,
      cropName: `${listing.cropName} (${bid.quantityRequested} Qtl)`,
      buyerName: bid.buyerName,
      farmerName: listing.farmerName,
      totalAmount,
      escrowStatus: 'ESCROW_FUNDED',
      inspectionCode: `QC-${Math.floor(1000 + Math.random() * 9000)}`,
      deliveryOtp: `${Math.floor(1000 + Math.random() * 9000)}`,
      notes: `Direct contract locked at ₹${bid.bidPricePerQuintal}/Qtl. 100% funds sequestered in escrow vault.`,
    };

    const updatedListings = listings.map((l) => {
      if (l.id === listing.id) {
        return {
          ...l,
          status: 'escrow_locked' as const,
          activeEscrow: newEscrow,
          bids: l.bids.map((b) => b.id === bid.id ? { ...b, status: 'accepted' as const } : b),
        };
      }
      return l;
    });

    setListings(updatedListings);
    setActiveEscrows([newEscrow, ...activeEscrows]);
    setSelectedEscrowForTracking(newEscrow);
  };

  const advanceEscrowStatus = (escrowId: string, nextStatus: EscrowStatus) => {
    const updatedEscrows = activeEscrows.map((e) => {
      if (e.id === escrowId) {
        return {
          ...e,
          escrowStatus: nextStatus,
          dispatchedTime: nextStatus === 'DISPATCHED_IN_TRANSIT' ? 'En route via Reefer #KA-04-E-4019' : e.dispatchedTime,
          deliveredTime: nextStatus === 'PAYMENT_RELEASED' ? 'Funds transferred directly to Farmer Bank via DBT' : e.deliveredTime,
        };
      }
      return e;
    });

    setActiveEscrows(updatedEscrows);

    // Sync listing state
    setListings((prev) =>
      prev.map((l) => {
        if (l.activeEscrow?.id === escrowId) {
          const updatedDeal = updatedEscrows.find((e) => e.id === escrowId);
          return {
            ...l,
            status: nextStatus === 'PAYMENT_RELEASED' ? 'sold' : 'escrow_locked',
            activeEscrow: updatedDeal,
          };
        }
        return l;
      })
    );

    if (selectedEscrowForTracking?.id === escrowId) {
      const updated = updatedEscrows.find((e) => e.id === escrowId);
      if (updated) setSelectedEscrowForTracking(updated);
    }
  };

  const handleVerifyOtpAndRelease = (e: React.FormEvent, escrow: EscrowDeal) => {
    e.preventDefault();
    if (enteredOtp.trim() !== escrow.deliveryOtp) {
      setOtpError(`Invalid OTP. Use simulated OTP: ${escrow.deliveryOtp}`);
      return;
    }
    setOtpError('');
    advanceEscrowStatus(escrow.id, 'PAYMENT_RELEASED');
    setEnteredOtp('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header with Search & Filter bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchProduce}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 bg-stone-50/60"
          />
        </div>

        {/* Action Button: List produce */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsListModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition-all shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            {t.listProduceBtn}
          </button>
        </div>

      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: t.filterAll },
          { id: 'grains', label: t.filterGrains },
          { id: 'fruits', label: t.filterFruits },
          { id: 'spices', label: t.filterSpices },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === cat.id
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-2xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Produce Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((item) => {
          const localizedName = language === 'kn' ? item.cropNameKn || item.cropName : language === 'hi' ? item.cropNameHi || item.cropName : item.cropName;
          const hasActiveEscrow = item.activeEscrow !== undefined;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col"
            >
              {/* Image & Badges */}
              <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.cropName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/30" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-white/95 text-stone-900 shadow-xs backdrop-blur-xs">
                    {item.qualityGrade}
                  </span>
                  {item.organicCertified && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-700 text-white shadow-xs flex items-center gap-1">
                      <Award className="w-3 h-3" /> Organic NPOP
                    </span>
                  )}
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  {item.status === 'escrow_locked' && (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-400 text-stone-950 shadow-xs flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Escrow Locked
                    </span>
                  )}
                  {item.status === 'in_bidding' && (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-sky-500 text-white shadow-xs">
                      {item.bids.length} Active Bids
                    </span>
                  )}
                  {item.status === 'sold' && (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-stone-700 text-white shadow-xs">
                      Delivered & Settled
                    </span>
                  )}
                  {item.status === 'active' && (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-600 text-white shadow-xs">
                      Available for Bid
                    </span>
                  )}
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-lg font-bold font-serif leading-tight text-white drop-shadow-xs">
                    {localizedName}
                  </h3>
                  <p className="text-xs text-stone-200 font-medium">
                    {item.variety}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                
                {/* Farmer & Location Info */}
                <div className="flex items-center justify-between text-xs text-stone-600 border-b border-stone-100 pb-2.5">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] shrink-0">
                      {item.farmerName.charAt(0)}
                    </span>
                    <span className="font-semibold text-stone-900 truncate">{item.farmerName}</span>
                  </div>
                  <div className="flex items-center gap-1 text-stone-500 shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{item.district}, {item.state}</span>
                  </div>
                </div>

                {/* Quantity & Price specs */}
                <div className="grid grid-cols-3 gap-2 bg-stone-50 p-2.5 rounded-xl text-center border border-stone-100">
                  <div>
                    <span className="text-[10px] text-stone-500 block uppercase font-medium">Available</span>
                    <span className="text-sm font-black text-stone-900">{item.quantityQuintals} Qtl</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 block uppercase font-medium">{t.shelfLifeDays}</span>
                    <span className="text-sm font-bold text-amber-800 flex items-center justify-center gap-0.5">
                      <Clock className="w-3 h-3 text-amber-600" />
                      {item.shelfLifeDays}d
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 block uppercase font-medium">{t.moisture}</span>
                    <span className="text-sm font-bold text-sky-800 flex items-center justify-center gap-0.5">
                      <Droplet className="w-3 h-3 text-sky-600" />
                      {item.moisturePercent}%
                    </span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-xs text-stone-500">Asking Spot Rate</span>
                    <div className="text-xl font-black text-emerald-900 font-serif">
                      ₹{item.pricePerQuintal.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-stone-500 ml-1">/ Quintal</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-stone-500 text-right">
                    Min Order: {item.minOrderQuintals} Qtl
                  </span>
                </div>

                {/* Bidding & Escrow Action Buttons */}
                <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
                  {item.status === 'escrow_locked' && item.activeEscrow && (
                    <button
                      type="button"
                      onClick={() => setSelectedEscrowForTracking(item.activeEscrow!)}
                      className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Track Escrow ({item.activeEscrow.escrowStatus.replace('_', ' ')})
                    </button>
                  )}

                  {item.status !== 'escrow_locked' && item.status !== 'sold' && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleOpenBidModal(item)}
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                      >
                        <TrendingUp className="w-3.5 h-3.5" />
                        {t.placeBidBtn}
                      </button>

                      {item.bids.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedListingForBid(item)}
                          className="py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-medium text-xs flex items-center justify-center gap-1"
                          title="Review Bids"
                        >
                          {item.bids.length} Bids
                        </button>
                      )}
                    </>
                  )}

                  {item.status === 'sold' && (
                    <div className="w-full py-2 px-3 rounded-xl bg-stone-100 text-stone-600 font-semibold text-xs text-center">
                      ✓ Deal Closed & Payment Disbursed
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Modal 1: List New Harvest Produce (Farmer) */}
      {isListModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-xl border border-stone-200 relative my-8">
            <button
              type="button"
              onClick={() => setIsListModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 font-serif">
                  {t.listProduceBtn}
                </h3>
                <p className="text-xs text-stone-500">
                  Connect harvest batches directly to agribusiness buyers without intermediary commission
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Crop Name (e.g., Organic Millets, Fresh Mangoes)
                  </label>
                  <input
                    type="text"
                    required
                    value={newCropName}
                    onChange={(e) => setNewCropName(e.target.value)}
                    placeholder="Finger Millet / Ragi"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-600/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Variety / Cultivar Spec
                  </label>
                  <input
                    type="text"
                    value={newVariety}
                    onChange={(e) => setNewVariety(e.target.value)}
                    placeholder="GPU 28 Native Breeder Seed"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-600/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
                  >
                    <option value="grains">Grains & Millets</option>
                    <option value="fruits">Fruits</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="spices">Spices</option>
                    <option value="pulses">Pulses</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Total Quantity (Qtl)</label>
                  <input
                    type="number"
                    min="1"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Price / Quintal (₹)</label>
                  <input
                    type="number"
                    min="100"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Quality Grade</label>
                  <select
                    value={newQualityGrade}
                    onChange={(e) => setNewQualityGrade(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
                  >
                    <option value="Grade A+ Organic">Grade A+ Organic</option>
                    <option value="Grade A Export">Grade A Export</option>
                    <option value="Grade B Premium">Grade B Premium</option>
                    <option value="Grade Standard">Grade Standard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Shelf Life (Days)</label>
                  <input
                    type="number"
                    value={newShelfLifeDays}
                    onChange={(e) => setNewShelfLifeDays(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Moisture %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newMoisture}
                    onChange={(e) => setNewMoisture(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200"
                  />
                </div>
              </div>

              {/* Organic Certification toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <div>
                  <span className="text-xs font-bold text-emerald-950 block">Certified Organic NPOP?</span>
                  <span className="text-[11px] text-emerald-700">Premium pricing unlocked with valid certificate</span>
                </div>
                <input
                  type="checkbox"
                  checked={newOrganic}
                  onChange={(e) => setNewOrganic(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Location & District</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsListModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 font-medium text-sm hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-xs"
                >
                  Publish Harvest Listing
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Buyer Bidding Portal & Bids Review */}
      {selectedListingForBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-xl border border-stone-200 relative my-8">
            <button
              type="button"
              onClick={() => setSelectedListingForBid(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 font-serif">
                  Bidding & Purchase Portal
                </h3>
                <p className="text-xs text-stone-500">
                  {selectedListingForBid.cropName} &bull; Asking: ₹{selectedListingForBid.pricePerQuintal}/Qtl
                </p>
              </div>
            </div>

            {/* Existing Bids List (Farmer or Buyer view) */}
            {selectedListingForBid.bids.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Active Received Bids ({selectedListingForBid.bids.length})
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedListingForBid.bids.map((bid) => (
                    <div
                      key={bid.id}
                      className="p-3 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-stone-900">{bid.buyerName}</div>
                        <span className="text-[11px] text-stone-500">
                          {bid.buyerType} &bull; {bid.quantityRequested} Qtl @ ₹{bid.bidPricePerQuintal}/Qtl
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900">
                          ₹{(bid.bidPricePerQuintal * bid.quantityRequested).toLocaleString('en-IN')}
                        </span>
                        {bid.status === 'pending' && userRole !== 'buyer' && (
                          <button
                            type="button"
                            onClick={() => handleAcceptBidAndLockEscrow(selectedListingForBid, bid)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1 shadow-2xs"
                          >
                            <Check className="w-3 h-3" /> Accept & Escrow
                          </button>
                        )}
                        {bid.status === 'accepted' && (
                          <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                            Accepted
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Place New Bid Form (For Buyers or simulated test) */}
            <form onSubmit={handlePlaceBid} className="space-y-4 pt-2 border-t border-stone-100">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Submit Formal Bid Offer
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Buyer Entity / Co-op Name
                  </label>
                  <input
                    type="text"
                    required
                    value={bidBuyerName}
                    onChange={(e) => setBidBuyerName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Buyer Category
                  </label>
                  <select
                    value={bidBuyerType}
                    onChange={(e) => setBidBuyerType(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
                  >
                    <option value="Bulk Processor">Bulk Food Processor</option>
                    <option value="Consumer Co-op">Urban Consumer Co-op</option>
                    <option value="FPO Aggregator">FPO Cluster Aggregator</option>
                    <option value="Export House">Export Consortium</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Bid Offer (₹ / Quintal)
                  </label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={bidPrice}
                    onChange={(e) => setBidPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Quantity Required (Qtl)
                  </label>
                  <input
                    type="number"
                    min={selectedListingForBid.minOrderQuintals}
                    max={selectedListingForBid.quantityQuintals}
                    required
                    value={bidQuantity}
                    onChange={(e) => setBidQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200"
                  />
                </div>
              </div>

              {/* Total Calculation */}
              <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs text-amber-900">
                <span className="font-medium">Total Escrow Commit:</span>
                <span className="text-base font-extrabold font-serif">
                  ₹{(bidPrice * bidQuantity).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedListingForBid(null)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 font-medium text-sm"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-xs"
                >
                  Confirm & Submit Bid
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Interactive Digital Escrow State Machine Simulation */}
      {selectedEscrowForTracking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-xl border border-stone-200 relative my-8">
            <button
              type="button"
              onClick={() => setSelectedEscrowForTracking(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 font-serif">
                  Digital Escrow Settlement Vault
                </h3>
                <p className="text-xs text-stone-500">
                  Contract #{selectedEscrowForTracking.id} &bull; Total Value: ₹{selectedEscrowForTracking.totalAmount.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* 4 Phase Stepper */}
            <div className="space-y-4 mb-6">
              
              {/* Phase 1: Escrow Funded */}
              <div className="flex items-start gap-3 p-3 rounded-xl border border-emerald-200 bg-emerald-50/70">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-950">Phase 1: Escrow Vault Funded</span>
                    <span className="text-[11px] font-semibold text-emerald-700">✓ Funds Locked</span>
                  </div>
                  <p className="text-emerald-800 mt-0.5">
                    Buyer ({selectedEscrowForTracking.buyerName}) deposited ₹{selectedEscrowForTracking.totalAmount.toLocaleString('en-IN')} into safe digital vault.
                  </p>
                </div>
              </div>

              {/* Phase 2: Quality Inspection */}
              <div className={`flex items-start gap-3 p-3 rounded-xl border text-xs ${
                selectedEscrowForTracking.escrowStatus !== 'ESCROW_FUNDED'
                  ? 'border-emerald-200 bg-emerald-50/70'
                  : 'border-amber-200 bg-amber-50/70'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  selectedEscrowForTracking.escrowStatus !== 'ESCROW_FUNDED'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-600 text-white'
                }`}>
                  2
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">Phase 2: Agmark Quality Certification</span>
                    <span className="font-mono text-xs font-semibold text-stone-700">
                      Code: {selectedEscrowForTracking.inspectionCode}
                    </span>
                  </div>
                  <p className="text-stone-600 mt-0.5">
                    FPO Quality Inspector conducts moisture, pest, and grade verification.
                  </p>

                  {selectedEscrowForTracking.escrowStatus === 'ESCROW_FUNDED' && (
                    <button
                      type="button"
                      onClick={() => advanceEscrowStatus(selectedEscrowForTracking.id, 'QUALITY_VERIFIED')}
                      className="mt-2 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                    >
                      Verify Quality & Sign Certificate
                    </button>
                  )}
                </div>
              </div>

              {/* Phase 3: Cold Reefer Transit */}
              <div className={`flex items-start gap-3 p-3 rounded-xl border text-xs ${
                selectedEscrowForTracking.escrowStatus === 'DISPATCHED_IN_TRANSIT' || selectedEscrowForTracking.escrowStatus === 'PAYMENT_RELEASED'
                  ? 'border-emerald-200 bg-emerald-50/70'
                  : 'border-stone-200 bg-stone-50'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  selectedEscrowForTracking.escrowStatus === 'DISPATCHED_IN_TRANSIT' || selectedEscrowForTracking.escrowStatus === 'PAYMENT_RELEASED'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-300 text-stone-600'
                }`}>
                  3
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">Phase 3: Reefer Truck Cold Dispatch</span>
                    {selectedEscrowForTracking.dispatchedTime && (
                      <span className="text-[11px] text-emerald-800 font-medium">In Transit</span>
                    )}
                  </div>
                  <p className="text-stone-600 mt-0.5">
                    Live GPS & thermal sensors verify temperature maintenance during highway transit.
                  </p>

                  {selectedEscrowForTracking.escrowStatus === 'QUALITY_VERIFIED' && (
                    <button
                      type="button"
                      onClick={() => advanceEscrowStatus(selectedEscrowForTracking.id, 'DISPATCHED_IN_TRANSIT')}
                      className="mt-2 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5" /> Dispatch Reefer Truck #KA-04-E-4019
                    </button>
                  )}
                </div>
              </div>

              {/* Phase 4: Delivery OTP Verification & Payment Release */}
              <div className={`flex items-start gap-3 p-3 rounded-xl border text-xs ${
                selectedEscrowForTracking.escrowStatus === 'PAYMENT_RELEASED'
                  ? 'border-emerald-300 bg-emerald-100/60'
                  : 'border-stone-200 bg-stone-50'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  selectedEscrowForTracking.escrowStatus === 'PAYMENT_RELEASED'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-300 text-stone-600'
                }`}>
                  4
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">Phase 4: OTP Confirmation & DBT Release</span>
                    {selectedEscrowForTracking.escrowStatus === 'PAYMENT_RELEASED' && (
                      <span className="text-emerald-800 font-bold">✓ 100% Settled</span>
                    )}
                  </div>
                  <p className="text-stone-600 mt-0.5">
                    Farmer receives instant funds in bank account once buyer enters delivery OTP: <strong className="font-mono bg-stone-200 px-1.5 py-0.5 rounded">{selectedEscrowForTracking.deliveryOtp}</strong>
                  </p>

                  {selectedEscrowForTracking.escrowStatus === 'DISPATCHED_IN_TRANSIT' && (
                    <form
                      onSubmit={(e) => handleVerifyOtpAndRelease(e, selectedEscrowForTracking)}
                      className="mt-3 flex items-center gap-2"
                    >
                      <input
                        type="text"
                        maxLength={4}
                        placeholder={`OTP: ${selectedEscrowForTracking.deliveryOtp}`}
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                        className="px-3 py-1.5 text-xs font-mono font-bold rounded-lg border border-stone-300 w-32 focus:ring-2 focus:ring-emerald-600"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                      >
                        Verify OTP & Release ₹{selectedEscrowForTracking.totalAmount.toLocaleString('en-IN')}
                      </button>
                    </form>
                  )}

                  {otpError && (
                    <p className="text-rose-600 text-[11px] mt-1 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {otpError}
                    </p>
                  )}
                </div>
              </div>

            </div>

            <div className="flex justify-end pt-3 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setSelectedEscrowForTracking(null)}
                className="px-4 py-2 rounded-xl bg-stone-900 text-white font-medium text-xs hover:bg-stone-800"
              >
                Close Escrow Inspector
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
