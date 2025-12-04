import React from 'react';
import { useAppContext } from '../context/AppContext';
import { User, MapPin, Hash, Mail, Award, Edit2, Calendar, Clock } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, posts } = useAppContext();

  if (!user) return null;

  const myPosts = posts.filter(p => p.userId === user.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
      <div className="relative mb-24">
         {/* Cover Image */}
         <div className="h-48 rounded-[2rem] bg-gradient-to-r from-uci-blue via-blue-600 to-indigo-600 relative overflow-hidden shadow-lg">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="absolute -bottom-24 -right-10 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
         </div>

         {/* Profile Info Overlay */}
         <div className="absolute top-24 left-0 w-full px-8">
             <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-end md:items-center gap-6 shadow-xl">
                 <div className="relative -mt-16 md:-mt-20 shrink-0">
                     <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white p-2 shadow-xl">
                        <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-slate-300 overflow-hidden relative">
                             {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                             ) : (
                                <User size={64} />
                             )}
                        </div>
                     </div>
                     <button className="absolute bottom-2 right-2 bg-slate-900 text-white p-2.5 rounded-full hover:bg-uci-blue transition-colors shadow-lg">
                         <Edit2 size={16} />
                     </button>
                 </div>
                 
                 <div className="flex-grow text-center md:text-left pb-2">
                     <h1 className="font-display text-3xl font-bold text-slate-900">{user.name}</h1>
                     <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2 text-slate-500 font-medium">
                         <span>{user.major}</span>
                         <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                         <span>{user.year}</span>
                     </div>
                 </div>

                 <div className="flex gap-3 w-full md:w-auto">
                     <div className="flex-1 md:flex-none text-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Role</div>
                         <div className="font-bold text-uci-blue capitalize">{user.role}</div>
                     </div>
                     <div className="flex-1 md:flex-none text-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Status</div>
                         <div className="font-bold text-green-600 flex items-center justify-center gap-1">
                             <span className="w-2 h-2 bg-green-500 rounded-full"></span> Active
                         </div>
                     </div>
                 </div>
             </div>
         </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-32 md:mt-24">
          {/* Sidebar Info */}
          <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="font-display font-bold text-slate-900 mb-4">About Me</h3>
                  <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-600">
                         <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-uci-blue shrink-0">
                             <Mail size={16} />
                         </div>
                         <span className="text-sm truncate">{user.email}</span>
                     </div>
                     <div className="flex items-center gap-3 text-slate-600">
                         <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-uci-blue shrink-0">
                             <MapPin size={16} />
                         </div>
                         <span className="text-sm">{user.city}</span>
                     </div>
                     <div className="flex items-center gap-3 text-slate-600">
                         <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-uci-blue shrink-0">
                             <Hash size={16} />
                         </div>
                         <span className="text-sm">{user.pronouns || 'Not specified'}</span>
                     </div>
                  </div>
              </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
              <div>
                  <h2 className="font-display text-xl font-bold text-slate-900 mb-6">Active Listings</h2>
                  <div className="space-y-4">
                    {myPosts.length > 0 ? (
                        myPosts.map(post => (
                            <div key={post.id} className="group bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${post.type === 'driver' ? 'bg-blue-100 text-uci-blue' : 'bg-green-100 text-green-700'}`}>
                                            {post.type}
                                        </span>
                                        <span className="text-slate-400 text-xs font-medium">• {new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-1">Trip from {post.origin}</h3>
                                    <div className="flex items-center gap-3 text-slate-500 text-xs font-medium">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {post.schedule.days.join(', ')}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {post.schedule.timeStart}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-slate-400 hover:text-uci-blue hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-slate-50 rounded-3xl border border-slate-200 border-dashed text-slate-500">
                            <p className="font-medium">No active listings</p>
                            <p className="text-sm mt-1">Ready to start commuting?</p>
                        </div>
                    )}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};