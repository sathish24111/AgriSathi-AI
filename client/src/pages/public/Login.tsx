import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../api/client';
import { Sprout, Phone, Lock, LogIn, AlertCircle, ArrowRight, User } from 'lucide-react';

export const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [emailOrPhone, setEmailOrPhone] = useState('9876543210');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await apiClient.login({ emailOrPhone, password });
      if (res.user) {
        login(res.user, res.token);
        navigate(res.user.role === 'ADMIN' ? '/admin' : '/location');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkipLogin = () => {
    const guestUser = {
      _id: 'guest_farmer',
      name: 'Guest Farmer',
      phone: '+91 98765 00000',
      email: 'guest@agrisathi.ai',
      role: 'FARMER' as const,
      state: 'Maharashtra',
      district: 'Nashik',
      preferredLanguage: 'en',
      primaryCrop: 'Tomato'
    };
    login(guestUser, 'guest_token');
    navigate('/location');
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-4">
      
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side: Background Field Image Container (Matching Mockup Image 2) */}
        <div className="relative hidden md:block bg-green-900">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
            alt="AgriSathi Field"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
            <h2 className="text-2xl font-extrabold">Empowering Indian Farmers</h2>
            <p className="text-xs text-green-200 mt-1 leading-relaxed">
              Access real-time crop insights, market mandis, and AI disease diagnostics.
            </p>
          </div>
        </div>

        {/* Right Side: Login / Register Form Container (Matching Mockup Image 2) */}
        <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-green-100 text-[#15803d] flex items-center justify-center mx-auto">
              <Sprout className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">AgriSathi AI</h1>
            <p className="text-xs text-gray-500">Welcome to your smart farming assistant</p>
          </div>

          {/* Toggle Tabs: Login vs Register */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 text-xs font-bold border-b-2 transition ${
                activeTab === 'login' ? 'border-[#15803d] text-[#15803d]' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className={`flex-1 py-2 text-xs font-bold border-b-2 transition ${
                activeTab === 'register' ? 'border-[#15803d] text-[#15803d]' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mobile Number or Email</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="Enter mobile or email"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-xs">
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#15803d] focus:ring-[#15803d]" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-gray-500 hover:text-[#15803d]">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#15803d] hover:bg-[#166534] text-white font-bold py-3 rounded-xl shadow transition flex items-center justify-center space-x-2 text-xs"
            >
              <span>{loading ? 'Authenticating...' : 'Login'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Social Divider & Google Button */}
          <div className="space-y-3 pt-2 text-center">
            <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider block">or continue with</span>
            
            <button
              onClick={handleSkipLogin}
              className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-2.5 rounded-xl hover:bg-gray-50 transition flex items-center justify-center space-x-2 text-xs shadow-sm"
            >
              <span className="text-red-500 font-extrabold text-sm">G</span>
              <span>Sign in with Google</span>
            </button>

            <button
              onClick={handleSkipLogin}
              className="w-full bg-green-50 border border-green-200 text-[#15803d] font-bold py-2.5 rounded-xl hover:bg-green-100 transition flex items-center justify-center space-x-2 text-xs"
            >
              <span>Explore without Login ➔</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
