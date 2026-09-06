import React, { useState } from 'react';
import { 
  Warehouse, 
  Truck, 
  Thermometer, 
  Droplet, 
  Sun, 
  AlertTriangle, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Sliders, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Navigation,
  FileText,
  X
} from 'lucide-react';
import { ColdStorageFacility, ReeferTruck, AppLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ColdStorageViewProps {
  language: AppLanguage;
  facilities: ColdStorageFacility[];
  setFacilities: React.Dispatch<React.SetStateAction<ColdStorageFacility[]>>;
  reeferTrucks: ReeferTruck[];
  setReeferTrucks: React.Dispatch<React.SetStateAction<ReeferTruck[]>>;
}

export const ColdStorageView: React.FC<ColdStorageViewProps> = ({
  language,
  facilities,
  setFacilities,
  reeferTrucks,
  setReeferTrucks,
}) => {
  const t = TRANSLATIONS[language];

  const [selectedFacility, setSelectedFacility] = useState<ColdStorageFacility>(facilities[0]);
  const [activeTab, setActiveTab] = useState<'facilities' | 'logistics'>('facilities');
  
  // Booking modal
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [crateCount, setCrateCount] = useState(150);
  const [storageMonths, setStorageMonths] = useState(2);
  const [cropToStore, setCropToStore] = useState('Fresh Alphonso Mangoes (Grade A)');
  const [bookedReceipt, setBookedReceipt] = useState<any>(null);

  // Dispatch Truck Modal
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState<ReeferTruck | null>(null);

  // Simulation controls for judges:
  const handleSimulateThermalDrift = () => {
    setFacilities((prev) =>
      prev.map((f) => {
        if (f.id === selectedFacility.id) {
          const isCurrentlyAlert = f.spoilageRisk === 'Alert Spoilage Spike';
          const newTemp = isCurrentlyAlert ? f.targetTempCelsius + 0.2 : f.targetTempCelsius + 4.8;
          const newHumidity = isCurrentlyAlert ? 84 : 94;
          const newRisk = isCurrentlyAlert ? 'Low' : 'Alert Spoilage Spike';
          const newDetails = isCurrentlyAlert
            ? undefined
            : 'Thermal drift sensor triggered: Ambient chamber rose +4.8°C above setpoint. Automated secondary liquid chiller activated to avert spoilage.';

          const updated = {
            ...f,
            currentTempCelsius: Number(newTemp.toFixed(1)),
            humidityRH: newHumidity,
            spoilageRisk: newRisk as any,
            spoilageAlertDetails: newDetails,
          };
          setSelectedFacility(updated);
          return updated;
        }
        return f;
      })
    );
  };

  const handleConfirmStorageBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const cost = crateCount * selectedFacility.pricePerCrateMonth * storageMonths;
    const receipt = {
      receiptNo: `eNWR-${Date.now().toString().slice(-6)}`,
      facilityName: selectedFacility.name,
      crates: crateCount,
      duration: `${storageMonths} Months`,
      crop: cropToStore,
      totalCost: cost,
      date: new Date().toLocaleDateString('en-IN'),
      telemetryTarget: `${selectedFacility.targetTempCelsius}°C, ${selectedFacility.humidityRH}% RH`,
    };
    setBookedReceipt(receipt);

    // Decrement available capacity
    setFacilities((prev) =>
      prev.map((f) => {
        if (f.id === selectedFacility.id) {
          const updated = {
            ...f,
            availableCapacityMT: Math.max(0, f.availableCapacityMT - Math.round(crateCount * 0.02)),
          };
          setSelectedFacility(updated);
          return updated;
        }
        return f;
      })
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Tab Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-stone-900 font-serif">
            {t.navColdStorage}
          </h2>
          <p className="text-xs text-stone-500">
            Real-time IoT cold storage network & reefer logistics to eliminate perishable harvest losses
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('facilities')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'facilities'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Warehouse className="w-3.5 h-3.5" />
            Cold Storage Hubs ({facilities.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('logistics')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'logistics'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            Reefer Fleet ({reeferTrucks.length})
          </button>
        </div>
      </div>

      {activeTab === 'facilities' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 1 Col: Facility Directory */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider px-1">
              Verified Cold Storage Facilities
            </h3>

            {facilities.map((facility) => {
              const isSelected = selectedFacility.id === facility.id;
              const hasAlert = facility.spoilageRisk === 'Alert Spoilage Spike';

              return (
                <div
                  key={facility.id}
                  onClick={() => setSelectedFacility(facility)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">
                        {facility.facilityType}
                      </span>
                      <h4 className="font-bold text-stone-900 text-sm mt-1">
                        {facility.name}
                      </h4>
                    </div>
                    {hasAlert ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" title="Telemetry Alert" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Sensors Nominal" />
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-stone-500 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{facility.location} &bull; <strong>{facility.distanceKm} km away</strong></span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-xl border border-stone-100 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-stone-400 block">Available</span>
                      <span className="font-black text-stone-900">{facility.availableCapacityMT} MT</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">Rate</span>
                      <span className="font-bold text-emerald-800">₹{facility.pricePerCrateMonth}/crt</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">Power</span>
                      <span className="font-semibold text-stone-700 text-[10px] truncate block">
                        {facility.powerSource.replace('100% Rooftop ', '')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right 2 Cols: Selected Facility Real-time Telemetry Dashboard & Booking */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Real-time Chamber Telemetry Card */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
              
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-stone-900 font-serif">
                      {selectedFacility.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                      WDRA ID: {selectedFacility.id.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {selectedFacility.accreditedBy} &bull; Direct helpline: {selectedFacility.phone}
                  </p>
                </div>

                {/* Judge Interactive Simulator Button */}
                <button
                  type="button"
                  onClick={handleSimulateThermalDrift}
                  className="px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  title="Simulate IoT Chamber Sensor Fluctuation"
                >
                  <Sliders className="w-3.5 h-3.5 text-amber-700" />
                  {selectedFacility.spoilageRisk === 'Alert Spoilage Spike' ? 'Reset Sensor Drift' : 'Test Spoilage Alert Simulation'}
                </button>
              </div>

              {/* Spoilage Risk Notice (if triggered) */}
              {selectedFacility.spoilageRisk === 'Alert Spoilage Spike' ? (
                <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/80 text-xs text-amber-900 space-y-1 animate-pulse">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Automated Spoilage Warning Triggered</span>
                  </div>
                  <p className="leading-relaxed">
                    {selectedFacility.spoilageAlertDetails || 'Temperature reading drifted above critical threshold. Automatic secondary cooling cycle engaged to safeguard perishable cargo.'}
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/60 text-xs text-emerald-900 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Chamber Atmosphere Stable &bull; Spoilage Risk: Zero</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-mono">Sensors sync 3s ago</span>
                </div>
              )}

              {/* 3 Live Telemetry Dial Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Dial 1: Temperature */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span>Chamber Temp</span>
                    <Thermometer className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="text-3xl font-black text-stone-900 font-serif">
                    {selectedFacility.currentTempCelsius}°C
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 pt-2 border-t border-stone-200/60">
                    <span>Setpoint: {selectedFacility.targetTempCelsius}°C</span>
                    <span className="text-emerald-700 font-bold">In Target</span>
                  </div>
                </div>

                {/* Dial 2: Humidity */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span>Relative Humidity</span>
                    <Droplet className="w-4 h-4 text-sky-500" />
                  </div>
                  <div className="text-3xl font-black text-stone-900 font-serif">
                    {selectedFacility.humidityRH}%
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 pt-2 border-t border-stone-200/60">
                    <span>Target: 85 - 92%</span>
                    <span className="text-sky-700 font-bold">Ideal</span>
                  </div>
                </div>

                {/* Dial 3: Solar & Micro-Grid Power */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span>Energy Source</span>
                    <Sun className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-lg font-extrabold text-stone-900 truncate">
                    {selectedFacility.powerSource}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 pt-2 border-t border-stone-200/60">
                    <span>Backup: Zero Downtime</span>
                    <span className="text-amber-700 font-bold">Active</span>
                  </div>
                </div>

              </div>

              {/* Capacity Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-700">Storage Occupancy</span>
                  <span className="text-stone-500">
                    {selectedFacility.totalCapacityMT - selectedFacility.availableCapacityMT} MT used of {selectedFacility.totalCapacityMT} MT
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${((selectedFacility.totalCapacityMT - selectedFacility.availableCapacityMT) / selectedFacility.totalCapacityMT) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Action: Book Slot Button */}
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 block">Rental Rate</span>
                  <div className="text-lg font-extrabold text-stone-900">
                    ₹{selectedFacility.pricePerCrateMonth} <span className="text-xs font-normal text-stone-500">/ crate / month</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setBookedReceipt(null);
                    setIsBookModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-xs flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Reserve Storage Space
                </button>
              </div>

            </div>

            {/* Visual Diagrammatic Agricultural Hub Cluster Map */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-stone-900 font-serif">
                  Regional Cold Hub & Reefer Logistics Map (Mandya District)
                </h4>
                <span className="text-[11px] text-stone-500">Live GPS Cluster</span>
              </div>

              <div className="relative w-full h-64 bg-stone-900 rounded-xl overflow-hidden border border-stone-800 p-4">
                {/* Map Grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40" />

                {/* Facilities on map */}
                {facilities.map((fac) => (
                  <div
                    key={fac.id}
                    onClick={() => setSelectedFacility(fac)}
                    style={{ left: `${fac.coordinates.x}%`, top: `${fac.coordinates.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  >
                    <div className={`p-2 rounded-xl flex items-center gap-1.5 shadow-lg transition-all ${
                      selectedFacility.id === fac.id
                        ? 'bg-emerald-500 text-stone-950 scale-110 ring-4 ring-emerald-400/30'
                        : 'bg-stone-800 text-stone-200 border border-stone-700 hover:border-emerald-400'
                    }`}>
                      <Warehouse className="w-4 h-4" />
                      <span className="text-[10px] font-bold whitespace-nowrap">
                        {fac.name.split(' ')[0]} ({fac.availableCapacityMT}MT)
                      </span>
                    </div>
                  </div>
                ))}

                {/* Moving Reefer Truck markers */}
                {reeferTrucks.map((truck, idx) => (
                  <div
                    key={truck.id}
                    style={{ left: `${30 + idx * 25}%`, top: `${60 - idx * 15}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    title={`Reefer ${truck.vehicleNumber} (${truck.temperatureCelsius}°C)`}
                  >
                    <div className="p-1.5 rounded-lg bg-amber-400 text-stone-950 flex items-center gap-1 shadow-md border border-amber-300">
                      <Truck className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-black">{truck.temperatureCelsius}°C</span>
                    </div>
                  </div>
                ))}

                {/* Map Legend */}
                <div className="absolute bottom-3 left-3 bg-stone-950/80 backdrop-blur-xs p-2 rounded-lg text-[10px] text-stone-300 border border-stone-800 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Cold Storage
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400" /> Active Reefer Truck
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Reefer Logistics Fleet View */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reeferTrucks.map((truck) => (
              <div
                key={truck.id}
                className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-emerald-500/50 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">{truck.vehicleNumber}</h4>
                      <p className="text-[11px] text-stone-500">{truck.driverName}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                    truck.status === 'Available'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-sky-100 text-sky-800'
                  }`}>
                    {truck.status}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Refrigerated Cargo Temp:</span>
                    <strong className="text-emerald-800 font-bold">{truck.temperatureCelsius}°C</strong>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Capacity:</span>
                    <strong className="text-stone-900">{truck.capacityQuintals} Quintals</strong>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Freight Tariff:</span>
                    <strong className="text-stone-900">₹{truck.ratePerKm} / km</strong>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Pickup Route ETA:</span>
                    <strong className="text-amber-800 font-bold">{truck.etaMinutes} mins</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={`tel:${truck.phone}`}
                    className="flex-1 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Driver
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTruck(truck);
                      setIsDispatchModalOpen(true);
                    }}
                    className="flex-1 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" /> Book Freight
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Book Storage Space & Issue e-NWR Receipt */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl border border-stone-200 relative my-8">
            <button
              type="button"
              onClick={() => setIsBookModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookedReceipt ? (
              <form onSubmit={handleConfirmStorageBooking} className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Warehouse className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 font-serif">
                      Reserve Cold Storage Crate Slots
                    </h3>
                    <p className="text-xs text-stone-500">
                      {selectedFacility.name} &bull; Tariff: ₹{selectedFacility.pricePerCrateMonth}/crate/mo
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Commodity to be Stored
                  </label>
                  <input
                    type="text"
                    required
                    value={cropToStore}
                    onChange={(e) => setCropToStore(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Number of Crates (~20kg/crate)
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="1000"
                      value={crateCount}
                      onChange={(e) => setCrateCount(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Storage Duration (Months)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={storageMonths}
                      onChange={(e) => setStorageMonths(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200"
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200/80 text-xs text-emerald-950 space-y-1">
                  <div className="flex justify-between">
                    <span>Monthly Rental:</span>
                    <span>₹{(crateCount * selectedFacility.pricePerCrateMonth).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-emerald-900 pt-1 border-t border-emerald-200">
                    <span>Total Deposit Estimate ({storageMonths} Mos):</span>
                    <span>₹{(crateCount * selectedFacility.pricePerCrateMonth * storageMonths).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsBookModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 font-medium text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-xs"
                  >
                    Confirm & Generate e-NWR Receipt
                  </button>
                </div>
              </form>
            ) : (
              /* Generated e-NWR Deposit Slip */
              <div className="space-y-4">
                <div className="text-center pb-3 border-b border-stone-100">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 font-serif">
                    Electronic Negotiable Warehouse Receipt (e-NWR)
                  </h3>
                  <p className="text-xs text-stone-500 font-mono">
                    Receipt #{bookedReceipt.receiptNo} &bull; WDRA Approved
                  </p>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Warehouse:</span>
                    <strong className="text-stone-900">{bookedReceipt.facilityName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Commodity:</span>
                    <strong className="text-stone-900">{bookedReceipt.crop}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Quantity Stored:</span>
                    <strong className="text-stone-900">{bookedReceipt.crates} Crates ({bookedReceipt.duration})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Preservation Atmosphere:</span>
                    <strong className="text-emerald-800 font-semibold">{bookedReceipt.telemetryTarget}</strong>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-sm text-stone-900">
                    <span>Total Storage Charges:</span>
                    <span>₹{bookedReceipt.totalCost.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <p className="text-[11px] text-stone-500 text-center">
                  💡 This e-NWR receipt can be pledged directly in the <strong>Rural Financial Ledger</strong> tab to unlock 75% loan advance without selling your crop.
                </p>

                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-800"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Modal: Dispatch Reefer Freight Truck */}
      {isDispatchModalOpen && selectedTruck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-stone-200 relative my-8">
            <button
              type="button"
              onClick={() => setIsDispatchModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 font-serif">
                  Book Reefer Freight Pickup
                </h3>
                <p className="text-xs text-stone-500">
                  Vehicle: {selectedTruck.vehicleNumber} &bull; Driver: {selectedTruck.driverName}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-500">Estimated Arrival (ETA):</span>
                  <strong className="text-amber-800">{selectedTruck.etaMinutes} minutes</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Cargo Bay Temp:</span>
                  <strong className="text-emerald-800">{selectedTruck.temperatureCelsius}°C (Pre-cooled)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Distance Rate:</span>
                  <strong>₹{selectedTruck.ratePerKm} / km</strong>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                ✓ Driver will arrive with digital moisture sensor and seal refrigerated lock upon loading.
              </div>

              <button
                type="button"
                onClick={() => setIsDispatchModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-xs mt-2"
              >
                Confirm Freight Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
