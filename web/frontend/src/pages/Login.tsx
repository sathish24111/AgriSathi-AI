import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      await login(phone);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-emerald-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <span className="text-4xl">🌾</span>
          <h2 className="text-2xl font-bold text-slate-800 mt-2">AgriSathi AI Web</h2>
          <p className="text-xs text-slate-500 mt-1">Enter your phone number to sign in or register</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number</label>
            <div className="flex rounded-xl border border-slate-300 overflow-hidden">
              <span className="bg-slate-100 px-3 py-2.5 text-sm text-slate-600 border-r border-slate-300 font-medium">+91</span>
              <input
                type="tel"
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-3 py-2.5 text-sm focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-sm transition-colors shadow-md"
          >
            Get OTP / Login
          </button>
        </form>
      </div>
    </div>
  );
};

