import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Check, ChevronRight, ChevronLeft, User, MapPin, Share2, Car } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAppContext();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    name: user?.name || '',
    gender: '',
    pronouns: '',
    city: '',
    major: '',
    year: '',
    instagram: '',
    discord: '',
    role: '' as 'driver' | 'passenger' | 'both',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = () => {
    updateUser({
      name: formData.name,
      gender: formData.gender,
      pronouns: formData.pronouns,
      city: formData.city,
      major: formData.major,
      year: formData.year,
      socials: {
        instagram: formData.instagram,
        discord: formData.discord,
      },
      role: formData.role,
      isOnboarded: true
    });
    navigate('/dashboard');
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-10">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-500 ${
            i <= step ? 'w-10 bg-uci-blue' : 'w-2 bg-slate-200'
          }`}
        />
      ))}
    </div>
  );

  const InputField = ({ label, ...props }: any) => (
      <div className="group">
          <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">{label}</label>
          <input 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-uci-blue/20 focus:border-uci-blue focus:bg-white transition-all"
            {...props}
          />
      </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-10"></div>
      
      <div className="max-w-xl w-full bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 md:p-12 border border-white/50 relative z-10 transition-all duration-500">
        <StepIndicator />

        <div key={step} className="animate-fade-in-up">
            {step === 1 && (
            <div className="space-y-8">
                <div className="text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-uci-blue shadow-inner rotate-3">
                    <User size={40} />
                </div>
                <h2 className="font-display text-3xl font-bold text-slate-900">Let's introduce you</h2>
                <p className="text-slate-500 text-lg mt-2">Basic info so others know who they're riding with.</p>
                </div>
                
                <div className="space-y-5">
                <InputField 
                    label="Display Name" 
                    value={formData.name}
                    onChange={(e: any) => setFormData({...formData, name: e.target.value})}
                    placeholder="Peter Anteater"
                />
                
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Gender</label>
                        <select
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-uci-blue/20 focus:border-uci-blue focus:bg-white transition-all appearance-none"
                        >
                            <option value="">Prefer not to say</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-binary">Non-binary</option>
                        </select>
                    </div>
                    <InputField 
                        label="Pronouns"
                        value={formData.pronouns}
                        onChange={(e: any) => setFormData({...formData, pronouns: e.target.value})}
                        placeholder="she/her"
                    />
                </div>
                </div>
            </div>
            )}

            {step === 2 && (
            <div className="space-y-8">
                <div className="text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-uci-blue shadow-inner -rotate-3">
                    <MapPin size={40} />
                </div>
                <h2 className="font-display text-3xl font-bold text-slate-900">Your Commute</h2>
                <p className="text-slate-500 text-lg mt-2">Where are you coming from?</p>
                </div>

                <div className="space-y-5">
                <InputField 
                    label="City / Area"
                    value={formData.city}
                    onChange={(e: any) => setFormData({...formData, city: e.target.value})}
                    placeholder="e.g. Irvine Spectrum"
                />
                
                <div className="grid grid-cols-2 gap-5">
                    <InputField 
                        label="Major"
                        value={formData.major}
                        onChange={(e: any) => setFormData({...formData, major: e.target.value})}
                    />
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Year</label>
                        <select
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-uci-blue/20 focus:border-uci-blue focus:bg-white transition-all appearance-none"
                        >
                            <option value="">Select...</option>
                            <option value="Freshman">Freshman</option>
                            <option value="Sophomore">Sophomore</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                            <option value="Grad">Grad Student</option>
                        </select>
                    </div>
                </div>
                </div>
            </div>
            )}

            {step === 3 && (
            <div className="space-y-8">
                <div className="text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-uci-blue shadow-inner rotate-6">
                    <Share2 size={40} />
                </div>
                <h2 className="font-display text-3xl font-bold text-slate-900">Get Connected</h2>
                <p className="text-slate-500 text-lg mt-2">Optional ways for matches to reach you.</p>
                </div>

                <div className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Instagram</label>
                    <div className="relative">
                        <span className="absolute left-4 top-4 text-slate-400 font-medium">@</span>
                        <input
                        type="text"
                        value={formData.instagram}
                        onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                        className="w-full p-4 pl-9 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-uci-blue/20 focus:border-uci-blue focus:bg-white transition-all"
                        />
                    </div>
                </div>
                <InputField 
                    label="Discord Username"
                    value={formData.discord}
                    onChange={(e: any) => setFormData({...formData, discord: e.target.value})}
                />
                </div>
            </div>
            )}

            {step === 4 && (
            <div className="space-y-8">
                <div className="text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-uci-blue shadow-inner">
                    <Car size={40} />
                </div>
                <h2 className="font-display text-3xl font-bold text-slate-900">How will you participate?</h2>
                <p className="text-slate-500 text-lg mt-2">This helps us customize your feed.</p>
                </div>

                <div className="grid gap-4">
                    {[
                        { id: 'driver', label: 'I am a Driver', desc: 'I have a car and want to fill empty seats.' },
                        { id: 'passenger', label: 'I need a Ride', desc: 'I want to find a driver to commute with.' },
                        { id: 'both', label: 'Both', desc: 'I can drive sometimes, but might need rides too.' },
                    ].map((option) => (
                        <button
                            key={option.id}
                            onClick={() => setFormData({...formData, role: option.id as any})}
                            className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden group ${
                                formData.role === option.id 
                                ? 'border-uci-blue bg-blue-50/50 shadow-inner' 
                                : 'border-slate-100 hover:border-uci-blue/30 hover:bg-slate-50'
                            }`}
                        >
                            <div className="relative z-10 flex justify-between items-center">
                                <div>
                                    <div className={`font-bold text-lg ${formData.role === option.id ? 'text-uci-blue' : 'text-slate-900'}`}>{option.label}</div>
                                    <div className="text-sm text-slate-500 mt-1">{option.desc}</div>
                                </div>
                                {formData.role === option.id && (
                                    <div className="w-6 h-6 bg-uci-blue rounded-full flex items-center justify-center text-white">
                                        <Check size={14} />
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            )}
        </div>

        <div className="flex justify-between mt-12 pt-6 border-t border-slate-100">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors ${
                step === 1 ? 'invisible' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ChevronLeft size={20} /> Back
          </button>
          <button
            onClick={handleNext}
            disabled={step === 4 && !formData.role} 
            className="bg-uci-blue text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none hover:translate-x-1"
          >
            {step === totalSteps ? 'Finish Profile' : 'Next Step'}
            {step !== totalSteps && <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};