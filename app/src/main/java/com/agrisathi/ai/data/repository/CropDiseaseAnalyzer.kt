package com.agrisathi.ai.data.repository

import com.agrisathi.ai.data.model.Advisory
import com.agrisathi.ai.data.model.DiseaseResult
import com.agrisathi.ai.data.model.RiskLevel
import kotlinx.coroutines.delay

interface CropDiseaseAnalyzer {
    suspend fun analyzeCropImage(imageUri: String?, lang: String = "en", cropHint: String? = null): DiseaseResult
}

class MockCropDiseaseAnalyzerImpl : CropDiseaseAnalyzer {

    private fun getNonPlantResult(lang: String): DiseaseResult {
        val isMr = lang == "mr"
        val isHi = lang == "hi"
        val isTa = lang == "ta"

        fun c(en: String, mr: String, hi: String, ta: String): String {
            return when {
                isMr -> mr
                isHi -> hi
                isTa -> ta
                else -> en
            }
        }

        return DiseaseResult(
            cropName = c("Non-Agricultural Object", "पीक किंवा वनस्पती आढळली नाही", "कोई फसल नहीं पाई गई", "பயிர் எதுவும் கண்டறியப்படவில்லை"),
            diseaseName = c("NOT A CROP / NON-PLANT OBJECT", "अवैध वस्तू (पीक नाही)", "अमान्य वस्तु (फसल नहीं)", "செல்லாத பொருள்"),
            confidence = 18,
            riskLevel = RiskLevel.LOW,
            severity = c("N/A (Non-Crop Image)", "अयोग्य स्कॅन", "अमान्य स्कैन", "தவறான ஸ்கேன்"),
            explanation = c(
                "⚠️ NOT A CROP DETECTED: No leaf, fruit, or plant tissue detected in the scanned image. Please point camera directly at a crop leaf or plant part.",
                "⚠️ स्कॅन केलेल्या चित्रात कोणतेही पान, फळ किंवा वनस्पती आढळली नाही. कृपया कॅमेरा पिकाच्या पानावर धरा.",
                "⚠️ स्कैन की गई छवि में कोई पत्ती, फल या पौधा नहीं मिला। कृपया अपना कैमरा फसल की पत्ती पर रखें।",
                "⚠️ படத்தில் இலை அல்லது பழம் எதுவும் கண்டறியப்படவில்லை."
            ),
            advisory = Advisory(
                summary = c(
                    "Our AI visual engine analyzed the photo and identified it as a non-agricultural object (e.g. human face, furniture, car, or document). Please scan a clear, well-lit crop leaf photo.",
                    "कृपया पुरेसा प्रकाश ठेवा आणि पिकाच्या पानाचा स्पष्ट फोटो काढा.",
                    "कृपया उचित प्रकाश रखें और अपनी फसल की पत्ती का स्पष्ट चित्र लें।",
                    "பயிரின் இலையை தெளிவாக படம் பிடிக்கவும்."
                ),
                symptoms = listOf(
                    c("Non-plant object scanned (car, face, text)", "वनस्पती नसलेली वस्तू स्कॅन झाली", "गैर-पौधे की वस्तु स्कैन हुई", "தவறான பொருள்"),
                    c("No leaf veins or plant cellular structure detected", "पानावरील शिरा आढळल्या नाहीत", "पत्ती की संरचना नहीं मिली", "இலை நரம்புகள் இல்லை")
                ),
                organicControl = listOf(
                    c("Re-scan with proper crop camera alignment", "कॅमेरा पिकाच्या पानासमोर धरून पुन्हा स्कॅन करा", "कैमरा सही जगह रखकर पुनः स्कैन करें", "மீண்டும் ஸ்கேன் செய்யவும்"),
                    c("Select valid crop (Tomato, Paddy, Cotton, Wheat)", "योग्य पीक निवडून पुन्हा फोटो काढा", "सही फसल का चयन करें", "சரியான பயிரைத் தேர்ந்தெடுக்கவும்")
                ),
                recommendedPractice = listOf(
                    c("Hold phone steady 15-20 cm away from infected leaf", "कॅमेरा पानापासून १५-२० सेमी अंतरावर स्थिर ठेवा", "कैमरा पत्ती से 15-20 सेमी दूरी पर स्थिर रखें", "15-20 செ.மீ இடைவெளியில் கேமராவை நிலைநிறுத்தவும்"),
                    c("Avoid scanning household items, vehicles, or animals", "घरातील वस्तू किंवा प्राण्यांचे फोटो काढणे टाळा", "घरेलू वस्तुओं या जानवरों को स्कैन न करें", "வீட்டுப் பொருட்களை ஸ்கேன் செய்ய வேண்டாம்")
                )
            )
        )
    }

