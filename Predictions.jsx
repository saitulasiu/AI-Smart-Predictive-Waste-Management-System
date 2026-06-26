import React, { useState, useEffect } from 'react';
import { TrendingUp, Brain, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Predictions() {
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModel, setActiveModel] = useState('all');

  useEffect(() => {
    fetch('/api/predictions')
      .then(res => res.json())
      .then(data => {
        setPredictionData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-96 text-indigo-600 font-bold">Analyzing data...</div>;

  const chartData = {
    labels: predictionData.labels,
    datasets: [
      {
        label: 'Actual Waste',
        data: predictionData.actual,
        borderColor: '#10b981', // Emerald
        backgroundColor: '#10b981',
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        borderWidth: 4,
        spanGaps: false, // Ensure it stops at null
        hidden: activeModel !== 'all' && activeModel !== 'actual'
      },
      {
        label: 'ARIMA Forecast',
        data: predictionData.arima,
        borderColor: '#6366f1', // Indigo
        backgroundColor: '#6366f1',
        borderDash: [8, 4],
        pointRadius: 4,
        tension: 0.4,
        spanGaps: false,
        hidden: activeModel !== 'all' && activeModel !== 'arima'
      },
      {
        label: 'LSTM Forecast',
        data: predictionData.lstm,
        borderColor: '#8b5cf6', // Violet
        backgroundColor: '#8b5cf6',
        borderDash: [8, 4],
        pointRadius: 4,
        tension: 0.4,
        spanGaps: false,
        hidden: activeModel !== 'all' && activeModel !== 'lstm'
      },
      {
        label: 'Random Forest',
        data: predictionData.randomForest,
        borderColor: '#0ea5e9', // Sky
        backgroundColor: '#0ea5e9',
        borderDash: [8, 4],
        pointRadius: 4,
        tension: 0.4,
        spanGaps: false,
        hidden: activeModel !== 'all' && activeModel !== 'randomForest'
      },
      {
        label: 'XGBoost Forecast',
        data: predictionData.xgboost,
        borderColor: '#f59e0b', // Amber
        backgroundColor: '#f59e0b',
        borderDash: [8, 4],
        pointRadius: 4,
        tension: 0.4,
        spanGaps: false,
        hidden: activeModel !== 'all' && activeModel !== 'xgboost'
      },
    ],
  };

  const handleAction = (action) => {
    alert(`Action Triggered: ${action}. Municipal resources are being notified.`);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-primary mb-2">Waste Generation Forecast</h1>
          <p className="text-gray-500 font-medium">Multi-Model AI predictive analytics for urban waste management.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => handleAction('Optimize Resources')}
            className="swr-button-primary"
          >
            Optimize Resources
          </button>
        </div>
      </div>

      <div className="swr-card p-10">
        <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
          <button onClick={() => setActiveModel('actual')} className="flex items-center gap-3 group">
            <div className="w-4 h-4 rounded-full bg-secondary" />
            <span className={`text-sm font-bold uppercase tracking-wider transition-all ${activeModel === 'actual' ? 'text-secondary scale-110' : 'text-gray-400'}`}>Actual Waste</span>
          </button>
          <button onClick={() => setActiveModel('arima')} className="flex items-center gap-3 group">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <span className={`text-sm font-bold uppercase tracking-wider transition-all ${activeModel === 'arima' ? 'text-primary scale-110' : 'text-gray-400'}`}>ARIMA</span>
          </button>
          <button onClick={() => setActiveModel('lstm')} className="flex items-center gap-3 group">
            <div className="w-4 h-4 rounded-full bg-purple-500" />
            <span className={`text-sm font-bold uppercase tracking-wider transition-all ${activeModel === 'lstm' ? 'text-purple-500 scale-110' : 'text-gray-400'}`}>LSTM</span>
          </button>
          <button onClick={() => setActiveModel('randomForest')} className="flex items-center gap-3 group">
            <div className="w-4 h-4 rounded-full bg-cyan-500" />
            <span className={`text-sm font-bold uppercase tracking-wider transition-all ${activeModel === 'randomForest' ? 'text-cyan-500 scale-110' : 'text-gray-400'}`}>Random Forest</span>
          </button>
          <button onClick={() => setActiveModel('xgboost')} className="flex items-center gap-3 group">
            <div className="w-4 h-4 rounded-full bg-orange-500" />
            <span className={`text-sm font-bold uppercase tracking-wider transition-all ${activeModel === 'xgboost' ? 'text-orange-500 scale-110' : 'text-gray-400'}`}>XGBoost</span>
          </button>
          <button onClick={() => setActiveModel('all')} className="text-xs font-bold text-gray-300 uppercase tracking-widest hover:text-primary transition-colors">
            Show All
          </button>
        </div>

        <div className="h-[500px] relative">
          <Line 
            data={{
              ...chartData,
              datasets: chartData.datasets.map(ds => ({
                ...ds,
                borderColor: ds.label === 'Actual Waste' ? '#78BE20' : ds.borderColor,
                backgroundColor: ds.label === 'Actual Waste' ? '#78BE20' : ds.backgroundColor,
              }))
            }} 
            options={{ 
              maintainAspectRatio: false,
              interaction: { mode: 'index', intersect: false },
              scales: {
                y: { 
                  beginAtZero: true, 
                  grid: { color: '#F1F5F9', drawBorder: false },
                  ticks: { callback: (value) => `${value}t`, color: '#94A3B8', font: { weight: 'bold', size: 11 } }
                },
                x: { 
                  grid: { display: false },
                  ticks: { color: '#94A3B8', font: { weight: 'bold', size: 11 } }
                }
              },
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: '#FFFFFF',
                  titleColor: '#003366',
                  bodyColor: '#1A202C',
                  borderColor: '#E2E8F0',
                  borderWidth: 1,
                  padding: 16,
                  titleFont: { size: 14, weight: 'bold' },
                  bodyFont: { size: 13 },
                  cornerRadius: 12,
                  boxPadding: 8,
                  usePointStyle: true
                }
              }
            }} 
          />
          
          {/* Vertical Indicator Line for "Today" */}
          <div className="absolute top-0 bottom-0 left-[18.18%] w-px border-l-2 border-dashed border-red-200 pointer-events-none">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg shadow-red-500/20 uppercase tracking-wider">
              CURRENT DATE (MAR 27)
            </div>
          </div>

          {/* Festival Spike Indicator */}
          <div className="absolute top-0 bottom-0 left-[81.81%] right-[0%] bg-secondary/5 border-x border-dashed border-secondary/20 pointer-events-none flex items-center justify-center">
            <div className="bg-white border border-secondary/20 text-secondary text-[10px] font-bold px-4 py-2 rounded-full whitespace-nowrap shadow-xl shadow-secondary/10 flex items-center gap-2 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              {predictionData.festival}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-primary text-white p-8 rounded-2xl shadow-xl shadow-primary/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 transition-transform group-hover:scale-150 duration-700" />
          <h4 className="text-white/60 text-xs font-bold uppercase tracking-wider mb-6">AI Recommendation</h4>
          <p className="text-2xl font-bold leading-tight mb-8">
            Due to <span className="text-secondary">{predictionData.festival}</span>, waste generation is projected to increase by <span className="text-secondary">12.5%</span>.
          </p>
          <button 
            onClick={() => handleAction('Pre-dispatch Vehicles')}
            className="w-full py-4 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-all"
          >
            Pre-dispatch Vehicles
          </button>
        </div>
        
        <div className="swr-card flex flex-col justify-between p-8">
          <div>
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-6">Model Accuracy</h4>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-6xl font-bold text-primary">{predictionData.accuracy}</span>
              <span className="text-secondary font-bold text-sm mb-3">+0.6%</span>
            </div>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">System performance is at peak efficiency. All models are synchronized.</p>
          </div>
          <button 
            onClick={() => handleAction('Retrain Models')}
            className="mt-8 w-full py-4 border border-border text-gray-500 font-bold rounded-xl hover:bg-muted transition-all"
          >
            Retrain Models
          </button>
        </div>

        <div className="swr-card flex flex-col justify-between p-8">
          <div>
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-6">System Alerts</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Overflow risk in Block A</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-secondary/5 rounded-xl border border-secondary/10">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-xs font-bold text-secondary uppercase tracking-wider">Sensor maintenance due</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => handleAction('Clear All Alerts')}
            className="mt-8 w-full py-4 border border-border text-gray-500 font-bold rounded-xl hover:bg-muted transition-all"
          >
            Clear All Alerts
          </button>
        </div>
      </div>
    </div>
  );
}
