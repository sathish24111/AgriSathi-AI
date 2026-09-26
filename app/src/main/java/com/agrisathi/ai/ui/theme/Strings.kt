package com.agrisathi.ai.ui.theme

object AppStrings {
    fun get(lang: String): Dictionary {
        return when (lang) {
            "en" -> EnglishDictionary
            "hi" -> HindiDictionary
            "ta" -> TamilDictionary
            else -> MarathiDictionary
        }
    }
}

interface Dictionary {
    val appTitle: String
    val appTagline: String
    val selectLanguageTitle: String
    val selectLanguageSubtitle: String
    val continueBtn: String
    val loginTitle: String
    val loginSubtitle: String
    val mobileNumberLabel: String
    val sendOtpBtn: String
    val enterOtpLabel: String
    val verifyBtn: String
    val skipLoginBtn: String
    val locationTitle: String
    val locationSubtitle: String
    val autoDetectBtn: String
    val manualDistrictLabel: String
    val proceedHomeBtn: String
    val primaryServicesTitle: String
    val scanCropTitle: String
    val scanCropSubtitle: String
    val cropPlannerTitle: String
    val cropPlannerSubtitle: String
    val marketPricesTitle: String
    val scanHistoryTitle: String
    val apmcRatesTitle: String
    val viewAll: String
    val recentScansTitle: String
    val scanFrameInstruction: String
    val cameraPermissionTitle: String
    val cameraPermissionSubtitle: String
    val grantAccessBtn: String
    val cropDiagnosisTitle: String
    val aiConfidenceLabel: String
    val severityLabel: String
    val voiceAdvisoryTitle: String
    val voiceAdvisorySubtitle: String
    val listenBtn: String
    val stopBtn: String
    val keySymptomsTitle: String
    val managementTitle: String
    val organicPracticesTitle: String
    val scanAnotherBtn: String
    val plannerHeaderTitle: String
    val selectCropFormTitle: String
    val farmLandLabel: String
    val sowingDateLabel: String
    val calculatePlanBtn: String
    val financialEstimatesTitle: String
    val estimatedCostLabel: String
    val expectedYieldLabel: String
    val expectedRevenueLabel: String
    val netProfitLabel: String
    val financialDisclaimer: String
    val riskWindowsTitle: String
    val cultivationStagesTitle: String
    val apmcHeaderTitle: String
    val searchMandiPlaceholder: String
    val minMaxLabel: String
    val modalPriceLabel: String
    val historyHeaderTitle: String
    val noScansTitle: String
    val noScansSubtitle: String
    val alertsHeaderTitle: String
    val profileHeaderTitle: String
    val appSettingsTitle: String
    val languageLabel: String
    val locationLabel: String
    val voiceTtsLabel: String
    val notificationsLabel: String
    val privacyLabel: String

    val navHome: String
    val navScan: String
    val navPlanner: String
    val navMarket: String
    val navProfile: String

    val riskLow: String
    val riskModerate: String
    val riskHigh: String
    val riskSevere: String

    val yieldUnitLabel: String
    val stage1Title: String
    val stage2Title: String
    val stage3Title: String
    val stage4Title: String

    val diseaseLabel: String
    val analyzingCrop: String
    val pleaseWait: String
    val speakingAdvisory: String
    val detectingGps: String
    val otpDemoHint: String
    val quintalsUnit: String
    val trendUp: String
    val trendDown: String
    val trendStable: String
}

