import { 
  ProduceListing, 
  ColdStorageFacility, 
  ReeferTruck, 
  FinancialEntry, 
  LoanProduct, 
  PlantDiagnosis 
} from '../types';

export const INITIAL_PRODUCE_LISTINGS: ProduceListing[] = [
  {
    id: 'prod-101',
    cropName: 'Finger Millet (Organic Ragi)',
    cropNameKn: 'ಸಾವಯವ ರಾಗಿ (GPU 28)',
    cropNameHi: 'जैविक रागी / मड़ुआ',
    variety: 'GPU 28 High-Calcium Native',
    category: 'grains',
    farmerName: 'Basavarajappa H.',
    farmerPhone: '+91 94812 34567',
    location: 'Pandavapura, Mandya',
    district: 'Mandya',
    state: 'Karnataka',
    quantityQuintals: 85,
    minOrderQuintals: 10,
    pricePerQuintal: 4250,
    qualityGrade: 'Grade A+ Organic',
    organicCertified: true,
    certificationAgency: 'Aditi Organic Cert (NPOP)',
    harvestTimestamp: 'Harvested 3 days ago',
    shelfLifeDays: 270,
    moisturePercent: 11.2,
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    status: 'in_bidding',
    bids: [
      {
        id: 'bid-1',
        buyerName: 'Bengaluru Organic Retail Collective',
        buyerType: 'Consumer Co-op',
        bidPricePerQuintal: 4350,
        quantityRequested: 40,
        timestamp: '15 mins ago',
        status: 'pending',
      },
      {
        id: 'bid-2',
        buyerName: 'NutriMillets Food Processing Ltd',
        buyerType: 'Bulk Processor',
        bidPricePerQuintal: 4200,
        quantityRequested: 85,
        timestamp: '1 hour ago',
        status: 'pending',
      },
    ],
  },
  {
    id: 'prod-102',
    cropName: 'Alphonso (Hapus) Mangoes',
    cropNameKn: 'ರತ್ನಗಿರಿ ಆಪೂಸ್ ಮಾವು',
    cropNameHi: 'अल्फांसो हापुस आम',
    variety: 'GI-Tagged Ratnagiri Clone',
    category: 'fruits',
    farmerName: 'Sunita Patil',
    farmerPhone: '+91 98230 45890',
    location: 'Dapoli, Ratnagiri',
    district: 'Ratnagiri',
    state: 'Maharashtra',
    quantityQuintals: 45,
    minOrderQuintals: 5,
    pricePerQuintal: 14500,
    qualityGrade: 'Grade A Export',
    organicCertified: true,
    certificationAgency: 'Vedic Organic Certification',
    harvestTimestamp: 'Plucked yesterday (Pre-cooled)',
    shelfLifeDays: 14,
    moisturePercent: 82.5,
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80',
    status: 'escrow_locked',
    bids: [
      {
        id: 'bid-3',
        buyerName: 'Deccan Fresh Agro Export Consortium',
        buyerType: 'Export House',
        bidPricePerQuintal: 15200,
        quantityRequested: 45,
        timestamp: '3 hours ago',
        status: 'accepted',
      },
    ],
    activeEscrow: {
      id: 'escrow-901',
      listingId: 'prod-102',
      cropName: 'Alphonso (Hapus) Mangoes (45 Quintals)',
      buyerName: 'Deccan Fresh Agro Export Consortium',
      farmerName: 'Sunita Patil',
      totalAmount: 684000,
      escrowStatus: 'QUALITY_VERIFIED',
      inspectionCode: 'QC-RATNA-8821',
      deliveryOtp: '7419',
      dispatchedTime: 'Scheduled for 14:00 today via Cold Reefer #KA-04-E-4019',
      notes: 'Brix sweetness tested at 19.2° Brix. Temperature controlled at 12.5°C.',
    },
  },
  {
    id: 'prod-103',
    cropName: 'Tellicherry Black Pepper',
    cropNameKn: 'ಕಪ್ಪು ಕಾಳುಮೆಣಸು (ಮಲೆನಾಡು)',
    cropNameHi: 'काली मिर्च (तेलीचेरी बोल्ड)',
    variety: 'Panniyur-1 Extra Bold Sun-Dried',
    category: 'spices',
    farmerName: 'Venkatesh Bhat',
    farmerPhone: '+91 94481 92831',
    location: 'Sirsi, Uttara Kannada',
    district: 'Uttara Kannada',
    state: 'Karnataka',
    quantityQuintals: 30,
    minOrderQuintals: 2,
    pricePerQuintal: 58000,
    qualityGrade: 'Grade A+ Organic',
    organicCertified: true,
    certificationAgency: 'Indocert Organic',
    harvestTimestamp: 'Sun-cured 5 days ago',
    shelfLifeDays: 540,
    moisturePercent: 9.8,
    imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=600&auto=format&fit=crop&q=80',
    status: 'active',
    bids: [],
  },
  {
    id: 'prod-104',
    cropName: 'Salem Native Turmeric',
    cropNameKn: 'ಸೇಲಂ ಅರಿಶಿನ (ಹೆಚ್ಚಿನ ಕರ್ಕ್ಯುಮಿನ್)',
    cropNameHi: 'सलेम हल्दी (उच्च करक्यूमिन)',
    variety: '5.2% High Curcumin Rhizomes',
    category: 'spices',
    farmerName: 'Muthuvelan R.',
    farmerPhone: '+91 97891 02938',
    location: 'Attur, Salem',
    district: 'Salem',
    state: 'Tamil Nadu',
    quantityQuintals: 60,
    minOrderQuintals: 10,
    pricePerQuintal: 12800,
    qualityGrade: 'Grade A Export',
    organicCertified: false,
    harvestTimestamp: 'Harvested 1 week ago',
    shelfLifeDays: 360,
    moisturePercent: 10.4,
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
    status: 'in_bidding',
    bids: [
      {
        id: 'bid-4',
        buyerName: 'Arogya Naturals FPO Hub',
        buyerType: 'FPO Aggregator',
        bidPricePerQuintal: 12500,
        quantityRequested: 30,
        timestamp: '2 hours ago',
        status: 'pending',
      },
    ],
  },
  {
    id: 'prod-105',
    cropName: 'Traditional Basmati Paddy',
    cropNameKn: 'ಸಾಂಪ್ರದಾಯಿಕ ಬಾಸುಮತಿ ಭತ್ತ',
    cropNameHi: 'पारंपरिक बासमती धान (1121)',
    variety: 'Pusa 1121 Aromatic Long-Grain',
    category: 'grains',
    farmerName: 'Harpreet Singh',
    farmerPhone: '+91 98140 19283',
    location: 'Karnal, Haryana',
    district: 'Karnal',
    state: 'Haryana',
    quantityQuintals: 120,
    minOrderQuintals: 25,
    pricePerQuintal: 4850,
    qualityGrade: 'Grade B Premium',
    organicCertified: false,
    harvestTimestamp: 'Cured in shade 4 days ago',
    shelfLifeDays: 300,
    moisturePercent: 12.0,
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    status: 'active',
    bids: [],
  },
  {
    id: 'prod-106',
    cropName: 'Guntur Sannam Red Chillies',
    cropNameKn: 'ಗುಂಟೂರು ಕೆಂಪು ಮೆಣಸಿನಕಾಯಿ',
    cropNameHi: 'गुंटूर सन्नम लाल मिर्च',
    variety: 'S334 Hot Crimson Deep Red',
    category: 'spices',
    farmerName: 'Koteswara Rao',
    farmerPhone: '+91 94901 88291',
    location: 'Tenali, Guntur',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    quantityQuintals: 50,
    minOrderQuintals: 10,
    pricePerQuintal: 21500,
    qualityGrade: 'Grade A+ Organic',
    organicCertified: true,
    certificationAgency: 'Lacon Organic Certification',
    harvestTimestamp: 'Naturally dried 2 days ago',
    shelfLifeDays: 365,
    moisturePercent: 8.5,
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80',
    status: 'active',
    bids: [],
  },
];

