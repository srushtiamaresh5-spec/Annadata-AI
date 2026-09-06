import { AppLanguage } from '../types';

export const TRANSLATIONS: Record<AppLanguage, Record<string, string>> = {
  en: {
    appTitle: 'Annadata AI',
    appSubtitle: 'Rural Economic Operating System',
    roleFarmer: 'Farmer (Kisan)',
    roleBuyer: 'Agri Buyer / Co-op',
    roleFpo: 'FPO Manager',
    navDashboard: 'Dashboard Overview',
    navMarket: 'Harvest Spot Market',
    navColdStorage: 'Cold Storage & Fleet',
    navAdvisory: 'Smart Crop Advisory',
    navLedger: 'Rural Financial Ledger',
    navAgronomist: 'AI Agronomist & Pathology',
    
    // Quick Metrics
    metricActiveListings: 'Active Harvest Listings',
    metricEscrowLocked: 'Escrow Value Locked',
    metricColdCapacity: 'Verified Cold Storage',
    metricCreditScore: 'Farmer Credit Index',

    // Market
    listProduceBtn: '+ List Harvest Produce',
    searchProduce: 'Search crops, grains, fruits, spices, location...',
    filterAll: 'All Crops',
    filterGrains: 'Grains & Millets',
    filterFruits: 'Fruits & Horticultural',
    filterSpices: 'Spices & Cash Crops',
    shelfLifeDays: 'Shelf Life',
    moisture: 'Moisture',
    grade: 'Grade',
    certifiedOrganic: 'Certified Organic',
    placeBidBtn: 'Place Direct Bid',
    activeBids: 'Active Bids',
    escrowTracking: 'Digital Escrow Status',
    
    // Cold Storage
    availableCapacity: 'Available Space',
    temperature: 'Temperature',
    humidity: 'Humidity',
    reserveSpace: 'Reserve Storage Slot',
    bookTruck: 'Dispatch Reefer Truck',
    telemetryLive: 'Live IoT Telemetry',
    spoilageAlert: 'Automated Spoilage Warning',

    // Advisory
    soilType: 'Soil Type',
    waterSource: 'Water Availability',
    acreage: 'Farm Acreage',
    season: 'Sowing Season',
    generateAdvisory: 'Generate AI Yield Forecast',
    projectedYield: 'Projected Yield',
    marketDemand: 'Market Demand Index',
    netProfit: 'Estimated Net Return',

    // Ledger & Credit
    addTransaction: '+ Log Farm Entry',
    totalIncome: 'Total Harvest Revenue',
    totalExpenses: 'Total Input Costs',
    netFarmProfit: 'Net Farm Income',
    creditScoreLabel: 'Annadata Credit Score',
    applyLoan: 'Apply Institutional Financing',

    // Agronomist
    agronomistGreeting: 'Namaste! I am your Annadata AI Agronomist. Ask me anything about crop diseases, organic fertilizers, soil rejuvenation, or mandi pricing.',
    askQuestionPlaceholder: 'Type or click microphone to speak (English, Kannada, Hindi)...',
    leafScannerTitle: 'Plant Disease & Foliar Pathology Scanner',
    scannerPrompt: 'Upload crop photo or pick sample infected leaf:',
    organicRemedy: 'Recommended Organic Prescription',
    preventiveTips: 'Preventive Measures',
    speakAdvice: 'Listen in Voice',
  },
  kn: {
    appTitle: 'ಅನ್ನದಾತ AI',
    appSubtitle: 'ಗ್ರಾಮೀಣ ಆರ್ಥಿಕ ಕಾರ್ಯವ್ಯವಸ್ಥೆ',
    roleFarmer: 'ರೈತ (ಅನ್ನದಾತ)',
    roleBuyer: 'ಕೃಷಿ ವ್ಯಾಪಾರಿ / ಗ್ರಾಹಕ ಒಕ್ಕೂಟ',
    roleFpo: 'ಎಫ್‌ಪಿಒ (FPO) ವ್ಯವಸ್ಥಾಪಕ',
    navDashboard: 'ಮುಖಪುಟ ವಿವರ',
    navMarket: 'ಲೈವ್ ಬೆಳೆ ಮಾರುಕಟ್ಟೆ',
    navColdStorage: 'ಶೀತಲ ಗೋದಾಮು ಮತ್ತು ಸಾರಿಗೆ',
    navAdvisory: 'ಸ್ಮಾರ್ಟ್ ಬೆಳೆ ಸಲಹಾ ಕೋಶ',
    navLedger: 'ಗ್ರಾಮೀಣ ಆರ್ಥಿಕ ಲೆಕ್ಕಪತ್ರ',
    navAgronomist: 'ಕೃಷಿ ತಜ್ಞ AI & ಸಸ್ಯ ರೋಗ ಸ್ಕ್ಯಾನರ್',

    // Quick Metrics
    metricActiveListings: 'ಮಾರಾಟಕ್ಕಿರುವ ಬೆಳೆಗಳು',
    metricEscrowLocked: 'ಸುರಕ್ಷಿತ ಎಸ್ಕ್ರೋ ಮೊತ್ತ',
    metricColdCapacity: 'ಲಭ್ಯವಿರುವ ಶೀತಲ ಸಂಗ್ರಹಣೆ',
    metricCreditScore: 'ರೈತರ ಡಿಜಿಟಲ್ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್',

    // Market
    listProduceBtn: '+ ಬೆಳೆ ಮಾರಾಟಕ್ಕೆ ಸೇರಿಸಿ',
    searchProduce: 'ಧಾನ್ಯ, ಹಣ್ಣು, ಸಾಂಬಾರ ಪದಾರ್ಥ ಹುಡುಕಿ...',
    filterAll: 'ಎಲ್ಲ ಬೆಳೆಗಳು',
    filterGrains: 'ಸಿರಿಧಾನ್ಯ ಮತ್ತು ಕಾಳುಗಳು',
    filterFruits: 'ಹಣ್ಣು ಮತ್ತು ತೋಟಗಾರಿಕೆ',
    filterSpices: 'ಮಸಾಲೆ & ವಾಣಿಜ್ಯ ಬೆಳೆ',
    shelfLifeDays: 'ಬಾಳಿಕೆ ದಿನಗಳು',
    moisture: 'ತೇವಾಂಶ',
    grade: 'ಗುಣಮಟ್ಟ ಶ್ರೇಣಿ',
    certifiedOrganic: 'ಪ್ರಮಾಣೀಕೃತ ಸಾವಯವ',
    placeBidBtn: 'ನೇರ ಬಿಡ್ ಸಲ್ಲಿಸಿ',
    activeBids: 'ಲೈವ್ ಬಿಡ್‌ಗಳು',
    escrowTracking: 'ಡಿಜಿಟಲ್ ಎಸ್ಕ್ರೋ ಸ್ಥಿತಿ',

    // Cold Storage
    availableCapacity: 'ಲಭ್ಯವಿರುವ ಸ್ಥಳ',
    temperature: 'ತಾಪಮಾನ',
    humidity: 'ತೇವಾಂಶ (RH)',
    reserveSpace: 'ಗೋದಾಮಿನಲ್ಲಿ ಸ್ಥಳ ಕಾಯ್ದಿರಿಸಿ',
    bookTruck: 'ಶೀತಲ ವಾಹನ (ರೀಫರ್) ಬುಕ್ ಮಾಡಿ',
    telemetryLive: 'ಲೈವ್ IoT ಸೆನ್ಸಾರ್ ಮಾಹಿತಿ',
    spoilageAlert: 'ಹಾಳಾಗುವ ಅಪಾಯದ ಎಚ್ಚರಿಕೆ',

    // Advisory
    soilType: 'ಮಣ್ಣಿನ ವಿಧ',
    waterSource: 'ನೀರಿನ ಲಭ್ಯತೆ',
    acreage: 'ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ (ಎಕರೆ)',
    season: 'ಬಿತ್ತನೆ ಹಂಗಾಮು',
    generateAdvisory: 'AI ಇಳುವರಿ ಅಂದಾಜು ಪಡೆಯಿರಿ',
    projectedYield: 'ನಿರೀಕ್ಷಿತ ಇಳುವರಿ',
    marketDemand: 'ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆ ಸೂಚ್ಯಂಕ',
    netProfit: 'ನಿವ್ವಳ ಲಾಭದ ಅಂದಾಜು',

    // Ledger & Credit
    addTransaction: '+ ಆದಾಯ/ವೆಚ್ಚ ನಮೂದಿಸಿ',
    totalIncome: 'ಒಟ್ಟು ಬೆಳೆ ಆದಾಯ',
    totalExpenses: 'ಒಟ್ಟು ಕೃಷಿ ವೆಚ್ಚ',
    netFarmProfit: 'ನಿವ್ವಳ ಕೃಷಿ ಲಾಭ',
    creditScoreLabel: 'ಅನ್ನದಾತ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್',
    applyLoan: 'ಕಡಿಮೆ ಬಡ್ಡಿದರದ ಸಾಲಕ್ಕೆ ಅರ್ಜಿ',

    // Agronomist
    agronomistGreeting: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಅನ್ನದಾತ AI ಕೃಷಿ ಮಿತ್ರ. ಬೆಳೆ ರೋಗ, ಸಾವಯವ ಕಷಾಯ, ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಅಥವಾ ಮಾರುಕಟ್ಟೆ ದರಗಳ ಬಗ್ಗೆ ಕೇಳಿ.',
    askQuestionPlaceholder: 'ಪ್ರಶ್ನೆ ಬರೆಯಿರಿ ಅಥವಾ ಮೈಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ ಮಾತನಾಡಿ...',
    leafScannerTitle: 'ಸಸ್ಯ ರೋಗ ಮತ್ತು ಎಲೆ ಪರೀಕ್ಷಕ',
    scannerPrompt: 'ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ರೋಗಗ್ರಸ್ತ ಎಲೆಯ ಮಾದರಿ ಆರಿಸಿ:',
    organicRemedy: 'ಸಾವಯವ ಔಷಧ ಮತ್ತು ಪ್ರಮಾಣ',
    preventiveTips: 'ಮುನ್ನೆಚ್ಚರಿಕಾ ಕ್ರಮಗಳು',
    speakAdvice: 'ಧ್ವನಿಯಲ್ಲಿ ಆಲಿಸಿ',
  },
  hi: {
    appTitle: 'अन्नदाता AI',
    appSubtitle: 'ग्रामीण आर्थिक ऑपरेटिंग सिस्टम',
    roleFarmer: 'किसान भाई (Kisan)',
    roleBuyer: 'कृषि व्यापारी / सहकारिता',
    roleFpo: 'एफपीओ (FPO) प्रबंधक',
    navDashboard: 'डैशबोर्ड अवलोकन',
    navMarket: 'लाइव हाजिर मंडी',
    navColdStorage: 'शीतगृह (कोल्ड स्टोरेज) व लॉजिस्टिक्स',
    navAdvisory: 'स्मार्ट फसल सलाहकार एवं उपज अनुमान',
    navLedger: 'ग्रामीण वित्तीय बहीखाता एवं साख',
    navAgronomist: 'AI कृषि वैज्ञानिक एवं पौध रोग जांच',

    // Quick Metrics
    metricActiveListings: 'मंडी में उपलब्ध फसलें',
    metricEscrowLocked: 'सुरक्षित एस्क्रो राशि',
    metricColdCapacity: 'सत्यापित कोल्ड स्टोरेज क्षमता',
    metricCreditScore: 'किसान डिजिटल क्रेडिट स्कोर',

    // Market
    listProduceBtn: '+ नई फसल सूचीबद्ध करें',
    searchProduce: 'फसल, अनाज, फल, मसाले, स्थान खोजें...',
    filterAll: 'सभी फसलें',
    filterGrains: 'अनाज एवं मोटे अनाज (श्री अन्न)',
    filterFruits: 'फल एवं बागवानी',
    filterSpices: 'मसाले व नकदी फसलें',
    shelfLifeDays: 'शेल्फ लाइफ',
    moisture: 'नमी प्रतिशत',
    grade: 'गुणवत्ता ग्रेड',
    certifiedOrganic: 'प्रमाणित जैविक',
    placeBidBtn: 'सीधी बोली (Bid) लगाएं',
    activeBids: 'सक्रिय बोलियां',
    escrowTracking: 'डिजिटल एस्क्रो स्थिति',

    // Cold Storage
    availableCapacity: 'उपलब्ध भंडारण',
    temperature: 'तापमान',
    humidity: 'आर्द्रता (RH)',
    reserveSpace: 'कोल्ड स्टोरेज स्लॉट बुक करें',
    bookTruck: 'रीफर वाहन मंगवाएं',
    telemetryLive: 'लाइव IoT सेंसर डेटा',
    spoilageAlert: 'खराबी चेतावनी सूचक',

    // Advisory
    soilType: 'मिट्टी का प्रकार',
    waterSource: 'जल उपलब्धता',
    acreage: 'खेत का रकबा (एकड़)',
    season: 'बुवाई का मौसम',
    generateAdvisory: 'AI उपज व लाभ पूर्वानुमान',
    projectedYield: 'अनुमानित उपज',
    marketDemand: 'बाजार मांग सूचकांक',
    netProfit: 'अनुमानित शुद्ध लाभ',

    // Ledger & Credit
    addTransaction: '+ आय/व्यय प्रविष्टि करें',
    totalIncome: 'कुल फसल बिक्री आय',
    totalExpenses: 'कुल कृषि लागत',
    netFarmProfit: 'शुद्ध कृषि आमदनी',
    creditScoreLabel: 'अन्नदाता साख स्कोर',
    applyLoan: 'संस्थागत ऋण हेतु आवेदन',

    // Agronomist
    agronomistGreeting: 'नमस्ते किसान भाई! मैं आपका अन्नदाता AI कृषि वैज्ञानिक हूँ। कीट, रोग, जैविक खाद, या मंडी भाव के बारे में पूछें।',
    askQuestionPlaceholder: 'सवाल लिखें या माइक दबाकर हिंदी में बोलें...',
    leafScannerTitle: 'पौध रोग एवं पत्ती स्वास्थ्य स्कैनर',
    scannerPrompt: 'पत्ती की तस्वीर अपलोड करें या नमूना चुनें:',
    organicRemedy: 'अनुशंसित जैविक उपचार विधि',
    preventiveTips: 'सुरक्षात्मक उपाय',
    speakAdvice: 'आवाज में सुनें',
  },
};
