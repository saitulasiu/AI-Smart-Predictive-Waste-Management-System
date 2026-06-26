import React, { useState } from 'react';
import { MapPin, Navigation, Truck, Clock, CheckCircle2, AlertTriangle, Trash2 } from 'lucide-react';

export default function RouteOptimization() {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const routes = [
    { id: 'R-101', driver: 'Arun Kumar', vehicle: 'TN-01-AB-1234', stops: 12, distance: '14.2 km', time: '45 mins', status: 'In Progress' },
    { id: 'R-102', driver: 'Suresh Raina', vehicle: 'TN-01-CD-5678', stops: 8, distance: '9.5 km', time: '30 mins', status: 'Optimized' },
    { id: 'R-103', driver: 'Vijay Sethu', vehicle: 'TN-01-EF-9012', stops: 15, distance: '18.8 km', time: '1 hr 10 mins', status: 'Pending' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-primary mb-2">Route Optimization</h1>
        <p className="text-gray-500 font-medium">AI-driven pathfinding for efficient waste collection.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 swr-card overflow-hidden min-h-[600px] relative p-0">
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
            <img 
              src="https://picsum.photos/seed/chennai-map/1200/800" 
              alt="Map" 
              className="w-full h-full object-cover opacity-20 grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/5" />
            
            {/* Mock Markers */}
            <div className="absolute top-1/4 left-1/3 p-3 bg-white rounded-full shadow-xl border-2 border-primary animate-bounce">
              <Truck size={24} className="text-primary" />
            </div>
            <div className="absolute top-1/2 left-1/2 p-2 bg-red-500 rounded-full shadow-lg border-2 border-white">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <div className="absolute bottom-1/3 right-1/4 p-2 bg-orange-500 rounded-full shadow-lg border-2 border-white">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>

            {/* Route Line Mock */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path 
                d="M 400 200 Q 500 300 600 400 T 800 500" 
                fill="none" 
                stroke="#003366" 
                strokeWidth="4" 
                strokeDasharray="12 8"
                className="animate-[dash_2s_linear_infinite] drop-shadow-lg"
              />
            </svg>
          </div>

          <div className="absolute bottom-8 left-8 right-8 swr-card bg-white/90 backdrop-blur-xl p-8 border border-white/50 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-primary/5 text-primary rounded-2xl">
                  <Navigation size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary">Optimal Route Found</h4>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Using Dijkstra's Algorithm</p>
                </div>
              </div>
              <button className="swr-button-primary">
                Dispatch
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-gray-400" />
                <span className="text-sm font-bold text-primary">32 MINS TOTAL</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-gray-400" />
                <span className="text-sm font-bold text-primary">12.4 KM</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-secondary" />
                <span className="text-sm font-bold text-primary">8 SMART BINS</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-primary px-2">Active Routes</h3>
          <div className="space-y-4">
            {routes.map(route => (
              <div 
                key={route.id}
                onClick={() => setSelectedRoute(route.id)}
                className={`p-6 swr-card transition-all cursor-pointer group ${
                  selectedRoute === route.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">{route.id}</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    route.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 
                    route.status === 'Optimized' ? 'bg-secondary/10 text-secondary' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {route.status}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-1">{route.driver}</h4>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{route.vehicle}</p>
                <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Trash2 size={14} className="text-secondary" />
                    {route.stops} Stops
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-secondary" />
                    {route.distance}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl flex gap-4">
            <AlertTriangle className="text-orange-500 shrink-0" size={20} />
            <div>
              <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">Heavy Traffic Alert</p>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">Route R-103 might be delayed by 15 mins due to road work on Anna Salai.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
