import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Phone, CheckCircle } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-agri-surface flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
        
        <div className="inline-flex p-3 bg-green-100 rounded-2xl text-agri-primary mb-3">
          <Sprout className="h-8 w-8" />
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Reset Password</h1>
        <p className="text-xs text-gray-500 mb-6">Enter your registered mobile number for OTP reset</p>

        {sent ? (
          <div className="p-4 bg-green-50 rounded-xl border border-green-200 text-green-800 text-sm">
            <CheckCircle className="h-6 w-6 text-agri-primary mx-auto mb-2" />
            <p className="font-bold">Password Reset SMS Sent!</p>
            <p className="text-xs mt-1 text-gray-600">Please check your mobile SMS inbox for reset OTP instructions.</p>
            <Link to="/login" className="mt-4 inline-block font-bold text-xs bg-agri-primary text-white px-4 py-2 rounded-lg">
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10 digit mobile number"
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-agri-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-agri-primary text-white font-bold py-3 rounded-xl shadow hover:bg-agri-secondary transition"
            >
              Send Reset Code
            </button>
          </form>
        )}

        <div className="mt-6 text-xs text-gray-500">
          Remember your password?{' '}
          <Link to="/login" className="font-bold text-agri-primary hover:underline">
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
};
