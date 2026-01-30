
'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signupUser } from '@/lib/auth/api';
import Link from 'next/link';
import { Eye, EyeOff, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { showToast } from '@/lib/toast';
import toast from 'react-hot-toast';

export default function SignUpForm() {
  const router = useRouter();
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [fieldErrors, setFieldErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        setFieldErrors(prev => ({ 
          ...prev, 
          confirmPassword: 'Passwords do not match' 
        }));
      } else {
        setFieldErrors(prev => ({ 
          ...prev, 
          confirmPassword: '' 
        }));
      }
    }
  }, [password, confirmPassword]);

  const validateForm = () => {
    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!username || username.length < 2) {
      newErrors.username = 'Name must be at least 2 characters';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      showToast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);


    const loadingToast = showToast.loading('Creating your account...');

    try {
      
      await signupUser({ username, email, password });
      
      
      toast.dismiss(loadingToast);

      showToast.auth.signupSuccess(username);

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.push('/signin');
      
    } catch (err) {

      const errorMessage = err instanceof Error ? err.message : 'Error creating account';
      

      showToast.error(errorMessage, {
        id: loadingToast,
        duration: 5000,
      });
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4 border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={username}
            onChange={(e) => {
              setName(e.target.value);
              setFieldErrors(prev => ({ ...prev, username: '' }));
            }}
            required
            disabled={isLoading}
            className={`shadow-sm border rounded-lg w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff5757] transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              fieldErrors.username ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John Doe"
          />
          {fieldErrors.username && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <XCircle className="h-4 w-4" />
              {fieldErrors.username}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors(prev => ({ ...prev, email: '' }));
            }}
            required
            disabled={isLoading}
            className={`shadow-sm border rounded-lg w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff5757] transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              fieldErrors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="john@example.com"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <XCircle className="h-4 w-4" />
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors(prev => ({ ...prev, password: '' }));
              }}
              required
              minLength={6}
              disabled={isLoading}
              className={`shadow-sm border rounded-lg w-full py-2.5 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff5757] transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                fieldErrors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <XCircle className="h-4 w-4" />
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setFieldErrors(prev => ({ ...prev, confirmPassword: '' }));
              }}
              required
              minLength={6}
              disabled={isLoading}
              className={`shadow-sm border rounded-lg w-full py-2.5 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff5757] transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                fieldErrors.confirmPassword ? 'border-red-500' : passwordsMatch ? 'border-green-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          
          {fieldErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <XCircle className="h-4 w-4" />
              {fieldErrors.confirmPassword}
            </p>
          )}
          
          {passwordsMatch && (
            <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" />
              Passwords match
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#ff5757] hover:bg-[#ff4040] text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#ff5757]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
        >
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/signin" className="text-[#ff5757] hover:text-[#ff4040] font-semibold hover:underline transition-colors">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}