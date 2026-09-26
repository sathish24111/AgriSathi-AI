package com.agrisathi.ai.ui.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.agrisathi.ai.ui.components.BottomNavBar
import com.agrisathi.ai.ui.screens.AlertsScreen
import com.agrisathi.ai.ui.screens.CropHealthHistoryScreen
import com.agrisathi.ai.ui.screens.CropHealthResultScreen
import com.agrisathi.ai.ui.screens.CropPlannerScreen
import com.agrisathi.ai.ui.screens.CropScannerScreen
import com.agrisathi.ai.ui.screens.HomeDashboardScreen
import com.agrisathi.ai.ui.screens.LanguageSelectionScreen
import com.agrisathi.ai.ui.screens.LocationPermissionScreen
import com.agrisathi.ai.ui.screens.LoginRegisterScreen
import com.agrisathi.ai.ui.screens.MarketInsightsScreen
import com.agrisathi.ai.ui.screens.ProfileScreen
import com.agrisathi.ai.ui.screens.SplashScreen
import com.agrisathi.ai.ui.viewmodel.MainViewModel

@Composable
fun AgriSathiNavGraph(
    viewModel: MainViewModel,
    navController: NavHostController = rememberNavController()
) {
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route ?: "splash"
    val selectedLang by viewModel.selectedLanguage.collectAsState()

    val showBottomBar = currentRoute in listOf("home", "scanner", "planner", "market", "profile")

    Scaffold(
        bottomBar = {
            if (showBottomBar) {
                BottomNavBar(
                    selectedLanguage = selectedLang,
                    currentRoute = currentRoute,
                    onNavigate = { route ->
                        navController.navigate(route) {
                            popUpTo("home") { saveState = true }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                )
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = "splash",
            modifier = Modifier.padding(innerPadding)
        ) {
            // 1. Splash
            composable("splash") {
                SplashScreen(
                    onSplashFinished = {
                        navController.navigate("language") {
                            popUpTo("splash") { inclusive = true }
                        }
                    }
                )
            }

            // 2. Language Selection
            composable("language") {
                val languages = viewModel.preferencesRepository.getSupportedLanguages()

                LanguageSelectionScreen(
                    languages = languages,
                    selectedLanguageCode = selectedLang,
                    onLanguageSelected = { langCode -> viewModel.selectLanguage(langCode) },
                    onContinue = {
                        navController.navigate("login")
                    }
                )
            }

            // 3. Login / Register
            composable("login") {
                val mobileNumber by viewModel.mobileNumber.collectAsState()
                val otpCode by viewModel.otpCode.collectAsState()
                val isOtpSent by viewModel.isOtpSent.collectAsState()

                LoginRegisterScreen(
                    selectedLanguage = selectedLang,
                    mobileNumber = mobileNumber,
                    otpCode = otpCode,
                    isOtpSent = isOtpSent,
                    onMobileNumberChange = { viewModel.updateMobileNumber(it) },
                    onOtpChange = { viewModel.updateOtpCode(it) },
                    onSendOtp = { viewModel.sendOtp() },
                    onVerifyOtp = {
                        viewModel.verifyOtpAndLogin()
                        navController.navigate("location")
                    },
                    onSkipLogin = {
                        navController.navigate("location")
                    }
                )
            }

            // 4. Location Permission & Selection
            composable("location") {
                val locationState by viewModel.locationState.collectAsState()

                LocationPermissionScreen(
                    selectedLanguage = selectedLang,
                    locationState = locationState,
                    onRequestLocationPermission = {
                        viewModel.onLocationPermissionResult(true)
                    },
                    onSelectDistrict = { district ->
                        viewModel.selectDistrictFallback(district)
                    },
                    onContinueToHome = {
                        navController.navigate("home") {
                            popUpTo("splash") { inclusive = true }
                        }
                    }
                )
            }

            // 5. Home Dashboard
            composable("home") {
                val locationState by viewModel.locationState.collectAsState()
                val weatherInfo by viewModel.weatherInfo.collectAsState()
                val recentScans by viewModel.scanHistory.collectAsState()
                val marketPrices by viewModel.marketPrices.collectAsState()

                HomeDashboardScreen(
                    selectedLanguage = selectedLang,
                    locationName = locationState.districtName,
                    weatherInfo = weatherInfo,
                    recentScans = recentScans,
                    marketPrices = marketPrices,
                    onLocationClick = { navController.navigate("location") },
                    onNotificationClick = { navController.navigate("alerts") },
                    onNavigateToScan = { navController.navigate("scanner") },
                    onNavigateToPlanner = { navController.navigate("planner") },
                    onNavigateToMarket = { navController.navigate("market") },
                    onNavigateToHistory = { navController.navigate("history") }
                )
            }

            // 6. Crop Scanner
            composable("scanner") {
                CropScannerScreen(
                    selectedLanguage = selectedLang,
                    onImageCaptured = { uri ->
                        viewModel.onImageCaptured(uri)
                        viewModel.analyzeCapturedCrop()
                        navController.navigate("result")
                    },
                    onNavigateBack = { navController.popBackStack() }
                )
            }

            // 7. Crop Health Result
            composable("result") {
                val isAnalyzing by viewModel.isAnalyzing.collectAsState()
                val result by viewModel.scanResult.collectAsState()
                val isSpeaking by viewModel.voiceGuidanceService.isSpeaking.collectAsState()

                CropHealthResultScreen(
                    selectedLanguage = selectedLang,
                    isAnalyzing = isAnalyzing,
                    result = result,
                    isSpeaking = isSpeaking,
                    onPlayVoiceGuidance = { text -> viewModel.playVoiceGuidance(text) },
                    onStopVoiceGuidance = { viewModel.stopVoiceGuidance() },
                    onScanAgain = { navController.navigate("scanner") },
                    onNavigateBack = { navController.popBackStack() }
                )
            }

            // 8. Crop Planner
            composable("planner") {
                val currentInput by viewModel.cropPlanInput.collectAsState()
                val planResult by viewModel.cropPlanResult.collectAsState()

                CropPlannerScreen(
                    selectedLanguage = selectedLang,
                    currentInput = currentInput,
                    planResult = planResult,
                    onUpdatePlanInput = { cropName, acres, date, district ->
                        viewModel.updateCropPlanInput(cropName, acres, date, district)
                    },
                    onNavigateBack = { navController.popBackStack() }
                )
            }

            // 9. Market Insights
            composable("market") {
                val searchQuery by viewModel.marketQuery.collectAsState()
                val marketPrices by viewModel.marketPrices.collectAsState()

                MarketInsightsScreen(
                    selectedLanguage = selectedLang,
                    searchQuery = searchQuery,
                    marketPrices = marketPrices,
                    onQueryChange = { viewModel.updateMarketQuery(it) },
                    onNavigateBack = { navController.popBackStack() }
                )
            }

            // 10. Crop Health History
            composable("history") {
                val scanHistoryList by viewModel.scanHistory.collectAsState()

                CropHealthHistoryScreen(
                    selectedLanguage = selectedLang,
                    scanHistoryList = scanHistoryList,
                    onNavigateBack = { navController.popBackStack() }
                )
            }

            // 11. Alerts / Notifications
            composable("alerts") {
                val alertsList by viewModel.alertsList.collectAsState()

                AlertsScreen(
                    selectedLanguage = selectedLang,
                    alertsList = alertsList,
                    onNavigateBack = { navController.popBackStack() }
                )
            }

            // 12. Profile / Settings
            composable("profile") {
                val profile by viewModel.farmerProfile.collectAsState()

                ProfileScreen(
                    profile = profile,
                    selectedLanguage = selectedLang,
                    onNavigateToLanguage = { navController.navigate("language") },
                    onNavigateToLocation = { navController.navigate("location") },
                    onNavigateBack = { navController.popBackStack() }
                )
            }
        }
    }
}
