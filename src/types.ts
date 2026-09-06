export type AppLanguage = 'en' | 'kn' | 'hi';

export type UserRole = 'farmer' | 'buyer' | 'fpo_admin';

export type ActiveTab = 
  | 'dashboard'
  | 'marketplace'
  | 'coldstorage'
  | 'advisory'
  | 'ledger'
  | 'agronomist';

export type CropCategory = 'grains' | 'fruits' | 'vegetables' | 'spices' | 'pulses';

export type QualityGrade = 'Grade A+ Organic' | 'Grade A Export' | 'Grade B Premium' | 'Grade Standard';

export interface Bid {
  id: string;
  buyerName: string;
  buyerType: 'Bulk Processor' | 'Consumer Co-op' | 'FPO Aggregator' | 'Export House';
  bidPricePerQuintal: number;
  quantityRequested: number;
  timestamp: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export type EscrowStatus = 
  | 'ESCROW_FUNDED' 
  | 'QUALITY_VERIFIED' 
  | 'DISPATCHED_IN_TRANSIT' 
  | 'PAYMENT_RELEASED';

export interface EscrowDeal {
  id: string;
  listingId: string;
  cropName: string;
  buyerName: string;
  farmerName: string;
  totalAmount: number;
  escrowStatus: EscrowStatus;
  inspectionCode: string;
  deliveryOtp: string;
  dispatchedTime?: string;
  deliveredTime?: string;
  notes?: string;
}

export interface ProduceListing {
  id: string;
  cropName: string;
  cropNameKn?: string;
  cropNameHi?: string;
  variety: string;
  category: CropCategory;
  farmerName: string;
  farmerPhone: string;
  location: string;
  district: string;
  state: string;
  quantityQuintals: number;
  minOrderQuintals: number;
  pricePerQuintal: number;
  qualityGrade: QualityGrade;
  organicCertified: boolean;
  certificationAgency?: string;
  harvestTimestamp: string;
  shelfLifeDays: number;
  moisturePercent: number;
  imageUrl: string;
  status: 'active' | 'in_bidding' | 'escrow_locked' | 'sold';
  bids: Bid[];
  activeEscrow?: EscrowDeal;
}

export interface ColdStorageFacility {
  id: string;
  name: string;
  facilityType: 'Solar Micro-Warehouse' | 'Refrigerated Cold Hub' | 'Controlled Atmosphere Chamber';
  location: string;
  district: string;
  distanceKm: number;
  totalCapacityMT: number;
  availableCapacityMT: number;
  pricePerCrateMonth: number;
  currentTempCelsius: number;
  targetTempCelsius: number;
  humidityRH: number;
  powerSource: '100% Rooftop Solar' | 'Solar + Micro-grid' | 'Diesel Backup';
  spoilageRisk: 'Low' | 'Moderate' | 'Alert Spoilage Spike';
  spoilageAlertDetails?: string;
  accreditedBy: string;
  phone: string;
  coordinates: { x: number; y: number }; // For visual diagrammatic map
}

export interface ReeferTruck {
  id: string;
  driverName: string;
  vehicleNumber: string;
  capacityQuintals: number;
  currentLocation: string;
  targetDestination: string;
  temperatureCelsius: number;
  status: 'Available' | 'En Route' | 'Loading';
  etaMinutes: number;
  ratePerKm: number;
  phone: string;
}

export interface RecommendedCrop {
  name: string;
  suitabilityScore: number;
  projectedYieldPerAcre: string;
  estimatedHarvestDurationDays: number;
  projectedMarketPricePerQuintal: number;
  estimatedInputCostPerAcre: number;
  expectedNetReturnPerAcre: number;
  waterRequirement: string;
  climateResilience: string;
  marketDemandIndex: number;
}

export interface CropForecastResult {
  topRecommendedCrops: RecommendedCrop[];
  microClimateNotes: string;
  soilNutrientAdvice: string;
}

export interface FinancialEntry {
  id: string;
  type: 'expense' | 'income';
  category: 'seeds' | 'fertilizer' | 'labor' | 'irrigation' | 'transport' | 'harvest_sale' | 'subsidy' | 'equipment';
  amount: number;
  description: string;
  date: string;
  season: 'Kharif 2026' | 'Rabi 2026' | 'Zaid 2026';
}

export interface LoanProduct {
  id: string;
  name: string;
  institution: string;
  category: 'Kisan Credit Card' | 'Warehouse Receipt' | 'Solar Subsidy' | 'AgTech Micro-Credit';
  maxAmount: number;
  interestRateAnnual: number;
  tenureMonths: number;
  subsidyPercent?: number;
  approvalSpeed: string;
  eligibilityStatus: 'Pre-Approved' | 'Eligible' | 'Conditional';
  features: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  audioUrl?: string;
  category?: 'remedy' | 'advisory' | 'market' | 'general';
}

export interface AgronomistChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  language: AppLanguage;
}

export interface DiseaseDiagnosisResult {
  cropAffected: string;
  pathogen: string;
  confidencePercent: number;
  severity: 'Mild' | 'Moderate' | 'Severe';
  symptoms: string;
  organicRemedy: string;
  chemicalRemedy: string;
  preventiveMeasures: string;
}

export interface PlantDiagnosis {
  diseaseName: string;
  confidenceScore: number;
  severityLevel: 'Low' | 'Moderate' | 'Severe';
  causativeAgent: string;
  symptomsIdentified: string[];
  organicRemedies: Array<{
    treatment: string;
    dosage: string;
    preparation: string;
    frequency: string;
  }>;
  preventiveMeasures: string[];
  economicImpactRisk: string;
}
