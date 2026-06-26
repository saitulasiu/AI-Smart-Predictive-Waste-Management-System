import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { 
  Trash2, 
  Recycle, 
  MapPin, 
  Cloud,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bins')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch bins');
        return res.json();
      })
      .then(data => {
        setBins(Array.isArray(data) ? data : []);
        setLoading(false)
      })
      .catch(err => {
        console.error(err);
        setBins([]);
        setLoading(false);
      });
  }, []);

  const stats = [
    { label: 'Total Waste Today', value: '452.8', unit: 'Tons', trend: '+12.5%', icon: Trash2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Recycling Rate', value: '64.2', unit: '%', trend: '+4.2%', icon: Recycle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Smart Bins', value: '1,248', unit: 'Units', trend: '+0%', icon: MapPin, color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'CO2 Offset', value: '12.4', unit: 'k Tons', trend: '+8.1%', icon: Cloud, color: 'text-violet-600', bg: 'bg-violet-50' },
  ];

  const barData = {
    labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'],
    datasets: [{
      label: 'Waste (Tons)',
      data: [65, 85, 45, 95, 75],
      backgroundColor: ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6'],
      borderRadius: 12,
    }]
  };

  const lineData = {
    labels: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'],
    datasets: [{
      label: 'Avg Fill Rate (%)',
      data: [30, 45, 65, 55, 85, 70],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
    }]
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-primary mb-2">System Overview</h1>
          <p className="text-gray-500 font-medium">Real-time monitoring and predictive analytics for urban waste management.</p>
        </div>
        <button className="swr-button-primary">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="swr-card group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-primary/5 rounded-xl group-hover:scale-110 transition-transform">
                <stat.icon className="text-primary" size={24} />
              </div>
              <span className="swr-badge bg-secondary/10 text-secondary">{stat.trend}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">{stat.value}</span>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.unit}</span>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="swr-card">
          <h3 className="text-xl font-bold mb-8 text-primary">Waste Generation by Zone</h3>
          <div className="h-80">
            <Bar data={{
              ...barData,
              datasets: [{
                ...barData.datasets[0],
                backgroundColor: ['#003366', '#78BE20', '#00A3E0', '#FFB81C', '#E31837'],
              }]
            }} options={{ 
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: { grid: { color: '#F1F5F9', drawBorder: false }, ticks: { color: '#94A3B8', font: { weight: 'bold' } } },
                x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { weight: 'bold' } } }
              }
            }} />
          </div>
        </div>
        <div className="swr-card">
          <h3 className="text-xl font-bold mb-8 text-primary">Real-time Fill Rate Avg</h3>
          <div className="h-80">
            <Line data={{
              ...lineData,
              datasets: [{
                ...lineData.datasets[0],
                borderColor: '#78BE20',
                backgroundColor: 'rgba(120, 190, 32, 0.1)',
              }]
            }} options={{ 
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: { grid: { color: '#F1F5F9', drawBorder: false }, ticks: { color: '#94A3B8', font: { weight: 'bold' } } },
                x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { weight: 'bold' } } }
              }
            }} />
          </div>
        </div>
      </div>

      <div className="swr-card overflow-hidden p-0">
        <div className="p-8 border-b border-border flex items-center justify-between">
          <h3 className="text-xl font-bold text-primary">Critical Bins (IoT Status)</h3>
          <button className="text-sm font-bold text-secondary hover:underline">View All Bins</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Fill Level</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Last Update</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {Array.isArray(bins) && bins.filter(b => b.fillLevel > 60).map(bin => (
                <tr key={bin._id || bin.id} className="hover:bg-muted transition-colors group">
                  <td className="px-8 py-6 font-bold text-primary">{bin.location}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-40 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            bin.fillLevel > 85 ? 'bg-red-500' : 'bg-secondary'
                          }`}
                          style={{ width: `${bin.fillLevel}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-primary">{bin.fillLevel}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-gray-500">12 mins ago</td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => alert(`Dispatching collection vehicle to ${bin.location}...`)}
                      className="px-4 py-2 bg-primary/5 text-primary text-xs font-bold rounded-lg hover:bg-primary hover:text-white transition-all"
                    >
                      Dispatch
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