export const COLD_STORAGE_FACILITIES: ColdStorageFacility[] = [
  {
    id: 'cs-1',
    name: 'Kaveri Grameen Solar Micro-Warehouse',
    facilityType: 'Solar Micro-Warehouse',
    location: 'Srirangapatna Highway, Mandya',
    district: 'Mandya',
    distanceKm: 8.4,
    totalCapacityMT: 150,
    availableCapacityMT: 42,
    pricePerCrateMonth: 35,
    currentTempCelsius: 3.8,
    targetTempCelsius: 4.0,
    humidityRH: 86,
    powerSource: '100% Rooftop Solar',
    spoilageRisk: 'Low',
    accreditedBy: 'WDRA & NABARD Certified',
    phone: '+91 82322 49102',
    coordinates: { x: 28, y: 35 },
  },
  {
    id: 'cs-2',
    name: 'Sahyadri Horti-Chamber Hub',
    facilityType: 'Controlled Atmosphere Chamber',
    location: 'Channarayapatna Bypass, Hassan',
    district: 'Hassan',
    distanceKm: 24.2,
    totalCapacityMT: 400,
    availableCapacityMT: 110,
    pricePerCrateMonth: 45,
    currentTempCelsius: 11.2,
    targetTempCelsius: 11.0,
    humidityRH: 91,
    powerSource: 'Solar + Micro-grid',
    spoilageRisk: 'Low',
    accreditedBy: 'APEDA Cold Chain Standard',
    phone: '+91 81762 55901',
    coordinates: { x: 55, y: 48 },
  },
  {
    id: 'cs-3',
    name: 'Deccan Agro Fresh Terminal',
    facilityType: 'Refrigerated Cold Hub',
    location: 'APMC Yard, Doddaballapura',
    district: 'Bangalore Rural',
    distanceKm: 38.0,
    totalCapacityMT: 600,
    availableCapacityMT: 18,
    pricePerCrateMonth: 40,
    currentTempCelsius: 8.9,
    targetTempCelsius: 5.0,
    humidityRH: 89,
    powerSource: 'Diesel Backup',
    spoilageRisk: 'Alert Spoilage Spike',
    spoilageAlertDetails: 'Compressor Chamber #2 thermal sensor reading +3.9°C drift above safe threshold. Automated backup chiller engaged.',
    accreditedBy: 'National Horticulture Board (NHB)',
    phone: '+91 80276 33100',
    coordinates: { x: 74, y: 22 },
  },
  {
    id: 'cs-4',
    name: 'Malnad Organic Seed & Produce Vault',
    facilityType: 'Solar Micro-Warehouse',
    location: 'Holehonnur Road, Shivamogga',
    district: 'Shivamogga',
    distanceKm: 52.5,
    totalCapacityMT: 120,
    availableCapacityMT: 58,
    pricePerCrateMonth: 30,
    currentTempCelsius: 14.5,
    targetTempCelsius: 15.0,
    humidityRH: 62,
    powerSource: '100% Rooftop Solar',
    spoilageRisk: 'Low',
    accreditedBy: 'Karnataka State Warehousing Corp',
    phone: '+91 81822 74812',
    coordinates: { x: 42, y: 72 },
  },
];

