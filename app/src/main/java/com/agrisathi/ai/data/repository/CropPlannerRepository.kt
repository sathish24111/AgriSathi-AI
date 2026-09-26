package com.agrisathi.ai.data.repository

import com.agrisathi.ai.data.model.CropPlanInput
import com.agrisathi.ai.data.model.CropPlanResult
import com.agrisathi.ai.data.model.CropStage
import com.agrisathi.ai.data.model.FinancialEstimate
import com.agrisathi.ai.data.model.RiskLevel

interface CropPlannerRepository {
    fun generateCropPlan(input: CropPlanInput, lang: String = "en"): CropPlanResult
}

class MockCropPlannerRepositoryImpl : CropPlannerRepository {

    override fun generateCropPlan(input: CropPlanInput, lang: String): CropPlanResult {
        val acres = if (input.acres <= 0) 1.0 else input.acres
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

        val estimatedCost = 35000.0 * acres
        val yieldMin = 180.0 * acres
        val yieldMax = 240.0 * acres
        val avgPricePerQuintal = 2500.0
        val expectedRevenue = ((yieldMin + yieldMax) / 2.0) * avgPricePerQuintal
        val profitMin = (yieldMin * avgPricePerQuintal) - estimatedCost
        val profitMax = (yieldMax * avgPricePerQuintal) - estimatedCost

        val stages = listOf(
            CropStage(
                stageName = c("1. Sowing & Nursery", "१. रोपवाटिका व लागवड", "1. नर्सरी एवं बुआई", "1. விதைப்பு & நாற்றங்கால்"),
                durationDays = c("Days 1 - 25", "दिवस १ ते २५", "दिन 1 से 25", "நாட்கள் 1 - 25"),
                keyActions = listOf(
                    c("Prepare bed with organic farmyard manure (FYM)", "सेंद्रिय खतासह गादीवाफे तयार करा", "जैविक खाद के साथ क्यारियां तैयार करें", "இயற்கை உரத்துடன் பாத்திகளை தயார் செய்யவும்"),
                    c("Drench root zone with Trichoderma biocontrol solution", "ट्रायकोडेमा जैविक बुरशीनाशक मुळांजवळ द्या", "ट्राइकोडर्मा जैविक कवकनाशी जड़ों में दें", "ட்ரைக்கோடெர்மா கரைசலை வேர்களில் ஊற்றவும்"),
                    c("Maintain soil moisture without waterlogging", "जमिनीत वाफसा ठेवा, पाणी साचू देऊ नका", "मिट्टी में नमी बनाए रखें, पानी रुकने न दें", "மண்ணில் ஈரப்பதத்தை பராமரிக்கவும்")
                ),
                riskLevel = RiskLevel.LOW
            ),
            CropStage(
                stageName = c("2. Vegetative Growth", "२. शाकीय वाढ", "2. वानस्पतिक वृद्धि", "2. வளர்ச்சி நிலை"),
                durationDays = c("Days 26 - 50", "दिवस २६ ते ५०", "दिन 26 से 50", "நாட்கள் 26 - 50"),
                keyActions = listOf(
                    c("Apply first split dosage of organic NPK fertilizer", "सेंद्रिय खतांचा पहिला हप्ता द्या", "जैविक खाद की पहली खुराक दें", "இயற்கை உரத்தின் முதல் தவணையை வழங்கவும்"),
                    c("Inspect leaves every 3 days for Early Blight & Whitefly", "दर ३ दिवसांनी पानांची पाहणी करा", "हर 3 दिन में पत्तियों की जांच करें", "ஒவ்வொரு 3 நாட்களுக்கும் இலைகளை ஆய்வு செய்யவும்"),
                    c("Install sticky yellow card traps", "पिवळे चिकट सापळे लावा", "पीले चिपचिपे ट्रैप लगाएं", "மஞ்சள் ஒட்டும் பொறிகளை நிறுவவும்")
                ),
                riskLevel = RiskLevel.MODERATE
            ),
            CropStage(
                stageName = c("3. Flowering & Fruiting", "३. फुलधारणा व फळधारणा", "3. फूल एवं फल आना", "3. பூக்கும் & காய்க்கும் நிலை"),
                durationDays = c("Days 51 - 85", "दिवस ५१ ते ८५", "दिन 51 से 85", "நாட்கள் 51 - 85"),
                keyActions = listOf(
                    c("Critical irrigation window - prevent soil moisture stress", "पाण्याचा ताण पडू देऊ नका, नियमित पाणी द्या", "नियमित सिंचाई करें, नमी की कमी न होने दें", "சீரான பாசனம் வழங்கவும்"),
                    c("Spray micronutrient borax solution to prevent fruit splitting", "फळे तडकणे रोखण्यासाठी बोराॅन फवारा", "फल फटने से रोकने के लिए बोरॉन का छिड़काव करें", "பழங்கள் வெடிப்பதைத் தடுக்க போரான் தெளிக்கவும்"),
                    c("Erect bamboo stakes to support heavy vine load", "झाडांना बांबूचा आधार द्या", "पौधों को बांस का सहारा दें", "செடிகளுக்கு மூங்கில் ஆதரவு வழங்கவும்")
                ),
                riskLevel = RiskLevel.HIGH
            ),
            CropStage(
                stageName = c("4. Harvesting & Grading", "४. काढणी व वर्गवारी", "4. कटाई एवं ग्रेडिंग", "4. அறுவடை நிலை"),
                durationDays = c("Days 86 - 120", "दिवस ८६ ते १२०", "दिन 86 से 120", "நாட்கள் 86 - 120"),
                keyActions = listOf(
                    c("Harvest early morning at breaker red stage for distant mandis", "सकाळी लवकर फळांची काढणी करा", "सुबह जल्दी फलों की तुड़ाई करें", "காலை வேளையில் பழங்களை அறுவடை செய்யவும்"),
                    c("Grade fruit size in shade before packing into crates", "सावलीत फळांची वर्गवारी करा", "छाया में फलों की ग्रेडिंग करें", "நிழலில் பழங்களை தரம் பிரிக்கவும்"),
                    c("Transport to nearest APMC market", "जवळच्या APMC बाजारात पाठवा", "निकटतम मंडी में भेजें", "சந்தைக்கு கொண்டு செல்லவும்")
                ),
                riskLevel = RiskLevel.LOW
            )
        )

        val riskPeriods = listOf(
            c(
                "Days 30 - 45: Peak vulnerability to Leaf Spot & Whitefly infestation during high humidity.",
                "दिवस ३० ते ४५: जास्त आर्द्रतेमुळे करपा व पांढरी माशीचा धोका जास्त राहतो.",
                "दिन 30 से 45: उच्च आर्द्रता के दौरान झुलसा और सफेद मक्खी का खतरा अधिक रहता है।",
                "நாட்கள் 30 - 45: இலைப்புள்ளி மற்றும் வெள்ளை ஈ தாக்குதல் அபாயம் அதிகம்."
            ),
            c(
                "Days 60 - 75: Fruit borer risk window. Deploy pheromone traps.",
                "दिवस ६० ते ७५: फळ पोखरणार्‍या अळीचा धोका. कामगंध सापळे लावा.",
                "दिन 60 से 75: फल छेदक सुंडी का खतरा। फेरोमोन ट्रैप लगाएं।",
                "நாட்கள் 60 - 75: காய் துளைப்பான் அபாயம்."
            )
        )

        return CropPlanResult(
            input = input,
            stages = stages,
            riskPeriods = riskPeriods,
            financial = FinancialEstimate(
                estimatedCost = estimatedCost,
                expectedYieldMin = yieldMin,
                expectedYieldMax = yieldMax,
                yieldUnit = c("Quintals", "क्विंटल", "क्विंटल", "குவிண்டால்"),
                expectedRevenue = expectedRevenue,
                estimatedProfitMin = profitMin,
                estimatedProfitMax = profitMax
            ),
            weatherAdvisory = c(
                "Based on historical weather patterns in ${input.district}, rainfall is expected in mid-growth cycle. Maintain proper ridge drainage.",
                "ऐतिहासिक हवामानानुसार ${input.district} जिल्ह्यात पावसाची शक्यता आहे. पाण्याचा निचरा योग्य ठेवा.",
                "ऐतिहासिक मौसम के अनुसार ${input.district} जिले में बारिश की संभावना है। जल निकासी सही रखें।",
                "வானிலை முன்னறிவிப்பின்படி ${input.district} மாவட்டத்தில் மழை எதிர்பார்க்கப்படுகிறது."
            )
        )
    }
}