object EnglishDictionary : Dictionary {
    override val appTitle = "AgriSathi AI"
    override val appTagline = "Smart AI Assistance for Farmers"
    override val selectLanguageTitle = "Select Your Language"
    override val selectLanguageSubtitle = "All information and voice guidance will be provided in your language."
    override val continueBtn = "Continue"
    override val loginTitle = "Farmer Login / Registration"
    override val loginSubtitle = "Enter your mobile number to verify with OTP."
    override val mobileNumberLabel = "Mobile Number"
    override val sendOtpBtn = "Send OTP"
    override val enterOtpLabel = "Enter 4-Digit OTP"
    override val verifyBtn = "Verify & Login"
    override val skipLoginBtn = "Explore without Login"
    override val locationTitle = "Select Your Location"
    override val locationSubtitle = "Location access is required to show weather, crop risks, and nearby APMC market rates."
    override val autoDetectBtn = "Auto-Detect Location (GPS)"
    override val manualDistrictLabel = "Or select your district manually:"
    override val proceedHomeBtn = "Proceed to Home"
    override val primaryServicesTitle = "Primary Services"
    override val scanCropTitle = "Scan Crop"
    override val scanCropSubtitle = "Scan Crop Disease"
    override val cropPlannerTitle = "Crop Planner"
    override val cropPlannerSubtitle = "Plan & Profit Estimator"
    override val marketPricesTitle = "Market Prices"
    override val scanHistoryTitle = "Scan History"
    override val apmcRatesTitle = "APMC Market Rates"
    override val viewAll = "View All >"
    override val recentScansTitle = "Recent Crop Scans"
    override val scanFrameInstruction = "Align infected leaf or fruit inside the box"
    override val cameraPermissionTitle = "Camera Access Required"
    override val cameraPermissionSubtitle = "Camera permission is needed to scan crop leaves and detect diseases."
    override val grantAccessBtn = "Grant Camera Access"
    override val cropDiagnosisTitle = "Crop Health Diagnosis"
    override val aiConfidenceLabel = "AI Confidence Score"
    override val severityLabel = "Severity:"
    override val voiceAdvisoryTitle = "Voice Advisory Assistant"
    override val voiceAdvisorySubtitle = "Press listen to play full advisory"
    override val listenBtn = "Listen"
    override val stopBtn = "Stop"
    override val keySymptomsTitle = "Key Symptoms"
    override val managementTitle = "Management & Treatment"
    override val organicPracticesTitle = "Organic & Biological Control:"
    override val scanAnotherBtn = "Scan Another Crop"
    override val plannerHeaderTitle = "Crop Planner & Estimates"
    override val selectCropFormTitle = "Select Crop & Land Area"
    override val farmLandLabel = "Farm Land (Acres)"
    override val sowingDateLabel = "Sowing Date"
    override val calculatePlanBtn = "Calculate Plan"
    override val financialEstimatesTitle = "Financial Estimates"
    override val estimatedCostLabel = "Estimated Cultivation Cost:"
    override val expectedYieldLabel = "Expected Yield:"
    override val expectedRevenueLabel = "Expected Revenue:"
    override val netProfitLabel = "Net Profit Range:"
    override val financialDisclaimer = "⚠️ Disclaimer: Figures are estimates based on market rates and weather. Income is not guaranteed."
    override val riskWindowsTitle = "Disease & Pest Vulnerability Windows"
    override val cultivationStagesTitle = "Cultivation Stages & Actions"
    override val apmcHeaderTitle = "APMC Market Commodity Rates"
    override val searchMandiPlaceholder = "Search crop, mandi, or district..."
    override val minMaxLabel = "Min - Max Rate:"
    override val modalPriceLabel = "Modal Price:"
    override val historyHeaderTitle = "Crop Health Scan History"
    override val noScansTitle = "No Scans Recorded Yet"
    override val noScansSubtitle = "Scan a crop using your camera to save diagnosis history."
    override val alertsHeaderTitle = "Crop & Weather Alerts"
    override val profileHeaderTitle = "Farmer Profile & Settings"
    override val appSettingsTitle = "Application Settings"
    override val languageLabel = "Language"
    override val locationLabel = "Location District"
    override val voiceTtsLabel = "Voice Guidance (TTS)"
    override val notificationsLabel = "Alerts & Notifications"
    override val privacyLabel = "Privacy Policy & Terms"

    override val navHome = "Home"
    override val navScan = "Scan"
    override val navPlanner = "Planner"
    override val navMarket = "Market"
    override val navProfile = "Profile"

    override val riskLow = "LOW RISK"
    override val riskModerate = "MODERATE"
    override val riskHigh = "HIGH RISK"
    override val riskSevere = "SEVERE"

    override val yieldUnitLabel = "Quintals"
    override val stage1Title = "1. Sowing & Nursery"
    override val stage2Title = "2. Vegetative Growth"
    override val stage3Title = "3. Flowering & Fruiting"
    override val stage4Title = "4. Harvesting & Grading"

