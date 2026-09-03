import 'package:flutter_tts/flutter_tts.dart';

class VoiceService {
  static final FlutterTts _tts = FlutterTts();
  static bool isSpeaking = false;

  static Future<void> init() async {
    await _tts.setLanguage("en-IN");
    await _tts.setSpeechRate(0.5);
    await _tts.setVolume(1.0);
    await _tts.setPitch(1.0);

    _tts.setCompletionHandler(() {
      isSpeaking = false;
    });

    _tts.setErrorHandler((msg) {
      isSpeaking = false;
    });
  }

  static Future<void> speakAdvisory(String text, {String langCode = 'en'}) async {
    await stop();
    
    if (langCode == 'hi') {
      await _tts.setLanguage("hi-IN");
    } else if (langCode == 'mr') {
      await _tts.setLanguage("mr-IN");
    } else if (langCode == 'ta') {
      await _tts.setLanguage("ta-IN");
    } else {
      await _tts.setLanguage("en-IN");
    }

    isSpeaking = true;
    await _tts.speak(text);
  }

  static Future<void> stop() async {
    await _tts.stop();
    isSpeaking = false;
  }
}
