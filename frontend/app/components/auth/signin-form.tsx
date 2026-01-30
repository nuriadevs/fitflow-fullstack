
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/auth/api';
import Link from 'next/link';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { showToast } from '@/lib/toast';
import toast from 'react-hot-toast';

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const loadingToast = showToast.loading('Signing in...');

    try {
      const response = await loginUser({ email, password });


      toast.dismiss(loadingToast);


      showToast.auth.loginSuccess(response.user?.username);

      router.refresh();
      await new Promise(resolve => setTimeout(resolve, 100));
      router.push('/dashboard');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid email or password';
      

      showToast.error(errorMessage, {
        id: loadingToast,
      });
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4 border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign In</h2>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="shadow-sm border border-gray-300 rounded-lg w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff5757] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            placeholder="john@example.com"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="shadow-sm border border-gray-300 rounded-lg w-full py-2.5 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff5757] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#ff5757] hover:bg-[#ff4040] text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#ff5757]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>

        {/* Link to sign up */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#ff5757] hover:text-[#ff4040] font-semibold hover:underline transition-colors">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}