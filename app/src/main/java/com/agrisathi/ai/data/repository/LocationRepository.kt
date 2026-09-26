package com.agrisathi.ai.data.repository

import android.annotation.SuppressLint
import android.content.Context
import android.content.pm.PackageManager
import android.location.Geocoder
import android.os.Build
import androidx.core.content.ContextCompat
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import com.google.android.gms.tasks.CancellationTokenSource
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.withContext
import java.util.Locale

data class LocationState(
    val districtName: String = "Nashik, Maharashtra",
    val lat: Double = 20.0059,
    val lng: Double = 73.7898,
    val isPermissionGranted: Boolean = false,
    val isLocating: Boolean = false,
    val errorMessage: String? = null,
    val successMessage: String? = null
)

interface LocationRepository {
    val locationState: StateFlow<LocationState>
    fun updatePermissionState(granted: Boolean)
    fun selectFallbackDistrict(districtName: String)
    suspend fun fetchCurrentLocation(context: Context)
}

class LocationRepositoryImpl : LocationRepository {

    private val _locationState = MutableStateFlow(LocationState())
    override val locationState: StateFlow<LocationState> = _locationState.asStateFlow()

    private val fallbackDistricts = mapOf(
        "Coimbatore" to Pair(11.0168, 76.9558),
        "Chennai" to Pair(13.0827, 80.2707),
        "Madurai" to Pair(9.9252, 78.1198),
        "Salem" to Pair(11.6643, 78.1460),
        "Tiruchirappalli" to Pair(10.7905, 78.7047),
        "Thanjavur" to Pair(10.7870, 79.1378),
        "Nashik" to Pair(20.0059, 73.7898),
        "Pune" to Pair(18.5204, 73.8567),
        "Nagpur" to Pair(21.1458, 79.0882),
        "Kolhapur" to Pair(16.7050, 74.2433),
        "Solapur" to Pair(17.6599, 75.9064),
        "Chhatrapati Sambhajinagar" to Pair(19.8762, 75.3433)
    )

    override fun updatePermissionState(granted: Boolean) {
        _locationState.value = _locationState.value.copy(
            isPermissionGranted = granted,
            errorMessage = if (!granted) "Location permission denied by user." else null
        )
    }

    override fun selectFallbackDistrict(districtName: String) {
        val cityName = districtName.split(",")[0].trim()
        val coords = fallbackDistricts[cityName] ?: Pair(11.0168, 76.9558)
        val formattedName = if (districtName.contains(",")) districtName else {
            when (cityName) {
                "Coimbatore", "Chennai", "Madurai", "Salem", "Tiruchirappalli", "Thanjavur" -> "$cityName, Tamil Nadu"
                else -> "$cityName, Maharashtra"
            }
        }

        _locationState.value = _locationState.value.copy(
            districtName = formattedName,
            lat = coords.first,
            lng = coords.second,
            isLocating = false,
            errorMessage = null,
            successMessage = "Selected $formattedName manually."
        )
    }