export const REEFER_TRUCKS: ReeferTruck[] = [
  {
    id: 'truck-1',
    driverName: 'Manjunath Gowda',
    vehicleNumber: 'KA-04-E-4019',
    capacityQuintals: 60,
    currentLocation: 'Mandya Sugar Town',
    targetDestination: 'Yeshwanthpur Wholesale Mandi',
    temperatureCelsius: 12.2,
    status: 'Available',
    etaMinutes: 25,
    ratePerKm: 34,
    phone: '+91 97412 88419',
  },
  {
    id: 'truck-2',
    driverName: 'Ravi Kumar Naik',
    vehicleNumber: 'KA-13-B-8910',
    capacityQuintals: 90,
    currentLocation: 'Hassan Bypass NH-75',
    targetDestination: 'APEDA Sea Terminal Mangaluru',
    temperatureCelsius: 4.1,
    status: 'En Route',
    etaMinutes: 65,
    ratePerKm: 38,
    phone: '+91 98450 71023',
  },
  {
    id: 'truck-3',
    driverName: 'Mohd. Shabbir',
    vehicleNumber: 'MH-09-CV-2201',
    capacityQuintals: 120,
    currentLocation: 'Kolhapur Agro Cold Yard',
    targetDestination: 'Belagavi Organic FPO Center',
    temperatureCelsius: 7.5,
    status: 'Loading',
    etaMinutes: 45,
    ratePerKm: 42,
    phone: '+91 93255 19280',
  },
];

