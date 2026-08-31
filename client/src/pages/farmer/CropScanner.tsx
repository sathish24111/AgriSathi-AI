import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { apiClient } from '../../api/client';
import { Camera, Upload, RefreshCw, Image as ImageIcon, AlertCircle } from 'lucide-react';

export const CropScanner: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const crops = [
    { name: 'Tomato', icon: '🍅' },
    { name: 'Paddy', icon: '🌾' },
    { name: 'Cotton', icon: '☁️' },
    { name: 'Potato', icon: '🥔' },
    { name: 'Wheat', icon: '🌾' },
    { name: 'Maize', icon: '🌽' }
  ];

  const handleFileSelect = (file: File) => {
    setErrorMsg(null);
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    setErrorMsg(null);

    // If no file is selected yet, prompt user to choose a file
    if (!imageFile) {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
      return;
    }

    setAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('cropName', selectedCrop);
      formData.append('location', 'Coimbatore, Tamil Nadu');

      const result = await apiClient.uploadAndScan(formData);
      if (result && result.scanId) {
        navigate(`/scanner/result/${result.scanId}`);
      } else {
        setErrorMsg('Failed to process image scan result. Please try again.');
      }
    } catch (err: any) {
      console.error('Scan Upload Error:', err);
      setErrorMsg(err.response?.data?.error || 'Error uploading image. Please select a valid photo.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-left space-y-1">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{t('scanner.title')}</h1>
      </div>

      {/* Multilingual Stepper Header */}
      <div className="flex justify-between items-center max-w-2xl mx-auto text-xs font-bold text-gray-500">
        <div className="flex items-center space-x-2 text-[#15803d]">
          <div className="w-6 h-6 rounded-full bg-[#15803d] text-white flex items-center justify-center text-xs">1</div>
          <span>{t('scanner.step1')}</span>
        </div>
        <div className="h-0.5 w-12 bg-[#15803d]" />
        <div className="flex items-center space-x-2 text-[#15803d]">
          <div className="w-6 h-6 rounded-full bg-[#15803d] text-white flex items-center justify-center text-xs">2</div>
          <span>{t('scanner.step2')}</span>
        </div>
        <div className="h-0.5 w-12 bg-gray-300" />
        <div className="flex items-center space-x-2 text-gray-400">
          <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">3</div>
          <span>{t('scanner.step3')}</span>
        </div>
        <div className="h-0.5 w-12 bg-gray-300" />
        <div className="flex items-center space-x-2 text-gray-400">
          <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">4</div>
          <span>{t('scanner.step4')}</span>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Drag & Drop Upload Container */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-lg">{t('scanner.uploadHeading')}</h3>
            <p className="text-xs text-gray-500">{t('scanner.uploadSubheading')}</p>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) handleFileSelect(e.target.files[0]);
            }}
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-10 rounded-2xl border-2 border-dashed border-gray-300 bg-[#f8faf9] hover:border-[#15803d] transition cursor-pointer text-center space-y-3"
          >
            {imagePreview ? (
              <div className="space-y-2">
                <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-xl border" />
                <span className="text-xs font-bold text-[#15803d] block">✓ Photo Selected! Click "Analyze Crop" below</span>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-green-100 text-[#15803d] flex items-center justify-center mx-auto">
                  <ImageIcon className="h-8 w-8" />
                </div>
                <span className="text-xs text-gray-500 font-medium block">{t('scanner.dragDrop')}</span>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white border border-gray-300 text-gray-800 font-bold py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center space-x-2 text-xs"
            >
              <Camera className="h-4 w-4" />
              <span>{t('scanner.takePhoto')}</span>
            </button>

            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="bg-[#15803d] hover:bg-[#166534] text-white font-bold py-3 rounded-xl shadow transition flex items-center justify-center space-x-2 text-xs"
            >
              {analyzing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              <span>{analyzing ? t('scanner.analyzing') : (imageFile ? 'Analyze Crop Health' : t('scanner.uploadBtn'))}</span>
            </button>
          </div>
        </div>

        {/* Right Column: AI Processing Simulator Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-lg">{t('scanner.simulatorTitle')}</h3>

          <div className="relative rounded-2xl overflow-hidden bg-gray-900 h-80 flex items-center justify-center shadow-inner">
            <img
              src={imagePreview || "https://images.unsplash.com/photo-1592417817098-8f3d6eb1b7a5?auto=format&fit=crop&w=600&q=80"}
              alt="AI Scanning Target"
              className="w-full h-full object-cover opacity-80"
            />

            {/* Glowing Laser Scan Beam Animation */}
            <div className="absolute inset-x-0 h-1 bg-[#22c55e] shadow-[0_0_15px_#22c55e] top-1/2 animate-pulse" />

            {/* Floating Multilingual AI Status Pills */}
            <div className="absolute space-y-2 left-6">
              <div className="bg-black/70 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/20 shadow">
                {t('scanner.simSymptoms')}
              </div>
              <div className="bg-black/70 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/20 shadow">
                {t('scanner.simVariety')}
              </div>
              <div className="bg-black/70 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/20 shadow">
                {t('scanner.simRisks')}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Manual Crop Selector Grid */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-900 text-base">{t('scanner.selectManual')}</h3>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
          {crops.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedCrop(c.name)}
              className={`p-4 rounded-xl border font-bold text-xs transition flex flex-col items-center justify-center space-y-2 ${
                selectedCrop === c.name
                  ? 'bg-[#15803d] text-white border-[#15803d] shadow'
                  : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-[#15803d]'
              }`}
            >
              <span className="text-2xl">{c.icon}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
