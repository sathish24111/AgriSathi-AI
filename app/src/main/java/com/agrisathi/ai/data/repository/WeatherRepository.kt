package com.agrisathi.ai.data.repository

import com.agrisathi.ai.data.model.WeatherInfo
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

interface WeatherRepository {
    fun getWeatherForLocation(district: String, lang: String = "en"): Flow<WeatherInfo>
}

class MockWeatherRepositoryImpl : WeatherRepository {
    override fun getWeatherForLocation(district: String, lang: String): Flow<WeatherInfo> = flow {
        val (conditionText, advisoryText, riskText) = when (lang) {
            "mr" -> Triple("पावसाची शक्यता (Partly Cloudy)", "हवामानात दमटपणा जास्त आहे. टोमॅटो आणि सोयाबीन पिकांवर सेंद्रिय बुरशीनाशकाची फवारणी करा.", "पावसाचा व बुरशीजन्य रोगांचा मध्यम धोका")
            "hi" -> Triple("आंशिक रूप से बादल (Partly Cloudy)", "हवा में नमी अधिक है। टमाटर और सोयाबीन की फसल पर जैविक कवकनाशी का छिड़काव करें।", "बारिश और कवक रोगों का मध्यम जोखिम")
            "ta" -> Triple("மேகமூட்டம் (Partly Cloudy)", "காற்றின் ஈரப்பதம் அதிகம். தக்காளி மற்றும் சோயாபீன் பயிர்களுக்கு இயற்கை பூஞ்சைக் கொல்லி தெளிக்கவும்.", "மழை மற்றும் பூஞ்சை நோய் அபாயம்")
            else -> Triple("Partly Cloudy", "High atmospheric moisture detected. Apply organic bio-fungicide sprays to protect tomato & soybean foliage against early blight.", "Moderate Risk of High Humidity Fungal Growth")
        }

        val weather = WeatherInfo(
            locationName = district,
            tempC = 29,
            condition = conditionText,
            humidity = 76,
            rainfallRisk = riskText,
            cropAdvisory = advisoryText
        )
        emit(weather)
    }
}