    private fun getLowConfidenceResult(lang: String): DiseaseResult {
        val isMr = lang == "mr"
        val isHi = lang == "hi"
        val isTa = lang == "ta"

        fun c(en: String, mr: String, hi: String, ta: String): String {
            return when {
                isMr -> mr
                isHi -> hi
                isTa -> ta
                else -> en
            }
        }

        return DiseaseResult(
            cropName = c("Uncertain Crop", "अस्पष्ट पीक", "अस्पष्ट फसल", "தெளிவற்ற பயிர்"),
            diseaseName = c("UNKNOWN / NEEDS EXPERT REVIEW", "अज्ञात / तज्ज्ञ पडताळणी आवश्यक", "अज्ञात / विशेषज्ञ सत्यापन आवश्यक", "தெரியாதது / நிபுணர் ஆய்வு தேவை"),
            confidence = 45,
            riskLevel = RiskLevel.MODERATE,
            severity = c("Low Confidence (<70%)", "कमी विश्वासार्हता (<७०%)", "कम आत्मविश्वास (<70%)", "குறைந்த நம்பிக்கை (<70%)"),
            explanation = c(
                "AI Safety Alert: Image quality, lighting, or symptoms are ambiguous. To prevent harmful pesticide misuse, diagnosis requires human expert verification.",
                "एआय सुरक्षा सूचना: फोटोतील लक्षणे अस्पष्ट आहेत. चुकीच्या औषध फवारणीपासून बचावासाठी तज्ज्ञांचे मत आवश्यक आहे.",
                "एआई सुरक्षा सूचना: छवि में लक्षण स्पष्ट नहीं हैं। गलत कीटनाशक से बचने के लिए विशेषज्ञ सत्यापन आवश्यक है।",
                "AI பாதுகாப்பு எச்சரிக்கை: படத்தின் தெளிவு குறைவாக உள்ளது."
            ),
            advisory = Advisory(
                summary = c(
                    "Unable to confidently identify the problem. Please capture a clearer close-up photo in sunlight or tap 'Request Expert Review'.",
                    "समस्येचे अचूक निदान होऊ शकले नाही. कृपया पुरेसा प्रकाश ठेवून स्पष्ट फोटो काढा किंवा 'तज्ज्ञ पडताळणी' विनंती करा.",
                    "समस्या की सटीक पहचान नहीं हो सकी। कृपया स्पष्ट चित्र लें या 'विशेषज्ञ समीक्षा' का अनुरोध करें।",
                    "துல்லியமாக அடையாளம் காண முடியவில்லை. தெளிவான படம் எடுக்கவும்."
                ),
                symptoms = listOf(
                    c("Unclear lesion patterns", "अस्पष्ट ठिपके किंवा चट्टे", "अस्पष्ट धब्बे", "தெளிவற்ற புள்ளிகள்"),
                    c("Possible early stage or nutritional deficiency", "प्रारंभिक प्रादुर्भाव किंवा अन्नद्रव्यांची कमतरता शक्यता", "प्रारंभिक संक्रमण या पोषण की कमी", "ஆரம்ப நிலை தொற்று")
                ),
                organicControl = listOf(
                    c("Do NOT spray chemical pesticides without expert confirmation", "तज्ज्ञांच्या सल्ल्याशिवाय कोणतीही रासायनिक फवारणी करू नका", "बिना सलाह कोई रासायनिक छिड़काव न करें", "ரசாயனம் தெளிக்க வேண்டாம்"),
                    c("Submit case to Agricultural Extension Officer via app", "अॅपद्वारे कृषी तज्ज्ञांकडे तपासणीसाठी पाठवा", "ऐप के माध्यम से विशेषज्ञ को भेजें", "நிபுணருக்கு அனுப்பவும்")
                ),
                recommendedPractice = listOf(
                    c("Inspect surrounding plants for similar symptoms", "शेजारील इतर झाडांचे निरीक्षण करा", "आसपास के अन्य पौधों का निरीक्षण करें", "அருகிலுள்ள செடிகளை கண்காணிக்கவும்"),
                    c("Re-take photo holding phone 15-20cm from affected leaf", "पानापासून १५-२० सेमी अंतरावर कॅमेरा धरून पुन्हा फोटो काढा", "15-20 सेमी दूरी से पुनः फोटो लें", "15-20 செ.மீ தொலைவில் இருந்து படம் எடுக்கவும்")
                )
            )
        )
    }

