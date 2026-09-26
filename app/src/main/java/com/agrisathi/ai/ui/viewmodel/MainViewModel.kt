package com.agrisathi.ai.ui.viewmodel

import android.app.Application
import android.net.Uri
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.agrisathi.ai.data.local.AgriSathiDatabase
import com.agrisathi.ai.data.local.ScanHistoryEntity
import com.agrisathi.ai.data.model.AlertCategory
import com.agrisathi.ai.data.model.CropPlanInput
import com.agrisathi.ai.data.model.CropPlanResult
import com.agrisathi.ai.data.model.DiseaseResult
import com.agrisathi.ai.data.model.FarmerProfile
import com.agrisathi.ai.data.model.MarketPrice
import com.agrisathi.ai.data.model.RiskAlert
import com.agrisathi.ai.data.model.RiskLevel
import com.agrisathi.ai.data.model.WeatherInfo
import com.agrisathi.ai.data.repository.CropDiseaseAnalyzer
import com.agrisathi.ai.data.repository.CropPlannerRepository
import com.agrisathi.ai.data.repository.LocationRepository
import com.agrisathi.ai.data.repository.LocationRepositoryImpl
import com.agrisathi.ai.data.repository.MarketRepository
import com.agrisathi.ai.data.repository.MockCropDiseaseAnalyzerImpl
import com.agrisathi.ai.data.repository.MockCropPlannerRepositoryImpl
import com.agrisathi.ai.data.repository.MockMarketRepositoryImpl
import com.agrisathi.ai.data.repository.MockWeatherRepositoryImpl
import com.agrisathi.ai.data.repository.PreferencesRepository
import com.agrisathi.ai.data.repository.WeatherRepository
import com.agrisathi.ai.service.VoiceGuidanceService
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class MainViewModel(application: Application) : AndroidViewModel(application) {

    // Repositories
    val preferencesRepository = PreferencesRepository(application)
    val locationRepository: LocationRepository = LocationRepositoryImpl()
    private val cropDiseaseAnalyzer: CropDiseaseAnalyzer = MockCropDiseaseAnalyzerImpl()
    private val weatherRepository: WeatherRepository = MockWeatherRepositoryImpl()
    private val marketRepository: MarketRepository = MockMarketRepositoryImpl()
    private val cropPlannerRepository: CropPlannerRepository = MockCropPlannerRepositoryImpl()

    // Room DB
    private val database = AgriSathiDatabase.getDatabase(application)
    private val scanHistoryDao = database.scanHistoryDao()

    // Voice TTS Service
    val voiceGuidanceService = VoiceGuidanceService(application)

    // UI States
    val selectedLanguage = preferencesRepository.selectedLanguage
    val farmerProfile = preferencesRepository.farmerProfile
    val locationState = locationRepository.locationState

    // Authentication Mock State
    private val _isLoggedIn = MutableStateFlow(true)
    val isLoggedIn: StateFlow<Boolean> = _isLoggedIn.asStateFlow()

    private val _mobileNumber = MutableStateFlow("9876543210")
    val mobileNumber: StateFlow<String> = _mobileNumber.asStateFlow()

    private val _otpCode = MutableStateFlow("")
    val otpCode: StateFlow<String> = _otpCode.asStateFlow()

    private val _isOtpSent = MutableStateFlow(false)
    val isOtpSent: StateFlow<Boolean> = _isOtpSent.asStateFlow()

    // Scanner & Result State
    private val _capturedImageUri = MutableStateFlow<Uri?>(null)
    val capturedImageUri: StateFlow<Uri?> = _capturedImageUri.asStateFlow()

    private val _isAnalyzing = MutableStateFlow(false)
    val isAnalyzing: StateFlow<Boolean> = _isAnalyzing.asStateFlow()

    private val _scanResult = MutableStateFlow<DiseaseResult?>(null)
    val scanResult: StateFlow<DiseaseResult?> = _scanResult.asStateFlow()

    // Crop Planner State
    private val _cropPlanInput = MutableStateFlow(CropPlanInput())
    val cropPlanInput: StateFlow<CropPlanInput> = _cropPlanInput.asStateFlow()

    private val _cropPlanResult = MutableStateFlow<CropPlanResult?>(null)
    val cropPlanResult: StateFlow<CropPlanResult?> = _cropPlanResult.asStateFlow()

    // Market Insights State
    private val _marketQuery = MutableStateFlow("")
    val marketQuery: StateFlow<String> = _marketQuery.asStateFlow()

    private val _marketPrices = MutableStateFlow<List<MarketPrice>>(emptyList())
    val marketPrices: StateFlow<List<MarketPrice>> = _marketPrices.asStateFlow()

    // Weather State
    private val _weatherInfo = MutableStateFlow<WeatherInfo?>(null)
    val weatherInfo: StateFlow<WeatherInfo?> = _weatherInfo.asStateFlow()

    // Room Scan History Flow
    val scanHistory: StateFlow<List<ScanHistoryEntity>> = scanHistoryDao.getAllScans()
        .stateIn(viewModelScope, SharingStarted.Lazily, emptyList())

    // Mock Alerts
    val alertsList: StateFlow<List<RiskAlert>> = MutableStateFlow(
        listOf(
            RiskAlert("1", "Early Blight Threat in Tomato", AlertCategory.DISEASE, "High atmospheric moisture forecast over Nashik region for next 48 hours.", "Today", RiskLevel.HIGH),
            RiskAlert("2", "Pink Bollworm Advisory for Cotton", AlertCategory.PEST, "Set up 10 Pheromone traps per acre immediately to monitor moth emergence.", "Yesterday", RiskLevel.MODERATE),
            RiskAlert("3", "Unseasonal Rainfall Warning", AlertCategory.WEATHER, "Light showers predicted across western Maharashtra districts.", "2 days ago", RiskLevel.MODERATE),
            RiskAlert("4", "Onion APMC Price Surge", AlertCategory.ADVISORY, "Lasalgaon APMC reported 12% price increase for medium quality onions.", "3 days ago", RiskLevel.LOW)
        )
    ).asStateFlow()

    init {
        fetchWeather()
        fetchMarketPrices()
        calculateCropPlan(_cropPlanInput.value)
    }

    // Language
    fun selectLanguage(langCode: String) {
        preferencesRepository.saveLanguage(langCode)
        fetchWeather()
        fetchMarketPrices()
        calculateCropPlan(_cropPlanInput.value)
    }

    // Auth
    fun updateMobileNumber(number: String) {
        _mobileNumber.value = number
    }

    fun updateOtpCode(otp: String) {
        _otpCode.value = otp
    }

    fun sendOtp() {
        if (_mobileNumber.value.length >= 10) {
            _isOtpSent.value = true
        }
    }

    fun verifyOtpAndLogin() {
        _isLoggedIn.value = true
    }

    // Location
    fun onLocationPermissionResult(granted: Boolean) {
        locationRepository.updatePermissionState(granted)
        if (granted) {
            viewModelScope.launch {
                locationRepository.fetchCurrentLocation(getApplication())
            }
        }
    }

    fun selectDistrictFallback(districtName: String) {
        locationRepository.selectFallbackDistrict(districtName)
        fetchWeather()
    }

    // Weather
    fun fetchWeather() {
        viewModelScope.launch {
            val district = locationState.value.districtName
            val lang = selectedLanguage.value
            weatherRepository.getWeatherForLocation(district, lang).collect {
                _weatherInfo.value = it
            }
        }
    }

    // Scan Flow
    fun onImageCaptured(uri: Uri?) {
        _capturedImageUri.value = uri
    }

    fun analyzeCapturedCrop() {
        viewModelScope.launch {
            _isAnalyzing.value = true
            val uriStr = _capturedImageUri.value?.toString()
            val lang = selectedLanguage.value
            val result = cropDiseaseAnalyzer.analyzeCropImage(uriStr, lang)
            _scanResult.value = result
            _isAnalyzing.value = false
            saveScanToHistory(result)
        }
    }

    private fun saveScanToHistory(result: DiseaseResult) {
        viewModelScope.launch {
            val entity = ScanHistoryEntity(
                scanId = result.scanId,
                imageUri = result.imageUri,
                cropName = result.cropName,
                diseaseName = result.diseaseName,
                confidence = result.confidence,
                riskLevel = result.riskLevel.name,
                severity = result.severity,
                explanation = result.explanation,
                summaryAdvisory = result.advisory.summary,
                timestamp = result.timestamp
            )
            scanHistoryDao.insertScan(entity)
        }
    }

    // Text to Speech
    fun playVoiceGuidance(text: String) {
        voiceGuidanceService.speak(text, selectedLanguage.value)
    }

    fun stopVoiceGuidance() {
        voiceGuidanceService.stop()
    }

    // Crop Planner
    fun updateCropPlanInput(cropName: String, acres: Double, sowingDate: String, district: String) {
        val newInput = CropPlanInput(cropName, acres, sowingDate, district)
        _cropPlanInput.value = newInput
        calculateCropPlan(newInput)
    }

    private fun calculateCropPlan(input: CropPlanInput) {
        val lang = selectedLanguage.value
        val result = cropPlannerRepository.generateCropPlan(input, lang)
        _cropPlanResult.value = result
    }

    // Market
    fun updateMarketQuery(query: String) {
        _marketQuery.value = query
        fetchMarketPrices()
    }

    private fun fetchMarketPrices() {
        viewModelScope.launch {
            val lang = selectedLanguage.value
            marketRepository.filterMarketPrices(_marketQuery.value, lang).collect {
                _marketPrices.value = it
            }
        }
    }

    // Profile update
    fun updateFarmerProfile(profile: FarmerProfile) {
        preferencesRepository.saveFarmerProfile(profile)
    }

    override fun onCleared() {
        super.onCleared()
        voiceGuidanceService.shutdown()
    }
}
