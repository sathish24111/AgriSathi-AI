# ProGuard & R8 configuration rules for AgriSathi AI

# Keep Kotlin reflect and coroutines
-keepattributes *Annotation*,InnerClasses,EnclosingMethod
-keepclassmembers class kotlinx.coroutines.** { *; }

# Keep Room Database classes
-keep class * extends androidx.room.RoomDatabase
-dontwarn androidx.room.paging.**

# Keep Retrofit & OkHttp
-dontwarn retrofit2.**
-keep class retrofit2.** { *; }
-keepattributes Signature
-keepattributes Exceptions
-dontwarn okhttp3.**
-dontwarn okio.**

# Keep Gson Models
-keepattributes Signature
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}
-keep class com.agrisathi.ai.data.model.** { *; }
-keep class com.agrisathi.ai.data.local.** { *; }

# Keep Coil Image Loader
-keep class coil.** { *; }

# Keep AndroidX Jetpack Compose
-keep class androidx.compose.** { *; }

