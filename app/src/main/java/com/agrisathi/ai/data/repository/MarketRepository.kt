package com.agrisathi.ai.data.repository

import com.agrisathi.ai.data.model.MarketPrice
import com.agrisathi.ai.data.model.TrendDirection
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

interface MarketRepository {
    fun getMarketPrices(lang: String = "en"): Flow<List<MarketPrice>>
    fun filterMarketPrices(query: String, lang: String = "en"): Flow<List<MarketPrice>>
}

class MockMarketRepositoryImpl : MarketRepository {

    private fun getLocalizedPrices(lang: String): List<MarketPrice> {
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
            MarketPrice(c("Tomato", "टोमॅटो", "टमाटर", "தக்காளி"), "Panchavati APMC", "Nashik", 2200, 2800, 2550, TrendDirection.UP),
            MarketPrice(c("Onion", "कांदा", "प्याज", "வெங்காயம்"), "Lasalgaon APMC", "Nashik", 1800, 2400, 2150, TrendDirection.UP),
            MarketPrice(c("Cotton", "कापूस", "कपास", "பருத்தி"), "Khamgaon APMC", "Buldhana", 6800, 7500, 7200, TrendDirection.STABLE),
            MarketPrice(c("Sugarcane", "ऊस", "गन्ना", "கரும்பு"), "Kolhapur APMC", "Kolhapur", 3100, 3450, 3300, TrendDirection.UP),
            MarketPrice(c("Soybean", "सोयाबीन", "सोयाबीन", "சோயாபீன்"), "Latur APMC", "Latur", 4200, 4850, 4600, TrendDirection.DOWN),
            MarketPrice(c("Wheat", "गहू", "गेहूं", "கோதுமை"), "Gultekdi APMC", "Pune", 2400, 2900, 2700, TrendDirection.STABLE),
            MarketPrice(c("Gram (Chana)", "हरभरा", "चना", "கடலை"), "Akola APMC", "Akola", 5100, 5650, 5400, TrendDirection.UP),
            MarketPrice(c("Pomegranate", "डाळिंब", "अनार", "மாதுளை"), "Solapur APMC", "Solapur", 8500, 14000, 11500, TrendDirection.UP)
        )
    }

    override fun getMarketPrices(lang: String): Flow<List<MarketPrice>> = flow {
        emit(getLocalizedPrices(lang))
    }

    override fun filterMarketPrices(query: String, lang: String): Flow<List<MarketPrice>> = flow {
        val prices = getLocalizedPrices(lang)
        if (query.isBlank()) {
            emit(prices)
        } else {
            val filtered = prices.filter {
                it.cropName.contains(query, ignoreCase = true) ||
                it.mandiName.contains(query, ignoreCase = true) ||
                it.district.contains(query, ignoreCase = true)
            }
            emit(filtered)
        }
    }
}