    override val diseaseLabel = "Disease:"
    override val analyzingCrop = "Analyzing Crop Image..."
    override val pleaseWait = "Please wait a few seconds for AI diagnosis."
    override val speakingAdvisory = "Speaking Advisory..."
    override val detectingGps = "Detecting GPS..."
    override val otpDemoHint = "Demo Mode: Press verify with any 4 digits"
    override val quintalsUnit = "Quintal"
    override val trendUp = "Up"
    override val trendDown = "Down"
    override val trendStable = "Stable"
}

object MarathiDictionary : Dictionary {
    override val appTitle = "AgriSathi AI"
    override val appTagline = "शेतीचा विश्वासू सोबती | स्मार्ट पीक सल्ला"
    override val selectLanguageTitle = "तुमची भाषा निवडा"
    override val selectLanguageSubtitle = "ॲपमधील सर्व माहिती आणि व्हॉईस मार्गदर्शन तुमच्या भाषेत मिळेल."
    override val continueBtn = "पुढे जा"
    override val loginTitle = "शेतकरी लॉगिन / नोंदणी"
    override val loginSubtitle = "तुमचा मोबाईल नंबर टाकून OTP व्हेरिफाय करा."
    override val mobileNumberLabel = "मोबाईल नंबर"
    override val sendOtpBtn = "OTP पाठवा"
    override val enterOtpLabel = "4 अंकी OTP टाका"
    override val verifyBtn = "व्हेरिफाय करा"
    override val skipLoginBtn = "लॉगिन न करता पुढे जा"
    override val locationTitle = "तुमचे ठिकाण निवडा"
    override val locationSubtitle = "हवामान, स्थानिक पीक रोग धोके आणि जवळच्या APMC चे दर दाखवण्यासाठी ठिकाण आवश्यक आहे."
    override val autoDetectBtn = "GPS लोकेशन आपोआप शोधा"
    override val manualDistrictLabel = "किंवा तुमचा जिल्हा मॅन्युअली निवडा:"
    override val proceedHomeBtn = "होम स्क्रीनवर जा"
    override val primaryServicesTitle = "मुख्य सेवा"
    override val scanCropTitle = "पिकाची तपासणी"
    override val scanCropSubtitle = "रोग व कीड निदान"
    override val cropPlannerTitle = "पिक नियोजन"
    override val cropPlannerSubtitle = "नियोजन व उत्पन्न अंदाज"
    override val marketPricesTitle = "बाजारभाव"
    override val scanHistoryTitle = "इतिहास"
    override val apmcRatesTitle = "बाजारभाव अपडेट"
    override val viewAll = "सर्व पहा >"
    override val recentScansTitle = "अलीकडील तपासणी"
    override val scanFrameInstruction = "प्रभावित पाना किंवा फळ चौकटीत आणा"
    override val cameraPermissionTitle = "कॅमेरा परवानगी आवश्यक आहे"
    override val cameraPermissionSubtitle = "पिकाचा फोटो काढून रोगाचे निदान करण्यासाठी कॅमेरा वापरण्याची अनुमती द्या."
    override val grantAccessBtn = "परवानगी द्या"
    override val cropDiagnosisTitle = "पिक रोग निदान"
    override val aiConfidenceLabel = "AI अचूकता"
    override val severityLabel = "गंभीरता:"
    override val voiceAdvisoryTitle = "व्हॉईस सल्ला ऐका"
    override val voiceAdvisorySubtitle = "एकूण सल्ला ऐकण्यासाठी प्ले दाबा"
    override val listenBtn = "ऐका"
    override val stopBtn = "थांबा"
    override val keySymptomsTitle = "लक्षणे"
    override val managementTitle = "उपाययोजना व सेंद्रिय नियंत्रण"
    override val organicPracticesTitle = "जैविक व सेंद्रिय उपाय:"
    override val scanAnotherBtn = "दुसऱ्या पिकाची तपासणी करा"
    override val plannerHeaderTitle = "पिक नियोजन व उत्पन्न अंदाज"
    override val selectCropFormTitle = "पिक निवडा व क्षेत्र टाका"
    override val farmLandLabel = "शेत जमीन (एकर)"
    override val sowingDateLabel = "लागवड तारीख"
    override val calculatePlanBtn = "नियोजन चार्ट तयार करा"
    override val financialEstimatesTitle = "अंदाजित उत्पन्न व नफा"
    override val estimatedCostLabel = "अंदाजित लागवड खर्च:"
    override val expectedYieldLabel = "अंदाजित उत्पादन:"
    override val expectedRevenueLabel = "एकूण अंदाजित महसूल:"
    override val netProfitLabel = "निव्वळ नफा रेंज:"
    override val financialDisclaimer = "⚠️ इशारा: सदर आकडेवारी बाजारभाव आणि हवामानावर आधारित अंदाजित आहे. हे हमी दिलेले उत्पन्न नाही."
    override val riskWindowsTitle = "कीड व रोग संवेदनशील कालावधी"
    override val cultivationStagesTitle = "पिकाचे टप्पे व कृती नियोजन"
    override val apmcHeaderTitle = "कृषी उत्पन्न बाजार समिती दर"
    override val searchMandiPlaceholder = "पिक किंवा बाजार समिती शोधा..."
    override val minMaxLabel = "किमान - कमाल दर:"
    override val modalPriceLabel = "सर्वसाधारण दर:"
    override val historyHeaderTitle = "पिक रोग तपासणी इतिहास"
    override val noScansTitle = "अद्याप एकही तपासणी केलेली नाही"
    override val noScansSubtitle = "कॅमेऱ्याने पिकाचा फोटो काढून तपासणी करा."
    override val alertsHeaderTitle = "कृषी सूचना व इशारे"
    override val profileHeaderTitle = "शेतकरी प्रोफाईल"
    override val appSettingsTitle = "ॲप सेटिंग्ज"
    override val languageLabel = "भाषा बदल"
    override val locationLabel = "स्थानिक जिल्हा"
    override val voiceTtsLabel = "व्हॉईस मार्गदर्शन"
    override val notificationsLabel = "सूचना व अलर्ट"
    override val privacyLabel = "गोपनीयता व अटी"