export const INITIAL_LEDGER_ENTRIES: FinancialEntry[] = [
  {
    id: 'led-1',
    type: 'income',
    category: 'harvest_sale',
    amount: 182750,
    description: 'Advance received for 43 Quintals Ragi via Annadata Escrow #ESC-819',
    date: '2026-09-02',
    season: 'Kharif 2026',
  },
  {
    id: 'led-2',
    type: 'expense',
    category: 'seeds',
    amount: 8400,
    description: 'Certified Finger Millet Breeder Seeds (GPU 28) - 30kg from UAS Bangalore',
    date: '2026-06-12',
    season: 'Kharif 2026',
  },
  {
    id: 'led-3',
    type: 'expense',
    category: 'fertilizer',
    amount: 14200,
    description: 'Enriched Vermicompost (4 MT) + Trichoderma viride culture pack',
    date: '2026-06-25',
    season: 'Kharif 2026',
  },
  {
    id: 'led-4',
    type: 'expense',
    category: 'irrigation',
    amount: 3500,
    description: 'Solar Drip Irrigation maintenance and filter replacement',
    date: '2026-07-15',
    season: 'Kharif 2026',
  },
  {
    id: 'led-5',
    type: 'expense',
    category: 'labor',
    amount: 22000,
    description: 'Weeding, earthing-up, and manual harvesting crew (8 workers x 5 days)',
    date: '2026-08-28',
    season: 'Kharif 2026',
  },
  {
    id: 'led-6',
    type: 'income',
    category: 'subsidy',
    amount: 15000,
    description: 'PM-Kisan Samman Nidhi & Micro-Irrigation subsidy direct DBT credit',
    date: '2026-08-10',
    season: 'Kharif 2026',
  },
  {
    id: 'led-7',
    type: 'expense',
    category: 'transport',
    amount: 4800,
    description: 'Annadata Reefer Truck freight to Srirangapatna Solar Cold Hub',
    date: '2026-09-03',
    season: 'Kharif 2026',
  },
];

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: 'loan-kcc',
    name: 'Kisan Credit Card (KCC) Crop Working Capital',
    institution: 'State Bank of India (Agri-Division)',
    category: 'Kisan Credit Card',
    maxAmount: 300000,
    interestRateAnnual: 4.0, // Subsidized rate with prompt repayment
    tenureMonths: 12,
    subsidyPercent: 3.0,
    approvalSpeed: 'Instant pre-approval via Aadhaar & Land Record (Bhoomi)',
    eligibilityStatus: 'Pre-Approved',
    features: [
      '3% prompt repayment interest subvention (effective 4% p.a.)',
      'No collateral needed for loans up to ₹1.60 Lakhs',
      'Direct card access for seed, bio-fertilizer and diesel purchases',
    ],
  },
  {
    id: 'loan-eNWR',
    name: 'NABARD Electronic Warehouse Receipt (e-NWR) Pledge Loan',
    institution: 'Canara Bank & WDRA Registered Hubs',
    category: 'Warehouse Receipt',
    maxAmount: 850000,
    interestRateAnnual: 7.2,
    tenureMonths: 9,
    approvalSpeed: 'Within 2 hours of cold storage deposit verification',
    eligibilityStatus: 'Eligible',
    features: [
      'Borrow up to 75% of market value of produce stored in verified cold hubs',
      'Prevents distress selling during harvest glut',
      'Repay automatically when buyer purchases via Annadata Escrow',
    ],
  },
  {
    id: 'loan-kusum',
    name: 'PM-KUSUM Solar Irrigation Pump Credit Scheme',
    institution: 'Karnataka Vikas Grameena Bank',
    category: 'Solar Subsidy',
    maxAmount: 240000,
    interestRateAnnual: 6.5,
    tenureMonths: 36,
    subsidyPercent: 60.0,
    approvalSpeed: '3-5 Working Days',
    eligibilityStatus: 'Eligible',
    features: [
      '60% total capital subsidy from Central + State Government',
      'Farmer contributes only 10% upfront margin',
      'Zero diesel cost, 25-year solar PV panel warranty',
    ],
  },
  {
    id: 'loan-fpo',
    name: 'AgTech Micro-Credit for Precision Organic Farming',
    institution: 'Samunnati Agri Financial Services',
    category: 'AgTech Micro-Credit',
    maxAmount: 150000,
    interestRateAnnual: 8.5,
    tenureMonths: 18,
    approvalSpeed: 'Paperless 15-minute digital disbursement',
    eligibilityStatus: 'Pre-Approved',
    features: [
      'Underwritten using Annadata AI digital ledger & escrow transaction history',
      'Flexible seasonal balloon repayment matching harvest cycles',
      'Free crop weather micro-insurance bundled with every sanction',
    ],
  },
];

