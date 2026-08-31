import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, Sparkles, MapPin, Globe, CheckCircle2, Download, Smartphone } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8faf9] flex flex-col justify-between">
      
      {/* Landing Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-extrabold text-2xl text-[#15803d] tracking-tight">AgriSathi AI</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-gray-600">
              <Link to="/" className="text-[#15803d] font-bold">Home</Link>
              <a href="#features" className="hover:text-gray-900">Features</a>
              <a href="#how-it-works" className="hover:text-gray-900">How It Works</a>
              <a href="#about" className="hover:text-gray-900">About</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="/download/AgriSathi-AI-v1.0.apk"
              download
              className="hidden sm:flex items-center space-x-1.5 bg-green-50 text-[#15803d] border border-green-200 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-green-100 transition"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Android APK</span>
            </a>

            <div className="flex items-center space-x-1 text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full border">
              <span>EN</span>
              <Globe className="h-3.5 w-3.5" />
            </div>

            <Link to="/login" className="text-sm font-bold text-gray-700 hover:text-[#15803d] px-3 py-2">
              Login
            </Link>
            
            <Link
              to="/register"
              className="bg-[#15803d] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow hover:bg-[#166534] transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column Text Content */}
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-[#15803d] px-3.5 py-1.5 rounded-full text-xs font-bold">
              <div className="w-2 h-2 rounded-full bg-[#15803d] animate-pulse" />
              <span>Intelligent Crop Monitoring</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
              Detect Crop Problems <br />
              <span className="text-[#15803d]">Before They Spread</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              Empowering farmers with advanced AI, real-time weather data, and location intelligence. Instantly identify diseases, pests, and nutrient deficiencies to protect your yield.
            </p>

            {/* Action Buttons: Farmer Login + Download Mobile App APK */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#15803d] hover:bg-[#166534] text-white font-extrabold text-base px-8 py-4 rounded-xl shadow-lg transition duration-200 transform hover:-translate-y-0.5"
              >
                <LogIn className="h-5 w-5" />
                <span>Farmer Login</span>
              </Link>

              <a
                href="/download/AgriSathi-AI-v1.0.apk"
                download
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white border-2 border-[#15803d] text-[#15803d] hover:bg-green-50 font-extrabold text-base px-6 py-4 rounded-xl shadow-md transition duration-200"
              >
                <Download className="h-5 w-5" />
                <span>Download Android App</span>
              </a>
            </div>

            {/* Feature Pills Row */}
            <div className="pt-6 border-t border-gray-200 flex items-center space-x-6 text-xs font-bold text-gray-600">
              <div className="flex items-center space-x-1.5">
                <Sparkles className="h-4 w-4 text-[#15803d]" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <MapPin className="h-4 w-4 text-[#15803d]" />
                <span>Location Aware</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Globe className="h-4 w-4 text-[#15803d]" />
                <span>Regional Languages</span>
              </div>
            </div>
          </div>

          {/* Right Column Image Card */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-green-900 max-w-md mx-auto">
              <img
                src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
                alt="Farmer inspecting crop with AI app"
                className="w-full h-[460px] object-cover"
              />

              {/* Floating Glassmorphism Scan Result Tag */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-xl flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 shrink-0">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Wheat Crop Scanned</h4>
                  <p className="text-xs text-green-700 font-semibold">Healthy - No risks detected • Just now</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111827] text-white py-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <span className="font-extrabold text-xl text-[#22c55e]">AgriSathi AI</span>
          </div>
          <p className="text-xs text-gray-400">
            © 2026 AgriSathi AI. Empowering Indian Farmers.
          </p>
          <div className="flex space-x-6 text-xs text-gray-400">
            <a href="/download/AgriSathi-AI-v1.0.apk" download className="text-green-400 font-bold hover:underline">Download Android APK</a>
            <Link to="/login" className="hover:text-white">Privacy Policy</Link>
            <Link to="/register" className="hover:text-white">Terms of Service</Link>
            <Link to="/admin" className="hover:text-white">Contact Support</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};