    override val navHome = "मुख्य"
    override val navScan = "तपासणी"
    override val navPlanner = "नियोजन"
    override val navMarket = "बाजारभाव"
    override val navProfile = "प्रोफाईल"

    override val riskLow = "कमी धोका"
    override val riskModerate = "मध्यम धोका"
    override val riskHigh = "उच्च धोका"
    override val riskSevere = "तीव्र धोका"

    override val yieldUnitLabel = "क्विंटल"
    override val stage1Title = "१. रोपवाटिका व लागवड"
    override val stage2Title = "२. शाकीय वाढ"
    override val stage3Title = "३. फुलधारणा व फळधारणा"
    override val stage4Title = "४. काढणी व वर्गवारी"

    override val diseaseLabel = "रोग:"
    override val analyzingCrop = "पिकाचे विश्लेषण सुरू आहे..."
    override val pleaseWait = "कृपया काही सेकंद वाट पहा."
    override val speakingAdvisory = "सल्ला बोलला जात आहे..."
    override val detectingGps = "GPS शोधत आहे..."
    override val otpDemoHint = "डेमो मोड: कोणतेही 4 अंक टाका"
    override val quintalsUnit = "क्विंटल"
    override val trendUp = "तेजी"
    override val trendDown = "मंदी"
    override val trendStable = "स्थिर"
}

