package com.agrisathi.ai.data.model

enum class RiskLevel {
    LOW, MODERATE, HIGH, SEVERE
}

enum class TrendDirection {
    UP, DOWN, STABLE
}

enum class AlertCategory {
    DISEASE, PEST, WEATHER, STAGE_REMINDER, ADVISORY
}

data class LanguageOption(
    val code: String,
    val nameNative: String,
    val nameEnglish: String,
    val flagIcon: String = "🌾"
)

data class FarmerProfile(
    val name: String = "Sambhaji Patil",
    val phone: String = "+91 98765 43210",
    val location: String = "Nashik, Maharashtra",
    val preferredLanguage: String = "mr",
    val totalLandAcres: Double = 3.5
)

data class Crop(
    val id: String,
    val name: String,
    val localName: String,
    val iconEmoji: String = "🌱"
)

data class Advisory(
    val summary: String,
    val symptoms: List<String>,
    val organicControl: List<String>,
    val recommendedPractice: List<String>,
    val safetyDisclaimer: String = "Disclaimer: Recommendations are general agronomic guidelines. Consult local KVK agricultural officers before applying chemical treatments."
)

data class DiseaseResult(
    val scanId: String = System.currentTimeMillis().toString(),
    val imageUri: String? = null,
    val cropName: String,
    val diseaseName: String,
    val confidence: Int,
    val riskLevel: RiskLevel,
    val severity: String,
    val explanation: String,
    val advisory: Advisory,
    val timestamp: Long = System.currentTimeMillis()
)

data class CropPlanInput(
    val cropName: String = "Tomato",
    val acres: Double = 2.0,
    val sowingDate: String = "15 Oct 2026",
    val district: String = "Nashik"
)

data class CropStage(
    val stageName: String,
    val durationDays: String,
    val keyActions: List<String>,
    val riskLevel: RiskLevel
)

data class FinancialEstimate(
    val estimatedCost: Double,
    val expectedYieldMin: Double,
    val expectedYieldMax: Double,
    val yieldUnit: String = "Quintals",
    val expectedRevenue: Double,
    val estimatedProfitMin: Double,
    val estimatedProfitMax: Double
)

data class CropPlanResult(
    val input: CropPlanInput,
    val stages: List<CropStage>,
    val riskPeriods: List<String>,
    val financial: FinancialEstimate,
    val weatherAdvisory: String
)

data class MarketPrice(
    val cropName: String,
    val mandiName: String,
    val district: String,
    val minPrice: Int,
    val maxPrice: Int,
    val modalPrice: Int,
    val priceTrend: TrendDirection,
    val date: String = "Today"
)

data class WeatherInfo(
    val locationName: String,
    val tempC: Int,
    val condition: String,
    val humidity: Int,
    val rainfallRisk: String,
    val cropAdvisory: String
)

data class RiskAlert(
    val id: String,
    val title: String,
    val category: AlertCategory,
    val description: String,
    val date: String,
    val severity: RiskLevel
)
