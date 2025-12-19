import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Car, User, Calendar, DollarSign, Info, ChevronDown, Check, MapPin } from 'lucide-react';
import { CostType, CarCleanliness } from '../types';
import { RouteMap } from '../components/RouteMap';

interface SelectOption {
  value: string;
  label: string;
}

const SelectField = ({ label, value, onChange, options, placeholder = "Select..." }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="space-y-2" ref={ref}>
      <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full h-[58px] p-4 pr-12 bg-slate-50 border rounded-2xl font-medium outline-none transition-all text-left flex items-center ${
            isOpen
              ? 'border-uci-blue ring-2 ring-uci-blue/20 bg-white'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className={selectedOption ? 'text-slate-900' : 'text-slate-400'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            size={20}
            className={`absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left font-medium transition-colors flex items-center justify-between ${
                  value === option.value
                    ? 'bg-uci-blue/10 text-uci-blue'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {option.label}
                {value === option.value && <Check size={18} className="text-uci-blue" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { addPost, user } = useAppContext();
  const [type, setType] = useState<'driver' | 'passenger'>('driver');

  // Form State
  const [origin, setOrigin] = useState(user?.city || '');
  const [destination, setDestination] = useState('UCI Main Campus');
  const [days, setDays] = useState<string[]>([]);
  const [timeStart, setTimeStart] = useState('08:00');
  const [timeEnd, setTimeEnd] = useState('17:00');
  const [isRecurring, setIsRecurring] = useState(true);
  
  // Driver specific
  const [carType, setCarType] = useState('');
  const [seats, setSeats] = useState(3);
  const [cleanliness, setCleanliness] = useState<CarCleanliness>(5);
  const [costType, setCostType] = useState<CostType>('split_gas');
  
  // Shared
  const [notes, setNotes] = useState('');

  const handleDayToggle = (day: string) => {
    if (days.includes(day)) {
      setDays(days.filter(d => d !== day));
    } else {
      setDays([...days, day]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost({
      type,
      origin,
      destination,
      schedule: {
        days,
        timeStart,
        timeEnd,
        isRecurring
      },
      details: {
        carType: type === 'driver' ? carType : undefined,
        seats: type === 'driver' ? seats : undefined,
        cleanliness: type === 'driver' ? cleanliness : undefined,
        costType: type === 'driver' ? costType : undefined,
        notes
      }
    });
    navigate('/browse');
  };

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        {/* Toggle Header */}
        <div className="bg-slate-50/80 backdrop-blur border-b border-slate-200 p-3 flex gap-2">
          <button
            onClick={() => setType('driver')}
            className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all duration-300 ${
              type === 'driver' 
                ? 'bg-white shadow-md text-uci-blue ring-1 ring-black/5' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
            }`}
          >
            <Car size={22} className={type === 'driver' ? 'fill-uci-blue/10' : ''} /> I'm Driving
          </button>
          <button
            onClick={() => setType('passenger')}
            className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all duration-300 ${
              type === 'passenger' 
                ? 'bg-white shadow-md text-uci-blue ring-1 ring-black/5' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
            }`}
          >
            <User size={22} className={type === 'passenger' ? 'fill-uci-blue/10' : ''} /> I Need a Ride
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-10">
          
          {/* Section: Route */}
          <div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
               <MapPin size={22} className="text-uci-gold" /> Route Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Starting Point</label>
                  <input
                    type="text"
                    required
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g. Irvine Spectrum"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-uci-blue/20 focus:border-uci-blue focus:bg-white outline-none transition-all font-medium"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Destination</label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Within UCI"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-uci-blue/20 focus:border-uci-blue focus:bg-white outline-none transition-all font-medium"
                  />
               </div>
            </div>

            {/* Route Map Preview */}
            {origin.length > 2 && (
              <div className="mt-6">
                <label className="text-sm font-bold text-slate-700 ml-1 mb-2 block">Route Preview</label>
                <RouteMap origin={origin} destination={destination} height="250px" />
              </div>
            )}
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* Section: Schedule */}
          <div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
               <Calendar size={22} className="text-uci-gold" /> Weekly Schedule
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-3 ml-1">Days</label>
                <div className="flex flex-wrap gap-3">
                  {daysOfWeek.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`w-14 h-14 rounded-2xl font-bold transition-all duration-200 text-sm ${
                        days.includes(day)
                          ? 'bg-uci-blue text-white shadow-lg shadow-blue-500/30 scale-105'
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Departure Time</label>
                    <input 
                      type="time" 
                      value={timeStart}
                      onChange={(e) => setTimeStart(e.target.value)}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-uci-blue/20 outline-none font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Return Time</label>
                    <input 
                      type="time" 
                      value={timeEnd}
                      onChange={(e) => setTimeEnd(e.target.value)}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-uci-blue/20 outline-none font-medium"
                    />
                  </div>
              </div>

              <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
                 <input 
                    type="checkbox" 
                    id="recurring" 
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="w-5 h-5 text-uci-blue rounded focus:ring-uci-blue border-slate-300"
                 />
                 <span className="text-slate-700 font-medium">Repeat this schedule weekly</span>
              </label>
            </div>
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* Section: Driver Details (Conditional) */}
          {type === 'driver' && (
            <>
              <div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Car size={22} className="text-uci-gold" /> Car & Preferences
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Car Model</label>
                        <input
                            type="text"
                            placeholder="e.g. Toyota Corolla"
                            value={carType}
                            onChange={(e) => setCarType(e.target.value)}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-uci-blue/20 focus:border-uci-blue outline-none transition-all font-medium"
                        />
                    </div>
                    <SelectField
                      label="Seats Available"
                      value={String(seats)}
                      onChange={(val) => setSeats(Number(val))}
                      options={[1,2,3,4,5,6].map(n => ({ value: String(n), label: `${n} seat${n > 1 ? 's' : ''}` }))}
                    />
                    <div className="space-y-2 md:col-span-2">
                         <label className="text-sm font-bold text-slate-700 ml-1">Cost Sharing</label>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                             {['free', 'split_gas', 'split_gas_parking', 'negotiable'].map((cType) => (
                                 <button
                                    key={cType}
                                    type="button"
                                    onClick={() => setCostType(cType as CostType)}
                                    className={`p-3 rounded-xl text-sm font-bold border transition-all ${
                                        costType === cType 
                                        ? 'bg-uci-blue text-white border-uci-blue shadow-md' 
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                    }`}
                                 >
                                    {cType === 'split_gas_parking' ? 'Gas & Parking' : cType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                 </button>
                             ))}
                         </div>
                    </div>
                </div>
              </div>
               <div className="h-px bg-slate-100"></div>
            </>
          )}

          {/* Section: Notes */}
          <div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
               <Info size={22} className="text-uci-gold" /> Additional Notes
            </h3>
            <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Talk about your music taste, specific pickup spots, or if you're okay with food/drinks..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-uci-blue/20 focus:border-uci-blue focus:bg-white outline-none transition-all font-medium"
            />
          </div>

          <div className="pt-4">
             <button
                type="submit"
                className="w-full bg-uci-blue text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 transform hover:-translate-y-1 active:translate-y-0"
             >
                Post {type === 'driver' ? 'Ride' : 'Request'}
             </button>
          </div>

        </form>
      </div>
    </div>
  );
};