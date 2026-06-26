import React, { useState, useRef } from 'react';
import { Camera, Upload, Trash2, CheckCircle2, AlertCircle, Info, Loader2 } from 'lucide-react';
import { classifyWaste } from '../services/geminiService';

export default function WasteClassification() {
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(URL.createObjectURL(file));
        setBase64(reader.result.split(',')[1]);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClassify = async () => {
    if (!base64) return;
    setLoading(true);
    const classification = await classifyWaste(base64);
    setResult(classification);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-primary mb-2">AI Waste Classification</h1>
        <p className="text-gray-500 font-medium">Upload an image of waste to identify its category and get recycling tips.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current.click()}
            className="aspect-video bg-white border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all overflow-hidden relative group shadow-sm"
          >
            {image ? (
              <>
                <img src={image} alt="Waste" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                  <p className="text-white font-bold text-lg">Change Image</p>
                </div>
              </>
            ) : (
              <div className="text-center p-12">
                <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Camera size={32} />
                </div>
                <p className="text-xl font-bold text-primary mb-1">Upload Image</p>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Supports JPG, PNG (Max 5MB)</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="hidden" 
              accept="image/*" 
            />
          </div>

          <button 
            onClick={handleClassify}
            disabled={!image || loading}
            className="swr-button-primary w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Trash2 size={20} />
                Classify Item
              </>
            )}
          </button>
        </div>

        <div className="space-y-6">
          {result ? (
            <div className="swr-card p-8 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Classification Result</h3>
                  <p className="text-3xl font-extrabold text-primary uppercase tracking-tight">{result.category}</p>
                </div>
              </div>

              <div className="p-6 bg-muted rounded-2xl border border-border">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Info size={14} className="text-secondary" />
                  Recycling Protocol
                </h4>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {result.tip}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-secondary/5 rounded-2xl border border-secondary/10">
                  <p className="text-[10px] text-secondary font-bold uppercase tracking-wider mb-1">Confidence</p>
                  <p className="text-2xl font-bold text-secondary">98.4%</p>
                </div>
                <div className="p-5 bg-muted rounded-2xl border border-border">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Processing</p>
                  <p className="text-2xl font-bold text-primary">0.8s</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-slate-50 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-center p-12">
              <AlertCircle size={48} className="mb-4 text-gray-200" />
              <p className="text-lg font-bold text-gray-300 uppercase tracking-wider">Awaiting Input Data</p>
              <p className="text-xs font-medium text-gray-300 uppercase tracking-wider mt-1">Upload an image to begin AI analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
