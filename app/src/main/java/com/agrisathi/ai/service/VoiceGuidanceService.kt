package com.agrisathi.ai.service

import android.content.Context
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import android.util.Log
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.util.Locale

class VoiceGuidanceService(context: Context) : TextToSpeech.OnInitListener {

    private var tts: TextToSpeech? = TextToSpeech(context.applicationContext, this)
    private var isInitialized = false

    private val _isSpeaking = MutableStateFlow(false)
    val isSpeaking: StateFlow<Boolean> = _isSpeaking.asStateFlow()

    private val _speechStatus = MutableStateFlow<String>("Voice Ready")
    val speechStatus: StateFlow<String> = _speechStatus.asStateFlow()

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            isInitialized = true
            tts?.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
                override fun onStart(utteranceId: String?) {
                    _isSpeaking.value = true
                    _speechStatus.value = "Speaking Advisory..."
                }

                override fun onDone(utteranceId: String?) {
                    _isSpeaking.value = false
                    _speechStatus.value = "Voice Ready"
                }

                @Deprecated("Deprecated in Java")
                override fun onError(utteranceId: String?) {
                    _isSpeaking.value = false
                    _speechStatus.value = "Speech Error"
                }
            })
            Log.d("VoiceGuidanceService", "TextToSpeech Initialized Successfully")
        } else {
            isInitialized = false
            _speechStatus.value = "TTS Not Available"
            Log.e("VoiceGuidanceService", "TextToSpeech Initialization Failed")
        }
    }

    fun speak(text: String, languageCode: String) {
        if (!isInitialized || tts == null) {
            _speechStatus.value = "TTS Engine Loading..."
            return
        }

        val locale = when (languageCode) {
            "mr" -> Locale("mr", "IN")
            "hi" -> Locale("hi", "IN")
            "ta" -> Locale("ta", "IN")
            else -> Locale.ENGLISH
        }

        val result = tts?.setLanguage(locale)
        if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
            // Fallback to English if native regional TTS is not downloaded on device
            Log.w("VoiceGuidanceService", "Language $languageCode not supported on device. Falling back to English.")
            tts?.setLanguage(Locale.ENGLISH)
            _speechStatus.value = "Fallback to English TTS"
        }

        val utteranceId = "AgriSathi_TTS_${System.currentTimeMillis()}"
        tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, utteranceId)
    }

    fun stop() {
        if (tts != null && _isSpeaking.value) {
            tts?.stop()
            _isSpeaking.value = false
            _speechStatus.value = "Voice Stopped"
        }
    }

    fun shutdown() {
        tts?.stop()
        tts?.shutdown()
        tts = null
        isInitialized = false
    }
}
