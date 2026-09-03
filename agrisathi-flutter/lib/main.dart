import 'package:flutter/material.dart';
import 'screens/splash_screen.dart';
import 'screens/language_selection_screen.dart';
import 'screens/login_screen.dart';
import 'screens/home_dashboard_screen.dart';
import 'screens/crop_scanner_screen.dart';
import 'screens/market_prices_screen.dart';
import 'screens/ai_assistant_screen.dart';
import 'screens/profile_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const AgriSathiApp());
}

class AgriSathiApp extends StatelessWidget {
  const AgriSathiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AgriSathi AI',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF15803D),
          primary: const Color(0xFF15803D),
          secondary: const Color(0xFF166534),
          background: const Color(0xFFF8FAF9),
        ),
        scaffoldBackgroundColor: const Color(0xFFF8FAF9),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF15803D),
          foregroundColor: Colors.white,
          elevation: 0,
        ),
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const SplashScreen(),
        '/language': (context) => const LanguageSelectionScreen(),
        '/login': (context) => const LoginScreen(),
        '/dashboard': (context) => const HomeDashboardScreen(),
        '/scanner': (context) => const CropScannerScreen(),
        '/market': (context) => const MarketPricesScreen(),
        '/assistant': (context) => const AIAssistantScreen(),
        '/profile': (context) => const ProfileScreen(),
      },
    );
  }
}