    @SuppressLint("MissingPermission")
    override suspend fun fetchCurrentLocation(context: Context) {
        val finePerm = ContextCompat.checkSelfPermission(context, android.Manifest.permission.ACCESS_FINE_LOCATION)
        val coarsePerm = ContextCompat.checkSelfPermission(context, android.Manifest.permission.ACCESS_COARSE_LOCATION)

        if (finePerm != PackageManager.PERMISSION_GRANTED && coarsePerm != PackageManager.PERMISSION_GRANTED) {
            _locationState.value = _locationState.value.copy(
                isPermissionGranted = false,
                isLocating = false,
                errorMessage = "Location permission is required to auto-detect location."
            )
            return
        }

        val locationManager = context.getSystemService(Context.LOCATION_SERVICE) as? android.location.LocationManager
        val isGpsEnabled = locationManager?.isProviderEnabled(android.location.LocationManager.GPS_PROVIDER) ?: false
        val isNetworkEnabled = locationManager?.isProviderEnabled(android.location.LocationManager.NETWORK_PROVIDER) ?: false

        if (!isGpsEnabled && !isNetworkEnabled) {
            _locationState.value = _locationState.value.copy(
                isLocating = false,
                errorMessage = "Location/GPS is turned OFF. Please enable Location in phone settings."
            )
            return
        }

        _locationState.value = _locationState.value.copy(
            isPermissionGranted = true,
            isLocating = true,
            errorMessage = null,
            successMessage = null
        )

        try {
            val fusedClient: FusedLocationProviderClient =
                LocationServices.getFusedLocationProviderClient(context)

            val cancellationTokenSource = CancellationTokenSource()

            fusedClient.getCurrentLocation(
                Priority.PRIORITY_BALANCED_POWER_ACCURACY,
                cancellationTokenSource.token
            ).addOnSuccessListener { loc ->
                if (loc != null) {
                    processLocationResult(context, loc.latitude, loc.longitude)
                } else {
                    fusedClient.lastLocation.addOnSuccessListener { lastLoc ->
                        if (lastLoc != null) {
                            processLocationResult(context, lastLoc.latitude, lastLoc.longitude)
                        } else {
                            val sysGpsLoc = try { locationManager?.getLastKnownLocation(android.location.LocationManager.GPS_PROVIDER) } catch (e: Exception) { null }
                            val sysNetLoc = try { locationManager?.getLastKnownLocation(android.location.LocationManager.NETWORK_PROVIDER) } catch (e: Exception) { null }
                            val fallbackLoc = sysGpsLoc ?: sysNetLoc

                            if (fallbackLoc != null) {
                                processLocationResult(context, fallbackLoc.latitude, fallbackLoc.longitude)
                            } else {
                                selectFallbackDistrict("Coimbatore, Tamil Nadu")
                                _locationState.value = _locationState.value.copy(
                                    isLocating = false,
                                    errorMessage = "Unable to fetch GPS fix. Defaulted to Coimbatore, Tamil Nadu."
                                )
                            }
                        }
                    }.addOnFailureListener {
                        selectFallbackDistrict("Coimbatore, Tamil Nadu")
                        _locationState.value = _locationState.value.copy(
                            isLocating = false,
                            errorMessage = "Location provider error. Defaulted to Coimbatore, Tamil Nadu."
                        )
                    }
                }
            }.addOnFailureListener { e ->
                selectFallbackDistrict("Coimbatore, Tamil Nadu")
                _locationState.value = _locationState.value.copy(
                    isLocating = false,
                    errorMessage = "Failed to detect location: ${e.localizedMessage}"
                )
            }
        } catch (e: SecurityException) {
            _locationState.value = _locationState.value.copy(
                isPermissionGranted = false,
                isLocating = false,
                errorMessage = "SecurityException: Location permission denied."
            )
        } catch (e: Exception) {
            selectFallbackDistrict("Coimbatore, Tamil Nadu")
            _locationState.value = _locationState.value.copy(
                isLocating = false,
                errorMessage = "Location service error: ${e.localizedMessage}"
            )
        }
    }

    private fun processLocationResult(context: Context, lat: Double, lng: Double) {
        var placeName = "${String.format(Locale.US, "%.2f", lat)}, ${String.format(Locale.US, "%.2f", lng)}"
        try {
            val geocoder = Geocoder(context, Locale.getDefault())
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                geocoder.getFromLocation(lat, lng, 1) { addresses ->
                    if (!addresses.isNullOrEmpty()) {
                        val addr = addresses[0]
                        val city = addr.locality ?: addr.subAdminArea ?: addr.adminArea
                        val state = addr.adminArea
                        placeName = when {
                            !city.isNullOrBlank() && !state.isNullOrBlank() -> "$city, $state"
                            !city.isNullOrBlank() -> city
                            !state.isNullOrBlank() -> state
                            else -> "${String.format(Locale.US, "%.2f", lat)}, ${String.format(Locale.US, "%.2f", lng)}"
                        }
                    }
                    _locationState.value = _locationState.value.copy(
                        districtName = placeName,
                        lat = lat,
                        lng = lng,
                        isLocating = false,
                        successMessage = "Detected location: $placeName"
                    )
                }
                return
            } else {
                @Suppress("DEPRECATION")
                val addresses = geocoder.getFromLocation(lat, lng, 1)
                if (!addresses.isNullOrEmpty()) {
                    val addr = addresses[0]
                    val city = addr.locality ?: addr.subAdminArea ?: addr.adminArea
                    val state = addr.adminArea
                    placeName = when {
                        !city.isNullOrBlank() && !state.isNullOrBlank() -> "$city, $state"
                        !city.isNullOrBlank() -> city
                        !state.isNullOrBlank() -> state
                        else -> "${String.format(Locale.US, "%.2f", lat)}, ${String.format(Locale.US, "%.2f", lng)}"
                    }
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }

        _locationState.value = _locationState.value.copy(
            districtName = placeName,
            lat = lat,
            lng = lng,
            isLocating = false,
            successMessage = "Detected location: $placeName"
        )
    }
}