object HindiDictionary : Dictionary {
    override val appTitle = "AgriSathi AI"
    override val appTagline = "किसानों का सच्चा साथी | स्मार्ट फसल सलाह"
    override val selectLanguageTitle = "अपनी भाषा चुनें"
    override val selectLanguageSubtitle = "ऐप में सभी जानकारी और वॉयस गाइडेंस आपकी भाषा में मिलेगी।"
    override val continueBtn = "आगे बढ़ें"
    override val loginTitle = "किसान लॉगिन / पंजीकरण"
    override val loginSubtitle = "अपना मोबाइल नंबर दर्ज करके OTP से सत्यापित करें।"
    override val mobileNumberLabel = "मोबाइल नंबर"
    override val sendOtpBtn = "OTP भेजें"
    override val enterOtpLabel = "4-अंकों का OTP दर्ज करें"
    override val verifyBtn = "सत्यापित करें"
    override val skipLoginBtn = "बिना लॉगिन आगे बढ़ें"
    override val locationTitle = "अपना स्थान चुनें"
    override val locationSubtitle = "मौसम, फसल रोग जोखिम और नजदीकी APMC मंडी भाव के लिए स्थान आवश्यक है।"
    override val autoDetectBtn = "GPS स्थान स्वतः खोजें"
    override val manualDistrictLabel = "या अपना जिला मैन्युअल रूप से चुनें:"
    override val proceedHomeBtn = "होम स्क्रीन पर जाएं"
    override val primaryServicesTitle = "मुख्य सेवाएं"
    override val scanCropTitle = "फसल की जांच"
    override val scanCropSubtitle = "रोग एवं कीट निदान"
    override val cropPlannerTitle = "फसल योजना"
    override val cropPlannerSubtitle = "योजना एवं आय अनुमान"
    override val marketPricesTitle = "मंडी भाव"
    override val scanHistoryTitle = "इतिहास"
    override val apmcRatesTitle = "मंडी भाव अपडेट"
    override val viewAll = "सभी देखें >"
    override val recentScansTitle = "हाल की जांच"
    override val scanFrameInstruction = "प्रभावित पत्ती या फल को फ्रेम में लाएं"
    override val cameraPermissionTitle = "कैमरा अनुमति आवश्यक है"
    override val cameraPermissionSubtitle = "फसल की फोटो खींचकर बीमारी का पता लगाने के लिए कैमरा एक्सेस की अनुमति दें।"
    override val grantAccessBtn = "अनुमति दें"
    override val cropDiagnosisTitle = "फसल रोग निदान"
    override val aiConfidenceLabel = "AI सटीकता"
    override val severityLabel = "गंभीरता:"
    override val voiceAdvisoryTitle = "वॉयस सलाह सुनें"
    override val voiceAdvisorySubtitle = "पूरी सलाह सुनने के लिए प्ले दबाएं"
    override val listenBtn = "सुनें"
    override val stopBtn = "रोकें"
    override val keySymptomsTitle = "मुख्य लक्षण"
    override val managementTitle = "प्रबंधन एवं जैविक नियंत्रण"
    override val organicPracticesTitle = "जैविक एवं प्राकृतिक उपाय:"
    override val scanAnotherBtn = "दूसरी फसल की जांच करें"
    override val plannerHeaderTitle = "फसल योजना एवं आय अनुमान"
    override val selectCropFormTitle = "फसल चुनें और क्षेत्र दर्ज करें"
    override val farmLandLabel = "खेत की जमीन (एकड़)"
    override val sowingDateLabel = "बुआई की तारीख"
    override val calculatePlanBtn = "योजना चार्ट तैयार करें"
    override val financialEstimatesTitle = "अनुमानित आय एवं लाभ"
    override val estimatedCostLabel = "अनुमानित लागत:"
    override val expectedYieldLabel = "अनुमानित उपज:"
    override val expectedRevenueLabel = "कुल अनुमानित राजस्व:"
    override val netProfitLabel = "शुद्ध लाभ सीमा:"
    override val financialDisclaimer = "⚠️ चेतावनी: यह आंकड़े बाजार भाव और मौसम पर आधारित अनुमान हैं। यह गारंटीकृत आय नहीं है।"
    override val riskWindowsTitle = "कीट एवं रोग संवेदनशील अवधि"
    override val cultivationStagesTitle = "फसल के चरण एवं कार्य योजना"
    override val apmcHeaderTitle = "कृषि उपज मंडी भाव"
    override val searchMandiPlaceholder = "फसल या मंडी खोजें..."
    override val minMaxLabel = "न्यूनतम - अधिकतम भाव:"
    override val modalPriceLabel = "मॉडल भाव:"
    override val historyHeaderTitle = "फसल जांच इतिहास"
    override val noScansTitle = "अभी तक कोई जांच दर्ज नहीं की गई"
    override val noScansSubtitle = "कैमरे से फोटो खींचकर अपनी फसल की जांच करें।"
    override val alertsHeaderTitle = "कृषि अलर्ट एवं चेतावनी"
    override val profileHeaderTitle = "किसान प्रोफाइल"
    override val appSettingsTitle = "ऐप सेटिंग्स"
    override val languageLabel = "भाषा बदलें"
    override val locationLabel = "स्थानीय जिला"
    override val voiceTtsLabel = "वॉयस मार्गदर्शन"
    override val notificationsLabel = "अलर्ट एवं सूचनाएं"
    override val privacyLabel = "गोपनीयता एवं शर्तें"

    override val navHome = "होम"
    override val navScan = "जांच"
    override val navPlanner = "योजना"
    override val navMarket = "मंडी"
    override val navProfile = "प्रोफाइल"

