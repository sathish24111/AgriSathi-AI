import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../api/client';
import { Sprout, User, Phone, Mail, Lock, MapPin, Globe, AlertCircle } from 'lucide-react';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: 'Sambhaji Patil',
    phone: '9876543210',
    email: 'sambhaji@agrisathi.ai',
    password: 'password123',
    state: 'Maharashtra',
    district: 'Nashik',
    preferredLanguage: 'en',
    primaryCrop: 'Tomato',
    role: 'FARMER'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await apiClient.register(formData);
      if (res.user) {
        login(res.user, res.token);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-agri-surface flex items-center justify-center p-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-green-100 rounded-2xl text-agri-primary mb-3">
            <Sprout className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Farmer Registration</h1>
          <p className="text-sm text-gray-500 mt-1">Create your shared AgriSathi account</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-agri-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-agri-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-agri-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">State</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-agri-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">District</label>
            <input
              type="text"
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-agri-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Preferred Language</label>
            <select
              value={formData.preferredLanguage}
              onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-agri-primary"
            >
              <option value="en">English (🌐)</option>
              <option value="hi">हिंदी (🇮🇳)</option>
              <option value="mr">मराठी (🚩)</option>
              <option value="ta">தமிழ் (🌾)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Primary Crop</label>
            <select
              value={formData.primaryCrop}
              onChange={(e) => setFormData({ ...formData, primaryCrop: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-agri-primary"
            >
              <option value="Tomato">Tomato</option>
              <option value="Cotton">Cotton</option>
              <option value="Paddy">Paddy / Rice</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Onion">Onion</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-agri-primary"
              />
            </div>
          </div>

          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-agri-primary text-white font-bold py-3 rounded-xl shadow hover:bg-agri-secondary transition"
            >
              {loading ? 'Creating Profile...' : 'Complete Registration'}
            </button>
          </div>

        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-600">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-agri-primary hover:underline">
            Login Here
          </Link>
        </div>

      </div>
    </div>
  );
};
