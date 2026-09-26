package com.agrisathi.ai.data.repository

import android.content.Context
import android.content.SharedPreferences
import com.agrisathi.ai.data.model.FarmerProfile
import com.agrisathi.ai.data.model.LanguageOption
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class PreferencesRepository(context: Context) {

    private val prefs: SharedPreferences =
        context.getSharedPreferences("agrisathi_prefs", Context.MODE_PRIVATE)

    private val _selectedLanguage = MutableStateFlow(getSavedLanguage())
    val selectedLanguage: StateFlow<String> = _selectedLanguage.asStateFlow()

    private val _farmerProfile = MutableStateFlow(getSavedFarmerProfile())
    val farmerProfile: StateFlow<FarmerProfile> = _farmerProfile.asStateFlow()

    fun getSupportedLanguages(): List<LanguageOption> {
        return listOf(
            LanguageOption("mr", "मराठी", "Marathi", "🚩"),
            LanguageOption("hi", "हिंदी", "Hindi", "🇮🇳"),
            LanguageOption("en", "English", "English", "🌐"),
            LanguageOption("ta", "தமிழ்", "Tamil", "🌾")
        )
    }

    fun saveLanguage(langCode: String) {
        prefs.edit().putString("key_language", langCode).apply()
        _selectedLanguage.value = langCode
    }

    private fun getSavedLanguage(): String {
        return prefs.getString("key_language", "mr") ?: "mr"
    }

    fun saveFarmerProfile(profile: FarmerProfile) {
        prefs.edit().apply {
            putString("key_farmer_name", profile.name)
            putString("key_farmer_phone", profile.phone)
            putString("key_farmer_location", profile.location)
            putString("key_farmer_lang", profile.preferredLanguage)
            putFloat("key_farmer_land", profile.totalLandAcres.toFloat())
            apply()
        }
        _farmerProfile.value = profile
    }

    private fun getSavedFarmerProfile(): FarmerProfile {
        val name = prefs.getString("key_farmer_name", "Sambhaji Patil") ?: "Sambhaji Patil"
        val phone = prefs.getString("key_farmer_phone", "+91 98765 43210") ?: "+91 98765 43210"
        val location = prefs.getString("key_farmer_location", "Nashik, Maharashtra") ?: "Nashik, Maharashtra"
        val lang = prefs.getString("key_farmer_lang", "mr") ?: "mr"
        val land = prefs.getFloat("key_farmer_land", 3.5f).toDouble()

        return FarmerProfile(name, phone, location, lang, land)
    }
}
