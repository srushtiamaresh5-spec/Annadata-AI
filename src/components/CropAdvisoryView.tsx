import React, { useState } from 'react';
import { 
  Sparkles, 
  Sprout, 
  Droplet, 
  Calendar, 
  TrendingUp, 
  IndianRupee, 
  CheckCircle2, 
  ArrowRight, 
  Leaf, 
  Sun, 
  Clock, 
  MapPin,
  RefreshCw,
  Award
} from 'lucide-react';
import { AppLanguage, CropForecastResult } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface CropAdvisoryViewProps {
  language: AppLanguage;
}

export const CropAdvisoryView: React.FC<CropAdvisoryViewProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  // Wizard state
  const [soilType, setSoilType] = useState('Red Loamy Soil (Well-Drained)');
  const [waterSource, setWaterSource] = useState('Drip Irrigation + Solar Borewell');
  const [acreage, setAcreage] = useState<number>(3.5);
  const [targetSeason, setTargetSeason] = useState('Kharif 2026 (Monsoon)');
  const [district, setDistrict] = useState('Mandya');
  const [state, setState] = useState('Karnataka');

  const [isLoading, setIsLoading] = useState(false);
  const [forecastResult, setForecastResult] = useState<CropForecastResult | null>({
    topRecommendedCrops: [
      {
        name: 'Finger Millet (Ragi - GPU 28 High Calcium)',
        suitabilityScore: 96,
        projectedYieldPerAcre: '15 - 18 Quintals',
        estimatedHarvestDurationDays: 105,
        projectedMarketPricePerQuintal: 4350,
        estimatedInputCostPerAcre: 9800,
        expectedNetReturnPerAcre: 55450,
        waterRequirement: 'Low (Drought Resilient)',
        climateResilience: 'Very High',
        marketDemandIndex: 9.4,
      },
      {
        name: 'Organic Red Gram (Pigeon Pea - BRG 4)',
        suitabilityScore: 92,
        projectedYieldPerAcre: '9 - 12 Quintals',
        estimatedHarvestDurationDays: 130,
        projectedMarketPricePerQuintal: 8600,
        estimatedInputCostPerAcre: 11500,
        expectedNetReturnPerAcre: 65900,
        waterRequirement: 'Moderate',
        climateResilience: 'High',
        marketDemandIndex: 8.9,
      },
      {
        name: 'Salem Native Turmeric (High Curcumin)',
        suitabilityScore: 89,
        projectedYieldPerAcre: '24 - 28 Quintals',
        estimatedHarvestDurationDays: 240,
        projectedMarketPricePerQuintal: 12200,
        estimatedInputCostPerAcre: 28000,
        expectedNetReturnPerAcre: 264800,
        waterRequirement: 'Moderate (Drip)',
        climateResilience: 'Moderate',
        marketDemandIndex: 9.6,
      },
    ],
    microClimateNotes: 'Southern Deccan Agro-Climatic Zone: Favorable late monsoon moisture retention. Night temperature between 19°C-23°C will optimize grain filling without blast disease risk.',
    soilNutrientAdvice: 'Apply 4 MT enriched vermicompost + 250kg Jeevamrutha per acre before primary disc ploughing. Seed treat with Azospirillum bio-fertilizer.',
  });

  const handleGenerateForecast = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/advisory/forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          soilType,
          waterSource,
          acreage,
          targetSeason,
          district,
          state,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setForecastResult(data);
      }
    } catch (err) {
      console.error('Forecast request error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-stone-900 font-serif">
              {t.navAdvisory}
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-sky-600" />
              AI Agro-Climatic Model
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Micro-climate yield simulation, price forecasting, and month-by-month organic crop playbook
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-600 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200 shrink-0">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>Zone: <strong>Mandya District, Southern Dry Zone</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Col: Input Wizard */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <Sprout className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-stone-900 text-sm font-serif">
              Micro-Climate Input Parameters
            </h3>
          </div>

          <form onSubmit={handleGenerateForecast} className="space-y-3.5">
            
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.soilType}
              </label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white"
              >
                <option value="Red Loamy Soil (Well-Drained)">Red Loamy Soil (Well-Drained)</option>
                <option value="Black Cotton Clay Soil (High Moisture Retention)">Black Cotton Clay Soil</option>
                <option value="Alluvial Riverine Loam">Alluvial Riverine Loam</option>
                <option value="Sandy Loam (High Drainage)">Sandy Loam</option>
                <option value="Laterite Acidic Soil">Laterite Soil</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.waterSource}
              </label>
              <select
                value={waterSource}
                onChange={(e) => setWaterSource(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white"
              >
                <option value="Drip Irrigation + Solar Borewell">Drip Irrigation + Solar Borewell</option>
                <option value="Canal Irrigation (Perennial)">Canal Irrigation (Perennial)</option>
                <option value="Rainfed Monsoon (Dryland)">Rainfed Monsoon (Dryland)</option>
                <option value="Open Well / Farm Pond">Open Well / Farm Pond</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.acreage}
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="100"
                  value={acreage}
                  onChange={(e) => setAcreage(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.season}
                </label>
                <select
                  value={targetSeason}
                  onChange={(e) => setTargetSeason(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white"
                >
                  <option value="Kharif 2026 (Monsoon)">Kharif (Monsoon)</option>
                  <option value="Rabi 2026 (Winter)">Rabi (Winter)</option>
                  <option value="Zaid 2026 (Summer)">Zaid (Summer)</option>
                </select>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 space-y-1">
              <span className="font-bold text-stone-800 block">Location Calibrated:</span>
              <p>{district}, {state} &bull; Latitude 12.52° N</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Generating AI Simulation...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  {t.generateAdvisory}
                </>
              )}
            </button>

          </form>
        </div>

        {/* Right 2 Cols: Yield Prediction Matrix & Recommended Crops */}
        <div className="lg:col-span-2 space-y-6">
          
          {forecastResult && (
            <>
              {/* Agro-Met Notes & Soil Advice Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 border border-sky-200/70 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-sky-950">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <span>Micro-Climate Forecast & Soil Restoration Guide</span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  {forecastResult.microClimateNotes}
                </p>
                <div className="pt-2 border-t border-sky-200/60 text-emerald-900 font-medium">
                  🌱 <strong>Organic Prep:</strong> {forecastResult.soilNutrientAdvice}
                </div>
              </div>

              {/* Recommended Crops Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    Recommended Crop Portfolio ({acreage} Acres Simulation)
                  </h3>
                  <span className="text-xs text-stone-500">Ranked by Net ROI & Climate Resilience</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {forecastResult.topRecommendedCrops.map((crop, idx) => {
                    const totalFarmNetReturn = crop.expectedNetReturnPerAcre * acreage;
                    const totalInputCost = crop.estimatedInputCostPerAcre * acreage;

                    return (
                      <div
                        key={crop.name}
                        className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-emerald-500 transition-all shadow-2xs space-y-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-black text-xs flex items-center justify-center font-serif">
                              #{idx + 1}
                            </span>
                            <div>
                              <h4 className="text-base font-bold text-stone-900 font-serif">
                                {crop.name}
                              </h4>
                              <span className="text-xs text-stone-500">
                                Harvest Cycle: <strong>{crop.estimatedHarvestDurationDays} Days</strong> &bull; Water: {crop.waterRequirement}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              {crop.suitabilityScore}% Match
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
                              Demand {crop.marketDemandIndex} / 10
                            </span>
                          </div>
                        </div>

                        {/* Financial Projection Metrics */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-3 rounded-xl border border-stone-100 text-center text-xs">
                          <div>
                            <span className="text-[10px] text-stone-500 block uppercase">Projected Yield</span>
                            <span className="font-bold text-stone-900">{crop.projectedYieldPerAcre} / acre</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-stone-500 block uppercase">Forecast Mandi Rate</span>
                            <span className="font-bold text-stone-900">₹{crop.projectedMarketPricePerQuintal} / Qtl</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-stone-500 block uppercase">Est. Input Cost ({acreage} Ac)</span>
                            <span className="font-bold text-stone-600">₹{totalInputCost.toLocaleString('en-IN')}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-stone-500 block uppercase">Est. Net Profit ({acreage} Ac)</span>
                            <span className="font-black text-emerald-800 text-sm">₹{totalFarmNetReturn.toLocaleString('en-IN')}</span>
                          </div>
                        </div>

                        {/* Step-by-step Agronomy Cycle Timeline */}
                        <div className="pt-2 border-t border-stone-100 text-xs">
                          <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-2">
                            Agronomy Execution Milestones
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-stone-600">
                            <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                              <strong className="text-emerald-900 block font-semibold">Day 1 - 7</strong>
                              <span>Seed priming & shallow sowing (3cm)</span>
                            </div>
                            <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                              <strong className="text-emerald-900 block font-semibold">Day 25 - 30</strong>
                              <span>Weeding + Jeevamrutha foliar spray</span>
                            </div>
                            <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                              <strong className="text-emerald-900 block font-semibold">Day 60 - 75</strong>
                              <span>Panicle emergence & moisture guard</span>
                            </div>
                            <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-100">
                              <strong className="text-amber-900 block font-semibold">Day {crop.estimatedHarvestDurationDays}</strong>
                              <span>Harvest at 12% moisture & list on Spot Market</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
};