    private fun getMockDatabase(lang: String): List<DiseaseResult> {
        val isMr = lang == "mr"
        val isHi = lang == "hi"
        val isTa = lang == "ta"

        fun c(en: String, mr: String, hi: String, ta: String): String {
            return when {
                isMr -> mr
                isHi -> hi
                isTa -> ta
                else -> en
            }
        }

        return listOf(
            DiseaseResult(
                cropName = c("Tomato", "टोमॅटो", "टमाटर", "தக்காளி"),
                diseaseName = c("Early Blight (Alternaria solani)", "तपकिरी ठिपके (Early Blight)", "अगेती झुलसा (Early Blight)", "இலைப்புள்ளி (Early Blight)"),
                confidence = 94,
                riskLevel = RiskLevel.HIGH,
                severity = c("Moderate Foliar Infection", "मध्यम प्रभावित", "मध्यम प्रभावित", "மிதமான பாதிப்பு"),
                explanation = c(
                    "Concentric dark brown rings detected on lower foliage with mild yellow chlorotic halo around lesions.",
                    "खालील पानांवर चक्राकार तपकिरी ठिपके आणि पिवळसर कडा आढळल्या आहेत.",
                    "निचली पत्तियों पर गोल भूरे धब्बे और पीलापन देखा गया है।",
                    "கீழ் இலைகளில் அடர் பழுப்பு நிற புள்ளிகள் காணப்படுகின்றன."
                ),
                advisory = Advisory(
                    summary = c(
                        "Remove infected lower leaves immediately. Spray organic Neem extract (5ml/L) and avoid overhead irrigation.",
                        "प्रभावित पाने ताबडतोब काढून टाका. कडुनिंब अर्क फवारा आणि ठिबक सिंचनाचा वापर करा.",
                        "संक्रमित पत्तियों को तुरंत हटा दें। नीम अर्क का छिड़काव करें और बूंद-बूंद सिंचाई का प्रयोग करें।",
                        "பாதிக்கப்பட்ட இலைகளை உடனடியாக அகற்றவும். சொட்டுநீர் பாசனத்தைப் பயன்படுத்தவும்."
                    ),
                    symptoms = listOf(
                        c("Concentric ring spots on leaves", "पानांवर गोलाकार ठिपके", "पत्तियों पर गोलाकार धब्बे", "இலைகளில் வட்ட வடிவ புள்ளிகள்"),
                        c("Yellowing of foliage margins", "पानांच्या कडा पिवळ्या पडणे", "पत्तियों के किनारे पीले पडना", "இலை ஓரங்கள் மஞ்சள் நிறமாதல்"),
                        c("Premature leaf drop in severe cases", "तीव्र अवस्थेत पाने गळणे", "गंभीर स्थिति में पत्तियां गिरना", "இலை உதிர்தல்")
                    ),
                    organicControl = listOf(
                        c("Spray Neem Oil extract (5ml per liter water) every 7 days.", "कडुनिंबाचे तेल (५ मि.ली. प्रति लीटर पाणी) फवारा.", "नीम का तेल (5 मि.ली. प्रति लीटर पानी) छिड़कें।", "வேப்ப எண்ணெய் (5 மி.லி / லிட்டர்) தெளிக்கவும்."),
                        c("Apply Trichoderma viride biocontrol solution around roots.", "ट्रायकोडेमा व्हिरिडी जैविक बुरशीनाशक मुळांजवळ द्या.", "ट्राइकोडर्मा विरिडी जड़ों के पास दें।", "ட்ரைக்கோடெர்மா விரிடி பயன்படுத்தவும்.")
                    ),
                    recommendedPractice = listOf(
                        c("Maintain 60cm gap between crop rows for sunlight penetration.", "सूर्यप्रकाश मिळण्यासाठी ६० सेमी अंतर ठेवा.", "धूप के लिए 60 सेमी की दूरी रखें।", "60 सेमी இடைவெளி பராமரிக்கவும்."),
                        c("Destroy heavily infected crop residue away from field.", "संक्रमित अवशेष शेतापासून दूर नष्ट करा.", "संक्रमित अवशेषों को खेत से दूर नष्ट करें।", "பாதிக்கப்பட்ட பயிர் கழிவுகளை அழிக்கவும்.")
                    )
                )
            ),
            DiseaseResult(
                cropName = c("Cotton", "कापूस", "कपास", "பருத்தி"),
                diseaseName = c("Pink Bollworm (Pectinophora gossypiella)", "गुलाबी बोंड अळी", "गुलाबी सुंडी", "பிங்க் காய்ப்புழு"),
                confidence = 91,
                riskLevel = RiskLevel.HIGH,
                severity = c("Severe Boll Damage", "तीव्र प्रादुर्भाव", "गंभीर प्रकोप", "கடுமையான பாதிப்பு"),
                explanation = c(
                    "Rosette flower symptoms and feeding entry holes identified on green developing bolls.",
                    "गुलाबी बोंड अळीमुळे फुले गुलाबासारखी उमललेली दिसतात.",
                    "गुलाबी सुंडी के कारण फूल गुलाब की तरह खिले हुए दिखाई देते हैं।",
                    "பச்சை காய்களில் புழுவின் தாக்குதல் காணப்படுகிறது."
                ),
                advisory = Advisory(
                    summary = c(
                        "Install Pheromone traps across the field immediately (8-10/acre). Collect and destroy rosette flowers.",
                        "कामगंध सापळे (Pheromone traps) लावा (८-१०/एकर). प्रादुर्भावग्रस्त फुले नष्ट करा.",
                        "फेरोमोन ट्रैप लगाएं (8-10 प्रति एकड़) और प्रभावित फूलों को नष्ट करें।",
                        "பெரோமோன் பொறிகளைப் பயன்படுத்தவும் (ஏக்கருக்கு 8-10). பாதிக்கப்பட்ட பூக்களை அழிக்கவும்."
                    ),
                    symptoms = listOf(
                        c("Rosette shaped flower blooms", "गुलाबासारखी उमललेली फुले", "गुलाब की तरह खिले फूल", "ரோஜா வடிவ பூக்கள்"),
                        c("Small entry holes on green bolls", "हिरव्या बोंडांवर छिद्रे", "हरे टेंडुओं पर छेद", "பச்சை காய்களில் துளைகள்")
                    ),
                    organicControl = listOf(
                        c("Deploy 8 to 10 Pheromone traps per acre.", "एकरी ८ ते १० कामगंध सापळे लावा.", "प्रति एकड़ 8 से 10 फेरोमोन ट्रैप लगाएं।", "ஏக்கருக்கு 8-10 பெரோமோன் பொறிகளை வைக்கவும்."),
                        c("Release Trichogramma egg parasitoids (60,000/acre).", "ट्रायकोग्रामा परोपजीवी मित्रकीटक सोडा.", "ट्राइकोग्रामा परजीवी कीट छोड़ें।", "ட்ரைக்கோகிராமா முட்டைகளை வெளியிடவும்.")
                    ),
                    recommendedPractice = listOf(
                        c("Avoid excessive nitrogen fertilizers that cause lush vegetative growth.", "अतिरिक्त नत्र खते देणे टाळा.", "अत्यधिक नाइट्रोजन उर्वरक से बचें।", "அதிக நைட்ரஜன் உரம் தவிர்க்கவும்."),
                        c("Destroy affected bolls far away from field.", "संक्रमित बोंडे शेतापासून लांब नष्ट करा.", "संक्रमित टेंडुओं को नष्ट करें।", "பாதிக்கப்பட்ட காய்களை அழிக்கவும்.")
                    )
                )
            ),
            DiseaseResult(
                cropName = c("Soybean", "सोयाबीन", "सोयाबीन", "சோயாபீன்"),
                diseaseName = c("Asian Soybean Rust (Phakopsora pachyrhizi)", "सोयाबीन तांबेरा (Rust)", "सोयाबीन गेरुआ (Rust)", "சோயாபீன் துரு நோய்"),
                confidence = 89,
                riskLevel = RiskLevel.MODERATE,
                severity = c("Moderate Pustules", "मध्यम तांबेरा", "मध्यम गेरुआ", "மிதமான துரு"),
                explanation = c(
                    "Tan to dark brown eruptive pustules detected on the underside of foliage with premature yellowing.",
                    "पानांच्या खालच्या बाजूवर तपकिरी पुरळ आणि तांबेरा आढळला आहे.",
                    "पत्तियों के नीचे भूरे दाने और पीलापन दिखाई दे रहा है।",
                    "இலைகளின் கீழ் பகுதியில் பழுப்பு நிற புள்ளிகள் காணப்படுகின்றன."
                ),
                advisory = Advisory(
                    summary = c(
                        "Apply prophylactic bio-fungicide spray and ensure adequate soil drainage.",
                        "जैविक बुरशीनाशक फवारा आणि पाण्याचा निचरा व्यवस्थित करा.",
                        "जैविक कवकनाशी का छिड़काव करें और जल निकासी ठीक करें।",
                        "உயிரி பூஞ்சாணக்கொல்லியை தெளிக்கவும்."
                    ),
                    symptoms = listOf(
                        c("Tan pustules on lower leaf surface", "पानांच्या खाली तपकिरी पुरळ", "पत्तियों के नीचे भूरे दाने", "இலையின் கீழ் துரு புள்ளிகள்"),
                        c("Premature foliage yellowing", "पाने अकाली पिवळी पडणे", "पत्तियों का पीला पड़ना", "இலைகள் முன்கூட்டியே மஞ்சள் நிறமாதல்")
                    ),
                    organicControl = listOf(
                        c("Foliar spray of Pseudomonas fluorescens (10g/L).", "स्यूडोमोनास फ्लुरोसेन्स (१० ग्रॅम/लिटर) फवारा.", "स्यूडोमोनास फ्लोरोसेंस का छिड़काव करें।", "சூடோமோனாஸ் தெளிக்கவும்.")
                    ),
                    recommendedPractice = listOf(
                        c("Ensure proper row spacing to reduce humidity in micro-canopy.", "हवा खेळती राहण्यासाठी अंतर ठेवा.", "हवा के संचार के लिए दूरी रखें।", "சரியான இடைவெளி விடவும்.")
                    )
                )
            )
        )
    }

