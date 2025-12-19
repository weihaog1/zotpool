import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, Leaf, Users, ShieldCheck, Zap, Star, Map } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 mesh-bg opacity-100"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20 mix-blend-overlay"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-uci-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-uci-gold"></span>
              </span>
              Made for UCI Students
            </div>

            <h1 className="font-display text-6xl md:text-8xl font-black tracking-tight text-white mb-8 leading-[0.9] text-balance drop-shadow-sm animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              The smart way <br/> to <span className="text-transparent bg-clip-text bg-gradient-to-r from-uci-gold to-yellow-300">commute</span>.
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-50 mb-12 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Save cash, reduce emissions, and vibe with fellow students on your way to campus.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <Link to="/login" className="group relative bg-white text-uci-blue px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.7)] transition-all transform hover:-translate-y-1 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">Find a Ride <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} /></span>
              </Link>
              <Link to="/login" className="px-8 py-4 rounded-full font-semibold text-lg text-white border border-white/30 hover:bg-white/10 transition-all backdrop-blur-sm">
                Driver Sign Up
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Bottom Curve */}
        <div className="absolute bottom-0 w-full">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="fill-slate-50 w-full h-auto block translate-y-1">
              <path fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
           </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 bg-slate-50 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-20">
                <span className="inline-block px-4 py-1.5 bg-uci-blue/10 text-uci-blue text-sm font-bold rounded-full mb-4">Why ZotPool?</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  Commuting made <span className="text-uci-blue">simple</span>
                </h2>
                <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                  Built by Anteaters, for Anteaters. Everything you need for a better commute to campus.
                </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Save Money Card */}
              <div className="group bg-white rounded-3xl p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:border-green-200 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
                    <DollarSign size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">Save Money</h3>
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">
                      Split gas and parking costs with fellow students. Most users save <span className="font-semibold text-green-600">$400+ per quarter</span>.
                    </p>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full font-medium">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        No parking permit needed
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eco-Friendly Card */}
              <div className="group bg-white rounded-3xl p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:border-teal-200 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform">
                    <Leaf size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">Eco-Friendly</h3>
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">
                      Reduce your carbon footprint and help UCI reach its sustainability goals. Every shared ride counts.
                    </p>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full font-medium">
                        <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                        Less traffic on campus
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safe & Verified Card */}
              <div className="group bg-white rounded-3xl p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-uci-blue to-indigo-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">Safe & Verified</h3>
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">
                      Only UCI students with verified <span className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">@uci.edu</span> emails can join. Ride with people you can trust.
                    </p>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full font-medium">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Student-only community
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Card */}
              <div className="group bg-white rounded-3xl p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:border-amber-200 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                    <Users size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">Meet New People</h3>
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">
                      Turn your commute into an opportunity. Network, make friends, or just enjoy good conversation.
                    </p>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full font-medium">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        Connect with Anteaters
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-uci-blue to-blue-600 rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-uci-gold/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                    <h2 className="font-display text-4xl md:text-5xl font-black mb-6">Ready to roll?</h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        Join the new carpooling network for UC Irvine students. It takes less than 2 minutes to get set up.
                    </p>
                    <Link to="/login" className="inline-flex items-center gap-3 bg-white text-uci-blue px-10 py-5 rounded-full font-bold text-xl hover:bg-uci-gold hover:text-uci-dark transition-all transform hover:scale-105 shadow-xl">
                        <Zap size={24} fill="currentColor" /> Get Started Now
                    </Link>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};