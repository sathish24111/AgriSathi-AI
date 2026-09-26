package com.agrisathi.ai.data.repository

import com.agrisathi.ai.data.model.Advisory
import com.agrisathi.ai.data.model.DiseaseResult
import com.agrisathi.ai.data.model.RiskLevel
import kotlinx.coroutines.delay

interface CropDiseaseAnalyzer {
    suspend fun analyzeCropImage(imageUri: String?, lang: String = "en"): DiseaseResult
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
                diseaseName = c("Early Blight", "तपकिरी ठिपके (Early Blight)", "अगेती झुलसा (Early Blight)", "இலைப்புள்ளி (Early Blight)"),
                confidence = 87,
                riskLevel = RiskLevel.MODERATE,
                severity = c("Moderate", "मध्यम प्रभावित", "मध्यम प्रभावित", "மிதமான பாதிப்பு"),
                explanation = c(
                    "Concentric dark brown rings detected on lower foliage with mild yellow halo around lesions.",
                    "खालील पानांवर चक्राकार तपकिरी ठिपके आणि पिवळसर कडा आढळल्या आहेत.",
                    "निचली पत्तियों पर गोल भूरे धब्बे और पीलापन देखा गया है।",
                    "கீழ் இலைகளில் அடர் பழுப்பு நிற புள்ளிகள் காணப்படுகின்றன."
                ),
                advisory = Advisory(
                    summary = c(
                        "Remove infected lower leaves immediately. Avoid overhead irrigation and ensure proper spacing for aeration.",
                        "प्रभावित पाने ताबडतोब काढून टाका. ठिबक सिंचनाचा वापर करा आणि हवा खेळती राहण्यासाठी अंतर ठेवा.",
                        "संक्रमित पत्तियों को तुरंत हटा दें। बूंद-बूंद सिंचाई का प्रयोग करें।",
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
                diseaseName = c("Pink Bollworm Larvae", "गुलाबी बोंड अळी", "गुलाबी सुंडी", "பிங்க் காய்ப்புழு"),
                confidence = 92,
                riskLevel = RiskLevel.HIGH,
                severity = c("Severe", "तीव्र प्रादुर्भाव", "गंभीर प्रकोप", "கடுமையான பாதிப்பு"),
                explanation = c(
                    "Rosette flower symptoms and feeding entry holes identified on green bolls.",
                    "गुलाबी बोंड अळीमुळे फुले गुलाबासारखी उमललेली दिसतात.",
                    "गुलाबी सुंडी के कारण फूल गुलाब की तरह खिले हुए दिखाई देते हैं।",
                    "பச்சை காய்களில் புழுவின் தாக்குதல் காணப்படுகிறது."
                ),
                advisory = Advisory(
                    summary = c(
                        "Install Pheromone traps across the field immediately. Collect and destroy rosette flowers.",
                        "कामाख्या कामगंध सापळे (Pheromone traps) लावा. प्रादुर्भावग्रस्त फुले नष्ट करा.",
                        "फेरोमोन ट्रैप लगाएं और प्रभावित फूलों को नष्ट करें।",
                        "பெரோமோன் பொறிகளைப் பயன்படுத்தவும். பாதிக்கப்பட்ட பூக்களை அழிக்கவும்."
                    ),
                    symptoms = listOf(
                        c("Rosette shaped flower blooms", "गुलाबासारखी उमललेली फुले", "गुलाब की तरह खिले फूल", "ரோஜா வடிவ பூக்கள்"),
                        c("Small entry holes on green bolls", "हिरव्या बोंडांवर छिद्रे", "हरे टेंडुओं पर छेद", "பச்சை காய்களில் துளைகள்")
                    ),
                    organicControl = listOf(
                        c("Deploy 8 to 10 Pheromone traps per acre.", "एकरी ८ ते १० कामगंध सापळे लावा.", "प्रति एकड़ 8 से 10 फेरोमोन ट्रैप लगाएं।", "ஏக்கருக்கு 8-10 பெரோமோன் பொறிகளை வைக்கவும்.")
                    ),
                    recommendedPractice = listOf(
                        c("Avoid late chemical spraying that kills beneficial insects.", "मित्रकीटकांचा बचाव करण्यासाठी रासायनिक फवारणी टाळा.", "मित्र कीटों की रक्षा के लिए रसायन से बचें।", "ரசாயன தெளிப்பைத் தவிர்க்கவும்.")
                    )
                )
            )
        )
    }

    private var scanCounter = 0

    override suspend fun analyzeCropImage(imageUri: String?, lang: String): DiseaseResult {
        delay(1500)
        scanCounter++
        val uriStr = (imageUri ?: "").lowercase()
        
        // If imageUri indicates non-crop, dummy object, OR if scanCounter is odd (testing non-crop object classification on camera scans)
        if (uriStr.contains("dummy") || uriStr.contains("not_crop") || uriStr.contains("non_crop") || uriStr.contains("object") || uriStr.contains("other") || scanCounter % 2 == 1) {
            return getNonPlantResult(lang)
        }

        val mockDb = getMockDatabase(lang)
        val selected = mockDb[scanCounter % mockDb.size]
        return selected.copy(
            scanId = System.currentTimeMillis().toString(),
            imageUri = imageUri,
            timestamp = System.currentTimeMillis()
        )
    }
}
