import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { PlusCircle, Search, Clock, Users, ArrowUpRight, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAppContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
            <h1 className="font-display text-4xl font-bold text-slate-900 tracking-tight">
            Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-uci-blue to-blue-400">{user?.name}</span>
            </h1>
            <p className="text-slate-500 mt-2 text-lg">Where are we heading today?</p>
        </div>
        <div className="bg-white/50 backdrop-blur-sm border border-slate-200 px-4 py-2 rounded-full text-sm font-medium text-slate-600">
            Fall Quarter 2024
        </div>
      </div>

      {/* Main Actions - Large Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Link to="/create" className="group relative h-80 rounded-[2.5rem] overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-uci-blue to-blue-700"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            {/* Decorative circles */}
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-500"></div>
            
            <div className="relative z-10 h-full p-10 flex flex-col justify-between">
                <div>
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/10">
                        <PlusCircle size={32} />
                    </div>
                    <h2 className="font-display text-4xl font-bold text-white mb-2">I have a car</h2>
                    <p className="text-blue-100 text-lg max-w-xs">Fill your empty seats and split the cost of gas & parking.</p>
                </div>
                <div className="flex items-center justify-between">
                    <span className="bg-white text-uci-blue px-6 py-3 rounded-full font-bold text-sm shadow-lg group-hover:scale-105 transition-transform">
                        Post a Ride
                    </span>
                    <ArrowUpRight className="text-white/50 w-12 h-12 group-hover:text-white group-hover:translate-x-2 group-hover:-translate-y-2 transition-all" />
                </div>
            </div>
        </Link>

        <Link to="/browse" className="group relative h-80 rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-200 bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-uci-gold/10 rounded-full blur-3xl group-hover:bg-uci-gold/20 transition-colors duration-500"></div>

            <div className="relative z-10 h-full p-10 flex flex-col justify-between">
                <div>
                    <div className="w-14 h-14 bg-uci-gold/20 rounded-2xl flex items-center justify-center text-yellow-700 mb-6">
                        <Search size={32} />
                    </div>
                    <h2 className="font-display text-4xl font-bold text-slate-900 mb-2">I need a ride</h2>
                    <p className="text-slate-500 text-lg max-w-xs">Find a driver commuting from your area to campus.</p>
                </div>
                <div className="flex items-center justify-between">
                    <span className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg group-hover:scale-105 transition-transform">
                        Find Drivers
                    </span>
                    <ArrowUpRight className="text-slate-300 w-12 h-12 group-hover:text-slate-900 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all" />
                </div>
            </div>
        </Link>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-12 gap-6">
        {/* Recent Activity - Span 8 */}
        <div className="md:col-span-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg text-uci-blue">
                        <Clock size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Recent Activity</h3>
                </div>
                <Link to="/profile" className="text-sm font-semibold text-uci-blue hover:text-blue-700">View All</Link>
            </div>
            
            <div className="space-y-4">
                {/* Empty State */}
                <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-300 mb-4 shadow-sm">
                        <Clock size={32} />
                    </div>
                    <p className="font-medium text-slate-900">No recent activity</p>
                    <p className="text-sm text-slate-500 mt-1">Your upcoming rides and matches will appear here.</p>
                </div>
            </div>
        </div>
        
        {/* Quick Stats & Tips - Span 4 */}
        <div className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex-1">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
                        <TrendingUp size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Your Stats</h3>
                </div>
                <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                        <span className="text-slate-600 font-medium">Active Posts</span>
                        <span className="font-display font-bold text-2xl text-slate-900">0</span>
                     </div>
                     <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                        <span className="text-slate-600 font-medium">Matches</span>
                        <span className="font-display font-bold text-2xl text-slate-900">0</span>
                     </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-uci-gold to-yellow-400 rounded-3xl p-8 shadow-md text-uci-dark relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="font-display font-bold text-xl mb-2 relative z-10">Pro Tip</h3>
                <p className="text-sm font-medium leading-relaxed opacity-90 relative z-10">
                    Recurring rides get 3x more matches than one-time trips. Set up a schedule!
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};