    override val riskLow = "कम जोखिम"
    override val riskModerate = "मध्यम जोखिम"
    override val riskHigh = "उच्च जोखिम"
    override val riskSevere = "गंभीर जोखिम"

    override val yieldUnitLabel = "क्विंटल"
    override val stage1Title = "1. नर्सरी एवं बुआई"
    override val stage2Title = "2. वानस्पतिक वृद्धि"
    override val stage3Title = "3. फूल एवं फल आना"
    override val stage4Title = "4. कटाई एवं ग्रेडिंग"

    override val diseaseLabel = "रोग:"
    override val analyzingCrop = "फसल की जांच की जा रही है..."
    override val pleaseWait = "कृपया कुछ सेकंड प्रतीक्षा करें।"
    override val speakingAdvisory = "सलाह बोली जा रही है..."
    override val detectingGps = "GPS खोज रहा है..."
    override val otpDemoHint = "डेमो मोड: कोई भी 4 अंक दर्ज करें"
    override val quintalsUnit = "क्विंटल"
    override val trendUp = "तेजी"
    override val trendDown = "मंदी"
    override val trendStable = "स्थिर"
}

object TamilDictionary : Dictionary {
    override val appTitle = "AgriSathi AI"
    override val appTagline = "விவசாயிகளின் நம்பிக்கைக்குரிய துணைவன்"
    override val selectLanguageTitle = "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்"
    override val selectLanguageSubtitle = "அனைத்து தகவல்களும் குரல் வழிகாட்டுதலும் உங்கள் மொழியில் வழங்கப்படும்."
    override val continueBtn = "தொடரவும்"
    override val loginTitle = "விவசாயி உள்நுழைவு"
    override val loginSubtitle = "OTP பெற உங்கள் மொபைல் எண்ணை உள்ளிடவும்."
    override val mobileNumberLabel = "மொபைல் எண்"
    override val sendOtpBtn = "OTP அனுப்பு"
    override val enterOtpLabel = "4 இலக்க OTP ஐ உள்ளிடவும்"
    override val verifyBtn = "சரிபார்"
    override val skipLoginBtn = "உள்நுழைவின்றி தொடரவும்"
    override val locationTitle = "இருப்பிடத்தைத் தேர்ந்தெடுக்கவும்"
    override val locationSubtitle = "வானிலை மற்றும் சந்தை விலைகளைக் காட்ட இருப்பிடம் தேவை."
    override val autoDetectBtn = "GPS தானாகக் கண்டறி"
    override val manualDistrictLabel = "அல்லது மாவட்டத்தைத் தேர்ந்தெடுக்கவும்:"
    override val proceedHomeBtn = "முகப்புக்குச் செல்லவும்"
    override val primaryServicesTitle = "முக்கிய சேவைகள்"
    override val scanCropTitle = "பயிர் ஆய்வு"
    override val scanCropSubtitle = "நோய் கண்டறிதல்"
    override val cropPlannerTitle = "பயிர் திட்டம்"
    override val cropPlannerSubtitle = "திட்டம் & லாப மதிப்பீடு"
    override val marketPricesTitle = "சந்தை விலை"
    override val scanHistoryTitle = "வரலாறு"
    override val apmcRatesTitle = "சந்தை விலை தகவல்கள்"
    override val viewAll = "அனைத்தையும் காண்க >"
    override val recentScansTitle = "சமீபத்திய ஆய்வுகள்"
    override val scanFrameInstruction = "பாதிக்கப்பட்ட இலையை பெட்டிக்குள் வைக்கவும்"
    override val cameraPermissionTitle = "கேமரா அனுமதி தேவை"
    override val cameraPermissionSubtitle = "பயிரைப் படம் பிடிக்க கேமரா அனுமதி தேவை."
    override val grantAccessBtn = "அனுமதி வழங்கு"
    override val cropDiagnosisTitle = "பயிர் நோய் கண்டறிதல்"
    override val aiConfidenceLabel = "AI துல்லியம்"
    override val severityLabel = "தீவிரம்:"
    override val voiceAdvisoryTitle = "குரல் வழிகாட்டி"
    override val voiceAdvisorySubtitle = "ஆலோசனையைக் கேட்க ப்ளே செய்யவும்"
    override val listenBtn = "கேட்க"
    override val stopBtn = "நிறுத்து"
    override val keySymptomsTitle = "முக்கிய அறிகுறிகள்"
    override val managementTitle = "நிர்வாகம் & சிகிச்சை"
    override val organicPracticesTitle = "இயற்கை கட்டுப்பாடு:"
    override val scanAnotherBtn = "மற்றொரு பயிரை ஆய்வு செய்க"
    override val plannerHeaderTitle = "பயிர் திட்டம் & மதிப்பீடுகள்"
    override val selectCropFormTitle = "பயிர் & நில அளவைத் தேர்ந்தெடுக்கவும்"
    override val farmLandLabel = "நிலம் (ஏக்கர்)"
    override val sowingDateLabel = "விதைப்பு தேதி"
    override val calculatePlanBtn = "திட்டத்தைக் கணக்கிடு"
    override val financialEstimatesTitle = "நிதி மதிப்பீடுகள்"
    override val estimatedCostLabel = "மதிப்பிடப்பட்ட செலவு:"
    override val expectedYieldLabel = "எதிர்பார்க்கப்படும் மகசூல்:"
    override val expectedRevenueLabel = "எதிர்பார்க்கப்படும் வருவாய்:"
    override val netProfitLabel = "தேர லாபம்:"
    override val financialDisclaimer = "⚠️ எச்சரிக்கை: இவை சந்தை விலை சார்ந்த மதிப்பீடுகள் மட்டுமே."
    override val riskWindowsTitle = "நோய் அபாய காலங்கள்"
    override val cultivationStagesTitle = "பாகுபாட்டின் நிலைகள்"
    override val apmcHeaderTitle = "சந்தை விளைபொருள் விலைகள்"
    override val searchMandiPlaceholder = "பயிர் அல்லது சந்தையைத் தேடுக..."
    override val minMaxLabel = "குறைந்த - அதிகபட்ச விலை:"
    override val modalPriceLabel = "சராசரி விலை:"
    override val historyHeaderTitle = "பயிர் ஆய்வு வரலாறு"
    override val noScansTitle = "இதுவரை ஆய்வுகள் எதுவும் இல்லை"
    override val noScansSubtitle = "கேமரா மூலம் உங்கள் பயிரை ஆய்வு செய்யுங்கள்."
    override val alertsHeaderTitle = "விவசாய எச்சரிக்கைகள்"
    override val profileHeaderTitle = "விவசாயி சுயவிவரம்"
    override val appSettingsTitle = "செயலி அமைப்புகள்"
    override val languageLabel = "மொழி மாற்றம்"
    override val locationLabel = "மாவட்டம்"
    override val voiceTtsLabel = "குரல் வழிகாட்டுதல்"
    override val notificationsLabel = "அறிவிப்புகள்"
    override val privacyLabel = "தனியுரிமைக் கொள்கை"

