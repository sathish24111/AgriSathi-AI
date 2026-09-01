import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/client';
import { DiseaseScanResult } from '../../types';
import { ArrowLeft, Share2, Bookmark, CheckCircle2, AlertTriangle, Droplets, CloudRain, Volume2, VolumeX, MessageSquare, Info, ShieldAlert } from 'lucide-react';

export const DiseaseResultScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<DiseaseScanResult | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      apiClient.getScanById(id).then(res => {
        if (res) {
          setResult(res);

          // Automatically trigger Voice AI Tool to speak diagnosis aloud!
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const textToSpeak = `${res.cropName} diagnosis: ${res.diseaseName}. ${res.explanation}. Recommended Action: ${res.organicControl ? res.organicControl.join('. ') : ''}`;
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.rate = 0.95;
            utterance.pitch = 1.0;
            utterance.onstart = () => setSpeaking(true);
            utterance.onend = () => setSpeaking(false);
            utterance.onerror = () => setSpeaking(false);

            // Short 500ms delay to allow page transition
            setTimeout(() => {
              window.speechSynthesis.speak(utterance);
              setSpeaking(true);
            }, 500);
          }
        }
      }).catch(console.error);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [id]);

  const toggleSpeech = () => {
    if (!result) return;
    if ('speechSynthesis' in window) {
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
      } else {
        const textToSpeak = `${result.cropName} diagnosis: ${result.diseaseName}. ${result.explanation}. Recommended Action: ${result.organicControl ? result.organicControl.join('. ') : ''}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.95;
        utterance.onstart = () => setSpeaking(true);
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = () => setSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setSpeaking(true);
      }
    }
  };

  if (!result) {
    return <div className="p-12 text-center text-gray-500 font-bold">Loading Crop Health Analysis...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Action Header */}
      <div className="flex justify-between items-center">
        <Link to="/scanner" className="inline-flex items-center space-x-2 text-xs font-bold text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Scan</span>
        </Link>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSpeech}
            className={`text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-2 shadow-sm transition ${
              speaking ? 'bg-amber-500 text-white animate-pulse' : 'bg-[#15803d] text-white hover:bg-[#166534]'
            }`}
          >
            {speaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            <span>{speaking ? '🔊 Speaking Advisory...' : 'Voice Advisory'}</span>
          </button>

          <button className="bg-white border border-gray-300 text-gray-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center space-x-1">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center space-x-1">
            <Bookmark className="h-4 w-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight text-left">Crop Health Analysis</h1>

      {/* Top Diagnosis Summary Bar Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold block">Crop: <strong>{result.cropName}</strong></span>
            <h2 className="text-2xl font-extrabold text-gray-900 mt-0.5">
              {result.diseaseName}
              <span className="ml-3 text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-300">
                Severity: {result.severity}
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-8 self-end sm:self-center">
          <div className="text-center">
            <span className="text-xs text-gray-400 font-semibold block">Confidence</span>
            <span className="text-3xl font-extrabold text-gray-900">{result.confidence}%</span>
          </div>

          <div className="text-center">
            <span className="text-xs text-gray-400 font-semibold block">Status</span>
            <span className={`text-sm font-extrabold ${result.confidence < 60 ? 'text-gray-600' : 'text-red-600'}`}>
              {result.confidence < 60 ? 'Low Certainty' : 'At Risk'}
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Image Card, What We Detected, Why This May Be Happening */}
        <div className="space-y-6">
          
          {/* Scanned Leaf Image */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="relative rounded-2xl overflow-hidden h-64 bg-gray-900 border">
              <img src={result.imageUrl} alt={result.cropName} className="w-full h-full object-cover" />
              
              <div className="absolute top-4 left-4 border-2 border-red-500 bg-red-500/20 rounded-lg p-2 flex items-center space-x-1">
                <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
                  {result.confidence}% Match
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-500 pt-1">
              <span>📷 Analyzed: Just now</span>
              <button className="font-bold text-[#15803d] hover:underline">View Full Image</button>
            </div>
          </div>

          {/* What We Detected Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-base flex items-center space-x-2">
              <Info className="h-5 w-5 text-[#15803d]" />
              <span>What We Detected</span>
            </h3>

            <p className="text-xs text-gray-600 leading-relaxed">
              {result.explanation}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-gray-800 block">Key Symptoms Identified:</span>
              {result.symptoms && result.symptoms.map((sym, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-gray-700">
                  <span className="text-red-500 font-bold">•</span>
                  <span>{sym}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why This May Be Happening Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-base flex items-center space-x-2">
              <CloudRain className="h-5 w-5 text-blue-600" />
              <span>Why This May Be Happening</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                <div className="flex items-center space-x-2 text-blue-700">
                  <Droplets className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase">High Humidity</span>
                </div>
                <span className="text-lg font-extrabold text-blue-900">85%</span>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                <div className="flex items-center space-x-2 text-blue-700">
                  <CloudRain className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase">Recent Weather</span>
                </div>
                <span className="text-lg font-extrabold text-blue-900">Heavy Rain</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed p-3 bg-gray-50 rounded-xl border">
              Warm temperatures combined with high moisture and leaf wetness create optimal conditions for fungal spores to germinate.
            </p>
          </div>

        </div>

        {/* Right Column: Dark Green Action Plan Card & Ask AI Assistant CTA */}
        <div className="space-y-6 flex flex-col justify-between">
          
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden space-y-0">
            
            {/* Header */}
            <div className="bg-[#14532d] text-white p-5 flex justify-between items-center">
              <h3 className="font-extrabold text-lg flex items-center space-x-2">
                <span>📋 Action Plan</span>
              </h3>
              <span className="bg-amber-400 text-gray-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                ! Immediate Action
              </span>
            </div>

            <div className="p-6 space-y-6 text-xs">
              
              {/* Step 1 */}
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-[#15803d] text-white font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-extrabold text-sm text-gray-900">Remove Affected Leaves</h4>
                    <p className="text-gray-600 mt-0.5 leading-relaxed">
                      Carefully prune and remove the lowest infected leaves to prevent spores from spreading up the plant.
                    </p>
                  </div>
                </div>

                <div className="ml-9 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-medium">
                  ⚠️ Do not compost infected leaves; burn or bag them.
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-[#15803d] text-white font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-extrabold text-sm text-gray-900">Apply Treatment</h4>
                    <p className="text-gray-600 mt-0.5 leading-relaxed">
                      Apply a recommended fungicide to protect healthy foliage. Organic options include copper-based fungicides or Bacillus subtilis.
                    </p>
                  </div>
                </div>

                <div className="ml-9 grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-green-50 border border-green-200">
                    <span className="font-bold text-gray-900 block">Copper Fungicide</span>
                    <span className="text-[10px] text-green-700 font-semibold">Organic approved</span>
                  </div>
                  <div className="p-3 rounded-xl bg-green-50 border border-green-200">
                    <span className="font-bold text-gray-900 block">Bacillus subtilis</span>
                    <span className="text-[10px] text-green-700 font-semibold">Bio-fungicide</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-[#15803d] text-white font-bold flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-extrabold text-sm text-gray-900">Improve Prevention</h4>
                    <p className="text-gray-600 mt-0.5 leading-relaxed">
                      Adjust environmental conditions for the remainder of the season to mitigate further spread:
                    </p>
                  </div>
                </div>

                <ul className="ml-9 space-y-1.5 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-[#15803d] shrink-0" />
                    <span>Water at the base using drip irrigation; avoid overhead watering.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-[#15803d] shrink-0" />
                    <span>Ensure adequate spacing between plants for airflow.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-[#15803d] shrink-0" />
                    <span>Apply organic mulch to prevent soil splashing onto leaves.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          <button
            onClick={() => navigate('/assistant')}
            className="w-full bg-[#14532d] hover:bg-[#166534] text-white font-bold py-4 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 text-sm"
          >
            <MessageSquare className="h-5 w-5" />
            <span>Ask AI Assistant About Treatments</span>
          </button>

        </div>

      </div>

    </div>
  );
};
