import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from './firebase';
import { User, Mail, Lock, LogIn, UserPlus } from 'lucide-react';



export default function Auth({ onAuthSuccess }: { onAuthSuccess: () => void }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar' || i18n.language === 'he';
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Sign up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (auth.currentUser) {
          await sendEmailVerification(auth.currentUser);
        }
        alert('Please check your email and verify your account before continuing.');
        // Update profile with name
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }
      onAuthSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <div style={{ padding: '2rem', marginLeft: '1rem' }}>
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#2a9df4' }}>
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: '#1e293b' }}>
            {isLogin ? t('auth.welcomeBack'): t('auth.joinBridge')}
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? t('auth.signInToContinue') : t('auth.createAccount')}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg" style={{ background: '#fee2e2' }}>
            <p className="text-sm" style={{ color: '#991b1b' }}>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name (Sign up only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1e293b' }}>
                {t('auth.fullName')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('auth.namePlaceholder')}
                  required={!isLogin}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#1e293b' }}>
              {t('auth.email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#1e293b' }}>
              {t('auth.password')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {!isLogin && (
              <p className="text-xs text-gray-500 mt-1"> {t('auth.minChars')}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: '#2a9df4' }}
          >
            {loading ? (
              t('auth.loading')
            ) : isLogin ? (
              <>
                <LogIn className="w-5 h-5" />
                {t('auth.signIn')}
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                {t('auth.createAccountBtn')}
              </>
            )}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-sm font-medium"
            style={{ color: '#2a9df4' }}
          >
            {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
          </button>
        </div>
      </div>
    </div>
  );
}
