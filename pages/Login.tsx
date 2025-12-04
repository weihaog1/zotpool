import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Mail, AlertCircle, Loader2, Car } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const success = await login(email);
      if (success) {
        navigate('/onboarding');
      } else {
        setError('Please use a valid @uci.edu email address.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg opacity-20"></div>
      
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="glass-panel p-8 md:p-10 rounded-3xl shadow-2xl">
            <div className="text-center mb-8">
            <div className="w-16 h-16 bg-uci-blue text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                <Car size={32} />
            </div>
            <h2 className="font-display text-3xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-slate-500 mt-2">Enter your credentials to access ZotPool</p>
            </div>

            {/* Fake Google Button */}
            <button className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-bold py-3.5 px-4 rounded-xl hover:bg-slate-50 transition-all hover:shadow-md mb-6 group">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
                />
                <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
                />
                <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
                />
                <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
                />
            </svg>
            Continue with Google
            </button>

            <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wide font-bold">
                <span className="px-4 bg-white/50 backdrop-blur-md text-slate-400 rounded-full">Or with email</span>
            </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">
                UCI Email Address
                </label>
                <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-uci-blue transition-colors" />
                </div>
                <input
                    type="email"
                    id="email"
                    required
                    className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-uci-blue/10 focus:border-uci-blue outline-none transition-all bg-slate-50 focus:bg-white font-medium"
                    placeholder="peter@uci.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                {error && (
                <div className="mt-3 flex items-center p-3 text-sm text-red-600 bg-red-50 rounded-xl gap-2 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={16} className="shrink-0" />
                    {error}
                </div>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-uci-blue text-white py-3.5 px-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center transform active:scale-95"
            >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Send Magic Link"}
            </button>
            <p className="mt-4 text-center text-xs text-slate-500 font-medium">
                Protected by reCAPTCHA and subject to the Privacy Policy.
            </p>
            </form>
        </div>
      </div>
    </div>
  );
};