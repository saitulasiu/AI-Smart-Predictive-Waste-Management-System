import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  MapPin, 
  Battery, 
  Wifi, 
  Search,
  Filter,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

const BinCard = ({ bin, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const simulateFill = () => {
    setIsUpdating(true);
    const newLevel = Math.floor(Math.random() * 100);
    fetch(`/api/bins/${bin._id || bin.id}/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fillLevel: newLevel })
    })
    .then(res => res.json())
    .then(updatedBin => {
      onUpdate(updatedBin);
      setIsUpdating(false);
    })
    .catch(err => {
      console.error(err);
      setIsUpdating(false);
    });
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="swr-card group"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-xl ${bin.fillLevel > 85 ? 'bg-red-50 text-red-500' : 'bg-primary/5 text-primary'} group-hover:scale-110 transition-transform`}>
            <Trash2 size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary mb-0.5">{bin.location}</h3>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
              <MapPin size={12} />
              ID: {String(bin._id || bin.id).slice(-8)}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="p-2 bg-muted rounded-lg text-gray-400">
            <Wifi size={14} />
          </div>
          <div className="p-2 bg-muted rounded-lg text-secondary">
            <Battery size={14} />
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
          <span>Fill Level</span>
          <span className="text-primary">{bin.fillLevel}%</span>
        </div>
        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${bin.fillLevel}%` }}
            className={`h-full rounded-full ${bin.fillLevel > 85 ? 'bg-red-500' : 'bg-secondary'} transition-all duration-1000`}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${bin.status === 'Active' ? 'bg-secondary' : 'bg-gray-300'}`} />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{bin.status}</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={simulateFill}
            disabled={isUpdating}
            className="p-3 bg-muted text-gray-500 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50"
          >
            <RefreshCw size={18} className={isUpdating ? 'animate-spin' : ''} />
          </button>
          <button 
            onClick={() => alert(`Viewing detailed IoT sensor data for ${bin.location}...`)}
            className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"
          >
            Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function SmartBins() {
  const [bins, setBins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/bins')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch bins');
        return res.json();
      })
      .then(data => setBins(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error(err);
        setBins([]);
      });
  }, []);

  const handleUpdate = (updatedBin) => {
    if (!updatedBin) return;
    setBins(bins.map(b => (b._id === updatedBin._id || b.id === updatedBin.id) ? updatedBin : b));
  };

  const filteredBins = Array.isArray(bins) ? bins.filter(b => 
    b.location.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-extrabold text-primary mb-2">Smart Bin Network</h1>
          <p className="text-gray-500 font-medium">Real-time IoT sensor data from {bins.length} connected units.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white border border-border rounded-xl outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all w-full md:w-80 text-primary font-medium"
            />
          </div>
          <button className="p-3 bg-white border border-border rounded-xl text-gray-500 hover:bg-muted transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBins.map(bin => (
          <BinCard key={bin._id || bin.id} bin={bin} onUpdate={handleUpdate} />
        ))}
      </div>

      {filteredBins.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 swr-card border-dashed">
          <div className="p-6 bg-muted rounded-full mb-6">
            <AlertCircle size={48} className="text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">No bins found</h3>
          <p className="text-gray-500 font-medium">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
