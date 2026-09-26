package com.agrisathi.ai.data.network

import com.agrisathi.ai.data.model.Crop
import com.agrisathi.ai.data.model.DiseaseResult
import com.agrisathi.ai.data.model.FarmerProfile
import com.agrisathi.ai.data.model.MarketPrice
import com.agrisathi.ai.data.model.RiskAlert
import com.agrisathi.ai.data.model.WeatherInfo
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Response
import retrofit2.http.*

data class RegisterRequest(
    val name: String,
    val mobile: String,
    val email: String,
    val password: String,
    val state: String = "Maharashtra",
    val district: String = "Nashik",
    val preferredLanguage: String = "en",
    val primaryCrop: String = "Tomato"
)

data class LoginRequest(
    val emailOrPhone: String,
    val password: String
)

data class AuthResponse(
    val message: String,
    val user: FarmerProfile,
    val token: String
)

data class MarketResponse(
    val notice: String,
    val items: List<MarketPrice>
)

interface AgriSathiApiService {

    @POST("auth/register")
    suspend fun register(@Body request: RegisterRequest): Response<AuthResponse>

    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): Response<AuthResponse>

    @GET("auth/me")
    suspend fun getCurrentUser(): Response<AuthResponse>

    @GET("crops")
    suspend fun getCrops(): Response<List<Crop>>

    @POST("crops")
    suspend fun createCrop(@Body crop: Crop): Response<Crop>

    @GET("crops/{id}")
    suspend fun getCropById(@Path("id") id: String): Response<Crop>

    @DELETE("crops/{id}")
    suspend fun deleteCrop(@Path("id") id: String): Response<Map<String, Boolean>>

    @Multipart
    @POST("scans")
    suspend fun uploadAndScan(
        @Part image: MultipartBody.Part?,
        @Part("cropName") cropName: RequestBody,
        @Part("location") location: RequestBody,
        @Part("userId") userId: RequestBody
    ): Response<DiseaseResult>

    @GET("scans")
    suspend fun getScans(): Response<List<DiseaseResult>>

    @GET("scans/{id}")
    suspend fun getScanById(@Path("id") id: String): Response<DiseaseResult>

    @GET("alerts")
    suspend fun getAlerts(): Response<List<RiskAlert>>

    @PUT("alerts/{id}/read")
    suspend fun markAlertRead(@Path("id") id: String): Response<Map<String, Boolean>>

    @GET("weather")
    suspend fun getWeather(
        @Query("lat") lat: Double?,
        @Query("lng") lng: Double?,
        @Query("district") district: String?
    ): Response<WeatherInfo>

    @GET("market")
    suspend fun getMarketPrices(): Response<MarketResponse>
}
