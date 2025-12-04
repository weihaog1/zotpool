import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Post } from '../types';
import { MapPin, Calendar, Clock, Car, Filter, X, Search, ChevronRight, ArrowRight } from 'lucide-react';

export const Browse: React.FC = () => {
  const { posts, isLoading } = useAppContext();
  const [filterType, setFilterType] = useState<'all' | 'driver' | 'passenger'>('all');
  const [filterCity, setFilterCity] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredPosts = posts.filter(post => {
    if (filterType !== 'all' && post.type !== filterType) return false;
    if (filterCity && !post.origin.toLowerCase().includes(filterCity.toLowerCase())) return false;
    return true;
  });

  const PostCard: React.FC<{ post: Post }> = ({ post }) => (
    <div className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1">
      {/* Card Header / Ticket Top */}
      <div className={`p-6 relative overflow-hidden ${post.type === 'driver' ? 'bg-gradient-to-br from-uci-blue to-blue-600' : 'bg-gradient-to-br from-teal-500 to-teal-600'}`}>
         {/* Abstract patterns */}
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
         
         <div className="relative z-10 flex justify-between items-start">
             <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold text-lg shadow-inner border border-white/20">
                     {post.user.name.charAt(0)}
                 </div>
                 <div className="text-white">
                     <h3 className="font-bold text-lg leading-tight">{post.user.name}</h3>
                     <p className="text-xs text-blue-50 opacity-90">{post.user.major}</p>
                 </div>
             </div>
             <div className="bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1 rounded-lg">
                 <span className="text-xs font-bold text-white uppercase tracking-wider">{post.type}</span>
             </div>
         </div>
         
         {/* Route Visual */}
         <div className="mt-6 flex items-center gap-4 text-white relative">
             <div className="flex-1">
                 <p className="text-xs text-blue-100 uppercase tracking-wider mb-1">From</p>
                 <p className="font-bold truncate">{post.origin}</p>
             </div>
             <div className="flex flex-col items-center">
                 <div className="w-16 h-0.5 bg-white/30 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
                 </div>
                 <div className="p-1 bg-white/20 rounded-full mt-[-10px] backdrop-blur-sm">
                    <ArrowRight size={12} />
                 </div>
             </div>
             <div className="flex-1 text-right">
                 <p className="text-xs text-blue-100 uppercase tracking-wider mb-1">To</p>
                 <p className="font-bold">UCI</p>
             </div>
         </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-grow flex flex-col justify-between">
          <div className="space-y-4">
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <Calendar size={18} />
                  </div>
                  <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase">Days</p>
                      <p className="text-sm font-medium text-slate-900">{post.schedule.days.join(', ')}</p>
                  </div>
              </div>
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <Clock size={18} />
                  </div>
                   <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase">Time</p>
                      <p className="text-sm font-medium text-slate-900">{post.schedule.timeStart} - {post.schedule.timeEnd}</p>
                  </div>
              </div>
              {post.details.carType && (
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                        <Car size={18} />
                    </div>
                     <div>
                        <p className="text-xs text-slate-500 font-semibold uppercase">Vehicle</p>
                        <p className="text-sm font-medium text-slate-900">{post.details.carType}</p>
                    </div>
                </div>
              )}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <button className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-uci-blue transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group-hover:gap-3">
                View Details <ChevronRight size={16} />
            </button>
          </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <div className="md:hidden mb-6">
        <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-between bg-white border border-slate-200 px-5 py-3 rounded-xl font-bold text-slate-700 shadow-sm"
        >
            <span className="flex items-center gap-2"><Filter size={18} /> Filters</span>
            <ChevronRight size={18} className={`transform transition-transform ${isFilterOpen ? 'rotate-90' : ''}`} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`w-full md:w-72 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-28 space-y-6">
            <div className="glass-panel p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-bold text-slate-900 text-lg">Filters</h3>
                    {/* Clear all button could go here */}
                </div>
                
                <div className="mb-8">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">Role Type</label>
                    <div className="space-y-3">
                        {['all', 'driver', 'passenger'].map((type) => (
                             <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${filterType === type ? 'border-uci-blue bg-uci-blue' : 'border-slate-300 bg-white'}`}>
                                    {filterType === type && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                </div>
                                <input 
                                    type="radio" 
                                    name="type" 
                                    className="hidden"
                                    checked={filterType === type} 
                                    onChange={() => setFilterType(type as any)}
                                />
                                <span className={`text-sm font-medium capitalize transition-colors ${filterType === type ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>
                                    {type === 'all' ? 'All Listings' : type + 's'}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">Search City</label>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Irvine, Anaheim..."
                            value={filterCity}
                            onChange={(e) => setFilterCity(e.target.value)}
                            className="w-full p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-uci-blue/50 transition-all"
                        />
                        <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-uci-blue transition-colors" />
                        {filterCity && (
                            <button onClick={() => setFilterCity('')} className="absolute right-3 top-3.5 text-slate-400 hover:text-red-500 transition-colors">
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="flex-grow">
          <div className="mb-8">
             <h2 className="font-display text-3xl font-bold text-slate-900">
                {filterType === 'all' ? 'All Listings' : filterType === 'driver' ? 'Available Drivers' : 'Passenger Requests'}
             </h2>
             <p className="text-slate-500 mt-2">Showing {filteredPosts.length} results</p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
                {[1,2,3,4].map(i => (
                    <div key={i} className="h-72 bg-white rounded-3xl border border-slate-100 shadow-sm animate-pulse p-6">
                        <div className="flex gap-4 mb-6">
                            <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
                            <div className="space-y-2">
                                <div className="w-32 h-4 bg-slate-200 rounded"></div>
                                <div className="w-20 h-3 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="w-full h-4 bg-slate-200 rounded"></div>
                            <div className="w-2/3 h-4 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
          )}

          {!isLoading && filteredPosts.length === 0 && (
             <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-200 border-dashed">
                 <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                    <Search size={32} />
                 </div>
                 <h3 className="font-display text-xl font-bold text-slate-900">No results found</h3>
                 <p className="text-slate-500 mt-2 text-center max-w-xs">We couldn't find any listings matching your criteria. Try different filters.</p>
                 <button onClick={() => {setFilterCity(''); setFilterType('all')}} className="mt-6 text-uci-blue font-bold hover:underline">
                     Clear Filters
                 </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};