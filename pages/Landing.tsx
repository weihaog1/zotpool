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
        
        {/* Floating shapes */}
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 animate-float hidden lg:block"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-uci-gold/20 backdrop-blur-md rounded-full border border-white/10 animate-float-delayed hidden lg:block"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-uci-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-uci-gold"></span>
              </span>
              Trusted by 2,000+ Anteaters
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

      {/* Bento Grid Section */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">Why choose ZotPool?</h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">We've built a platform specifically for the unique needs of the UCI commuter community.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[600px]">
                {/* Card 1: Save Money (Large) */}
                <div className="col-span-1 md:col-span-2 row-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-green-100 transition-colors"></div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                            <DollarSign size={36} />
                        </div>
                        <div>
                            <h3 className="font-display text-3xl font-bold text-slate-900 mb-4">Cut Commute Costs by 50%</h3>
                            <p className="text-slate-500 text-lg leading-relaxed mb-8">
                                Gas prices in SoCal are no joke. Neither are UCI parking permits. Sharing the ride means splitting the bill, putting hundreds back in your pocket every quarter.
                            </p>
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center gap-4">
                                <div className="text-sm font-medium text-slate-500">Average Savings</div>
                                <div className="h-2 flex-grow bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[80%]"></div>
                                </div>
                                <div className="font-bold text-green-600">$450/qtr</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2: Environment */}
                <div className="col-span-1 md:col-span-1 bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-8 shadow-lg text-white relative overflow-hidden group hover:-translate-y-1 transition-transform">
                     <Leaf className="absolute bottom-[-20px] right-[-20px] w-32 h-32 text-white/10 rotate-12" />
                     <div className="relative z-10">
                        <Leaf size={32} className="mb-4 text-teal-100" />
                        <h3 className="font-display text-xl font-bold mb-2">Eco-Friendly</h3>
                        <p className="text-teal-100 text-sm">Help UCI reach carbon neutrality. One less car makes a difference.</p>
                     </div>
                </div>

                {/* Card 3: Safety */}
                <div className="col-span-1 md:col-span-1 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 group hover:border-uci-blue/30 transition-colors">
                     <ShieldCheck size={32} className="mb-4 text-uci-blue" />
                     <h3 className="font-display text-xl font-bold text-slate-900 mb-2">Verified Students</h3>
                     <p className="text-slate-500 text-sm">Only @uci.edu emails allowed. Safe, student-only community.</p>
                </div>

                {/* Card 4: Community (Wide) */}
                <div className="col-span-1 md:col-span-2 bg-uci-dark text-white rounded-3xl p-8 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="flex-1 relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                             <Users className="text-uci-gold" size={28} />
                             <h3 className="font-display text-2xl font-bold">Community First</h3>
                        </div>
                        <p className="text-slate-300">
                            Turn a lonely 405 drive into a networking session, a study group, or just a chill hang.
                        </p>
                    </div>
                    <div className="flex -space-x-4">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="w-12 h-12 rounded-full border-2 border-uci-dark bg-slate-700 flex items-center justify-center text-xs font-bold">
                                U{i}
                            </div>
                        ))}
                        <div className="w-12 h-12 rounded-full border-2 border-uci-dark bg-uci-gold text-uci-dark flex items-center justify-center font-bold text-xs">
                            +2k
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
                        Join the fastest growing carpooling network at UC Irvine. It takes less than 2 minutes to get set up.
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