    override suspend fun analyzeCropImage(imageUri: String?, lang: String, cropHint: String?): DiseaseResult {
        delay(1200)
        val uriStr = (imageUri ?: "").lowercase()
        val hint = (cropHint ?: "").lowercase()

        // 1. Check for non-plant object upload
        if (uriStr.contains("dummy") || uriStr.contains("not_crop") || uriStr.contains("non_crop") || uriStr.contains("object") || uriStr.contains("other")) {
            return getNonPlantResult(lang).copy(
                scanId = System.currentTimeMillis().toString(),
                imageUri = imageUri,
                timestamp = System.currentTimeMillis()
            )
        }

        // 2. Check for low confidence / ambiguous capture
        if (uriStr.contains("blur") || uriStr.contains("unclear") || uriStr.contains("low_conf") || uriStr.contains("unknown")) {
            return getLowConfidenceResult(lang).copy(
                scanId = System.currentTimeMillis().toString(),
                imageUri = imageUri,
                timestamp = System.currentTimeMillis()
            )
        }

        val mockDb = getMockDatabase(lang)
        val selected = when {
            hint.contains("cotton") || uriStr.contains("cotton") -> mockDb[1]
            hint.contains("soybean") || uriStr.contains("soybean") -> mockDb[2]
            else -> mockDb[0] // Default Tomato Early Blight
        }

        return selected.copy(
            scanId = System.currentTimeMillis().toString(),
            imageUri = imageUri,
            timestamp = System.currentTimeMillis()
        )
    }
}