    override val navHome = "முகப்பு"
    override val navScan = "ஆய்வு"
    override val navPlanner = "திட்டம்"
    override val navMarket = "சந்தை"
    override val navProfile = "சுயவிவரம்"

    override val riskLow = "குறைந்த அபாயம்"
    override val riskModerate = "மிதமான அபாயம்"
    override val riskHigh = "அதிக அபாயம்"
    override val riskSevere = "கடுமையான அபாயம்"

    override val yieldUnitLabel = "குவிண்டால்"
    override val stage1Title = "1. விதைப்பு & நாற்றங்கால்"
    override val stage2Title = "2. வளர்ச்சி நிலை"
    override val stage3Title = "3. பூக்கும் & காய்க்கும் நிலை"
    override val stage4Title = "4. அறுவடை நிலை"

    override val diseaseLabel = "நோய்:"
    override val analyzingCrop = "பயிர் ஆய்வு செய்யப்படுகிறது..."
    override val pleaseWait = "தயவுசெய்து காத்திருக்கவும்."
    override val speakingAdvisory = "ஆலோசனை பேசப்படுகிறது..."
    override val detectingGps = "GPS தேடப்படுகிறது..."
    override val otpDemoHint = "டெமோ முறை: ஏதேனும் 4 எண்களை உள்ளிடவும்"
    override val quintalsUnit = "குவிண்டால்"
    override val trendUp = "உயர்வு"
    override val trendDown = "சரிவு"
    override val trendStable = "நிலையான"
}
