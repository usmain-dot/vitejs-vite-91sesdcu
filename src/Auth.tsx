import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebase';
import { User, Mail, Lock, LogIn, UserPlus } from 'lucide-react';

type LanguageCode = 'en' | 'es' | 'ar' | 'he' | 'sw';

const authTranslations: Record<LanguageCode, any> = {
  en: {
    welcomeBack: 'Welcome Back',
    joinBridge: 'Join Bridge',
    signInToContinue: 'Sign in to continue',
    createAccount: 'Create your account',
    fullName: 'Full Name',
    namePlaceholder: 'John Doe',
    email: 'Email',
    password: 'Password',
    minChars: 'At least 6 characters',
    loading: 'Loading...',
    signIn: 'Sign In',
    createAccountBtn: 'Create Account',
    noAccount: "Don't have an account? Sign up",
    hasAccount: 'Already have an account? Sign in',
  },
  es: {
    welcomeBack: 'Bienvenido de nuevo',
    joinBridge: 'Únete a Bridge',
    signInToContinue: 'Inicia sesión para continuar',
    createAccount: 'Crea tu cuenta',
    fullName: 'Nombre completo',
    namePlaceholder: 'Juan Pérez',
    email: 'Correo electrónico',
    password: 'Contraseña',
    minChars: 'Al menos 6 caracteres',
    loading: 'Cargando...',
    signIn: 'Iniciar sesión',
    createAccountBtn: 'Crear cuenta',
    noAccount: '¿No tienes cuenta? Regístrate',
    hasAccount: '¿Ya tienes cuenta? Inicia sesión',
  },
  ar: {
    welcomeBack: 'مرحباً بعودتك',
    joinBridge: 'انضم إلى Bridge',
    signInToContinue: 'سجّل الدخول للمتابعة',
    createAccount: 'أنشئ حسابك',
    fullName: 'الاسم الكامل',
    namePlaceholder: 'محمد أحمد',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    minChars: '٦ أحرف على الأقل',
    loading: 'جارٍ التحميل...',
    signIn: 'تسجيل الدخول',
    createAccountBtn: 'إنشاء حساب',
    noAccount: 'ليس لديك حساب؟ سجّل الآن',
    hasAccount: 'لديك حساب بالفعل؟ سجّل الدخول',
  },
  he: {
    welcomeBack: 'ברוך שובך',
    joinBridge: 'הצטרף ל-Bridge',
    signInToContinue: 'התחבר כדי להמשיך',
    createAccount: 'צור את החשבון שלך',
    fullName: 'שם מלא',
    namePlaceholder: 'ישראל ישראלי',
    email: 'אימייל',
    password: 'סיסמה',
    minChars: 'לפחות 6 תווים',
    loading: 'טוען...',
    signIn: 'התחבר',
    createAccountBtn: 'צור חשבון',
    noAccount: 'אין לך חשבון? הירשם',
    hasAccount: 'כבר יש לך חשבון? התחבר',
  },
  sw: {
    welcomeBack: 'Karibu Tena',
    joinBridge: 'Jiunge na Bridge',
    signInToContinue: 'Ingia ili uendelee',
    createAccount: 'Fungua akaunti yako',
    fullName: 'Jina Kamili',
    namePlaceholder: 'Juma Mwangi',
    email: 'Barua pepe',
    password: 'Nywila',
    minChars: 'Angalau herufi 6',
    loading: 'Inapakia...',
    signIn: 'Ingia',
    createAccountBtn: 'Fungua Akaunti',
    noAccount: 'Huna akaunti? Jisajili',
    hasAccount: 'Una akaunti? Ingia',
  },
};

interface AuthProps {
  onAuthSuccess: () => void;
  language?: LanguageCode;
}

export default function Auth({ onAuthSuccess, language = 'en' }: AuthProps) {
  const a = authTranslations[language];
  const isRTL = language === 'ar' || language === 'he';
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
            {isLogin ? a.welcomeBack : a.joinBridge}
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? a.signInToContinue : a.createAccount}
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
                {a.fullName}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={a.namePlaceholder}
                  required={!isLogin}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#1e293b' }}>
              {a.email}
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
              {a.password}
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
              <p className="text-xs text-gray-500 mt-1">{a.minChars}</p>
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
              a.loading
            ) : isLogin ? (
              <>
                <LogIn className="w-5 h-5" />
                {a.signIn}
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                {a.createAccountBtn}
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
            {isLogin ? a.noAccount : a.hasAccount}
          </button>
        </div>
      </div>
    </div>
  );
}
