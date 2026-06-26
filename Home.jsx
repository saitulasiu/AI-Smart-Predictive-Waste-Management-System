import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recycle, Shield, ArrowRight, CheckCircle2, Globe, Truck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const [email, setEmail] = useState('karthik@gmail.com');
  const [password, setPassword] = useState('12345');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Use karthik@gmail.com / 12345');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-ink selection:bg-secondary selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary rounded-lg">
              <Recycle className="text-white" size={24} />
            </div>
            <span className="font-bold text-primary text-2xl tracking-tight">SWR Waste</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-primary/70">
            <a href="#" className="hover:text-primary transition-colors">Solutions</a>
            <a href="#" className="hover:text-primary transition-colors">Sustainability</a>
            <a href="#" className="hover:text-primary transition-colors">About Us</a>
            <button className="bg-primary text-white px-6 py-2.5 rounded-full hover:bg-primary/90 transition-all">
              Get a Quote
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-bold"
            >
              <CheckCircle2 size={16} />
              <span>Trusted by 500+ Municipalities</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-6xl md:text-7xl font-extrabold text-primary leading-[1.1] mb-6">
                Sustainable <br />
                <span className="text-secondary">Waste Solutions</span> <br />
                for a Greener Future.
              </h1>
              <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
                We provide comprehensive, technology-driven waste management services designed to maximize recycling and minimize environmental impact.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button className="swr-button-primary px-8 py-4 text-lg">
                Our Services <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 text-lg font-bold text-primary hover:bg-muted rounded-xl transition-all">
                Learn More
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-8 pt-12 border-t border-border"
            >
              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">95%</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recycling Rate</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">24/7</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Support</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">100%</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Compliance</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-primary/10 border border-border relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16" />
            
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-2">Portal Login</h2>
              <p className="text-gray-500">Access your waste management dashboard.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary/70 ml-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-muted border border-border px-5 py-4 rounded-xl focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all text-primary font-medium"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary/70 ml-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-muted border border-border px-5 py-4 rounded-xl focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all text-primary font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 text-red-600 text-sm font-medium"
                >
                  <Shield size={18} className="shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}

              <button 
                type="submit"
                className="swr-button-primary w-full py-4 text-lg shadow-xl shadow-primary/20"
              >
                Sign In to Dashboard
              </button>
            </form>

            <div className="mt-10 flex items-center justify-center gap-6 pt-8 border-t border-border">
              <div className="flex items-center gap-2 text-gray-400">
                <Truck size={16} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Fleet Active</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Globe size={16} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Global Reach</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-muted py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-12">Our Core Services</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Commercial Waste', desc: 'Tailored collection schedules for businesses of all sizes.', icon: Truck },
              { title: 'Recycling Services', desc: 'Advanced sorting and processing to maximize recovery.', icon: Recycle },
              { title: 'Hazardous Waste', desc: 'Safe and compliant disposal of specialized materials.', icon: Shield }
            ].map((service, idx) => (
              <div key={idx} className="swr-card text-left group">
                <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