export interface DiseaseSample {
  id: string;
  cropName: string;
  cropNameKn: string;
  cropNameHi: string;
  diseaseTitle: string;
  sampleThumbnail: string;
  symptomsSummary: string;
  diagnostic: PlantDiagnosis;
}

export const BLIGHT_LEAF_SAMPLES: DiseaseSample[] = [
  {
    id: 'sample-tomato-blight',
    cropName: 'Tomato',
    cropNameKn: 'ಟೊಮ್ಯಾಟೊ (Tomato)',
    cropNameHi: 'टमाटर (Tomato)',
    diseaseTitle: 'Early Blight (Alternaria solani)',
    sampleThumbnail: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?w=300&auto=format&fit=crop&q=80',
    symptomsSummary: 'Target-board concentric rings on mature leaves, yellow chlorotic halo, stem cankers.',
    diagnostic: {
      diseaseName: 'Tomato Early Blight (Alternaria solani)',
      confidenceScore: 96,
      severityLevel: 'Moderate',
      causativeAgent: 'Fungal Pathogen (Alternaria)',
      symptomsIdentified: [
        'Concentric circular target-board spots with dark brown margins',
        'Chlorotic yellowing around older lower foliage',
        'Leaf defoliation starting from base towards upper canopy'
      ],
      organicRemedies: [
        {
          treatment: 'Neem Seed Kernel Extract (NSKE 5%) + Native Cow Urine',
          dosage: '50ml extract + 100ml cow urine per 10L water',
          preparation: 'Pound fresh neem seeds, steep 24 hours, strain through muslin cloth, add cow urine and organic soapnut extract as wetting sticker.',
          frequency: 'Spray at 7-day intervals on clear sunny mornings (underside of leaves).'
        },
        {
          treatment: 'Trichoderma viride 1.15% WP (Bio-control)',
          dosage: '20g per 10L water',
          preparation: 'Activate in jaggery water for 2 hours before field spraying.',
          frequency: 'Apply once every 14 days to colonize leaf phylloplane.'
        }
      ],
      preventiveMeasures: [
        'Stake tomato vines to prevent foliage touching damp soil',
        'Mulch planting beds with dried paddy straw (7cm thick)',
        'Rotate crops with non-solanaceous crops (Millets, Red Gram) for 2 seasons'
      ],
      economicImpactRisk: 'Untreated early blight can reduce fruit yield by 30-45% and cause sunscald on unprotected developing tomatoes.'
    }
  },
  {
    id: 'sample-paddy-blast',
    cropName: 'Paddy / Rice',
    cropNameKn: 'ಭತ್ತ (Rice/Paddy)',
    cropNameHi: 'धान (Paddy/Rice)',
    diseaseTitle: 'Rice Blast (Magnaporthe oryzae)',
    sampleThumbnail: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=300&auto=format&fit=crop&q=80',
    symptomsSummary: 'Spindle-shaped diamond lesions with ash-grey centers and brownish borders on leaf blades.',
    diagnostic: {
      diseaseName: 'Paddy Leaf Blast (Magnaporthe oryzae)',
      confidenceScore: 94,
      severityLevel: 'Severe',
      causativeAgent: 'Fungal Spores (Ascomycete)',
      symptomsIdentified: [
        'Elliptical spindle-shaped spots with pointed ends',
        'Greyish-white necrosis in center of lesion',
        'Lesions coalesce causing scorched leaf-burning appearance'
      ],
      organicRemedies: [
        {
          treatment: 'Panchagavya Organic Bio-Stimulant & Antifungal Spray',
          dosage: '300ml Panchagavya per 10L knapsack sprayer',
          preparation: 'Fermented blend of cow dung, urine, milk, curd, ghee, sugarcane juice, and tender coconut water.',
          frequency: 'Spray at tillering and panicle initiation stages.'
        },
        {
          treatment: 'Pseudomonas fluorescens 0.5% WP',
          dosage: '10g per liter of water',
          preparation: 'Mix thoroughly and spray during late afternoon.',
          frequency: 'Apply immediately upon spotting the first spindle lesion.'
        }
      ],
      preventiveMeasures: [
        'Avoid excessive synthetic nitrogenous fertilizer application',
        'Maintain uniform 2-3cm water layer in paddy basins',
        'Treat nursery seeds with bio-priming agents before transplantation'
      ],
      economicImpactRisk: 'Blast can cause neck rot leading to total grain chaffiness with up to 60% harvest loss.'
    }
  },
  {
    id: 'sample-cotton-curl',
    cropName: 'Cotton',
    cropNameKn: 'ಹತ್ತಿ (Cotton)',
    cropNameHi: 'कपास (Cotton)',
    diseaseTitle: 'Cotton Leaf Curl Virus (CLCuV)',
    sampleThumbnail: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=300&auto=format&fit=crop&q=80',
    symptomsSummary: 'Upward cupping of leaves, vein thickening, enation (leaf-like outgrowths) on underside.',
    diagnostic: {
      diseaseName: 'Cotton Leaf Curl Begomovirus (CLCuV)',
      confidenceScore: 93,
      severityLevel: 'Severe',
      causativeAgent: 'Viral (Transmitted by Whitefly vector - Bemisia tabaci)',
      symptomsIdentified: [
        'Upward curling and crinkling of terminal leaves',
        'Vein swelling and enation on lower leaf surface',
        'Stunted internodal growth and flower boll dropping'
      ],
      organicRemedies: [
        {
          treatment: 'Dashparni Ark (Ten-Leaf Fermented Herbal Insecticide)',
          dosage: '250ml per 15L water knapsack sprayer',
          preparation: 'Fermented concoction of Neem, Pongamia, Custard apple, Papaya, Castor, Datura, Calotropis, Vitex, Nerium, and Lantana leaves with cow urine.',
          frequency: 'Spray every 5 days to decimate whitefly vector colonies.'
        },
        {
          treatment: 'Castor Oil Yellow Sticky Traps',
          dosage: '25 sheets per acre placed at canopy height',
          preparation: 'Coat yellow corrugated plastic sheets with non-drying castor oil.',
          frequency: 'Inspect twice weekly and scrape clean when saturated.'
        }
      ],
      preventiveMeasures: [
        'Eradicate alternative weed hosts (Abutilon indicum) along farm bunds',
        'Plant 3 rows of Maize or Pearl Millet as a barrier border crop',
        'Select certified resistant varieties like Bt-F1 hybrid checks'
      ],
      economicImpactRisk: 'Can decimate boll formation by 50% if vector is not curbed during vegetative stage.'
    }
  },
  {
    id: 'sample-mango-anthracnose',
    cropName: 'Mango',
    cropNameKn: 'ಮಾವು (Mango)',
    cropNameHi: 'आम (Mango)',
    diseaseTitle: 'Anthracnose (Colletotrichum gloeosporioides)',
    sampleThumbnail: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=300&auto=format&fit=crop&q=80',
    symptomsSummary: 'Irregular dark-brown to black spots on tender foliage, blossom blight, and sunken black fruit spots.',
    diagnostic: {
      diseaseName: 'Mango Anthracnose (Colletotrichum gloeosporioides)',
      confidenceScore: 95,
      severityLevel: 'Moderate',
      causativeAgent: 'Fungal Pathogen (Colletotrichum)',
      symptomsIdentified: [
        'Small dark blister-like lesions coalescing into large necrotic patches',
        'Shot-hole appearance as dried leaf centers drop out',
        'Premature blossom drop during panicle flowering'
      ],
      organicRemedies: [
        {
          treatment: 'Bio-Sulfur Lime Broth (Bordeaux Mixture Organic Equivalent)',
          dosage: '1% solution (10g Copper Sulfate + 10g Quicklime in 1L water)',
          preparation: 'Slake lime in water, dissolve copper sulfate in separate earthen pot, pour copper into lime while stirring.',
          frequency: 'Pre-monsoon and post-monsoon preventive drenching.'
        },
        {
          treatment: 'Ampelomyces quisqualis Bio-fungicide',
          dosage: '5ml per liter of water',
          preparation: 'Add organic liquid soap (0.5ml) as surfactant.',
          frequency: 'Spray at fruit pea-stage to prevent dormant latent infection.'
        }
      ],
      preventiveMeasures: [
        'Prune dead and criss-crossing branches to allow 360° sunlight penetration',
        'Collect and burn fallen diseased leaves and mummified fruits',
        'Hot-water dip harvested mangoes at 52°C for 5 minutes prior to cold storage'
      ],
      economicImpactRisk: 'Spoils post-harvest export fruit value by up to 60% if latent infections rot during refrigerated transit.'
    }
  },
];

export const INITIAL_COLD_STORAGE = COLD_STORAGE_FACILITIES;
export const INITIAL_REEFER_TRUCKS = REEFER_TRUCKS;
export const INITIAL_FINANCIAL_ENTRIES = INITIAL_LEDGER_ENTRIES;
export const INITIAL_LOAN_PRODUCTS = LOAN_PRODUCTS;
export const INITIAL_ESCROW_DEALS = [
  INITIAL_PRODUCE_LISTINGS[1].activeEscrow!,
];

export const SAMPLE_DISEASE_IMAGES = BLIGHT_LEAF_SAMPLES.map((sample) => ({
  name: `${sample.cropName} - ${sample.diseaseTitle.split('(')[0].trim()}`,
  imageUrl: sample.sampleThumbnail,
  diagnostic: sample.diagnostic,
}));
