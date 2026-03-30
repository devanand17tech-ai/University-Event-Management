import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, ShieldCheck, Zap, ArrowRight, Star } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent_40%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 text-left mb-12 md:mb-0">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6 tracking-wide uppercase">
              <Sparkles className="h-4 w-4" />
              <span>Campus Management Reimagined</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
              Connect. Engage.<br />
              <span className="text-blue-600">Forge Your Future.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
              The ultimate platform for university students to discover, register, and manage campus events with zero friction.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/events" className="btn-primary px-8 py-4 text-lg w-full sm:w-auto">
                Discover Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/register" className="btn-secondary px-8 py-4 text-lg w-full sm:w-auto">
                Join Community
              </Link>
            </div>
            
            <div className="mt-12 flex items-center space-x-6 grayscale opacity-60">
                <div className="flex items-center space-x-1 font-bold text-slate-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span>Trusted by 50+ Campus Organizations</span>
                </div>
            </div>
          </div>
          
          <div className="md:w-5/12">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600/20 to-blue-400/20 rounded-3xl blur-2xl -z-10" />
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 transform hover:-translate-y-2 transition-transform duration-500">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Tech Symposium 2026</h4>
                    <p className="text-xs text-slate-500 font-medium">Main Auditorium • 10:00 AM</p>
                  </div>
                </div>
                <div className="space-y-3 px-2">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-3/4 rounded-full" />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>75% Registered</span>
                        <span>12 Seats Left</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Complete Campus Solution</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Everything you need to stay active in your university community.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">One-Tap Registration</h3>
              <p className="text-slate-600 leading-relaxed">Register for events in seconds with your student profile. No repetitive forms.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Secure & Validated</h3>
              <p className="text-slate-600 leading-relaxed">Verified registrations ensure only valid university members can participate in events.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Centralized Calendar</h3>
              <p className="text-slate-600 leading-relaxed">View all university events from every department in one clean, unified view.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
