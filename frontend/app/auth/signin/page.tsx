'use client';

import { useLogin } from '../../hooks/useLogin';
import Link from 'next/link';

export default function SignInPage() {
 const { formData, handleChange, handleSubmit, error, isLoading } = useLogin();

 if (isLoading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff5757]"></div>
   </div>
  );
 }

 return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full space-y-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log In</h2>
    </div>
    <form className="mt-8 space-y-4" onSubmit={handleSubmit} autoComplete="off">
      <div className="space-y-2">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            required
            className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#ff5757] focus:border-[#ff5757] sm:text-sm"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="off"
            required
            className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#ff5757] focus:border-[#ff5757] sm:text-sm"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm text-center p-4 bg-red-50 rounded-md">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ff5757] hover:bg-[#ff5757]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5757] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
          ) : (
            'Log In'
          )}
        </button>
      </div>
    </form>

    <div className="text-sm text-center text-gray-900 space-y-1">
      <p>
        Don't have an account?{' '}
        <Link href="/auth/signup" className="font-medium text-[#ff5757] hover:text-[#ff5757]/90">
          Sign Up
        </Link>
      </p>
      <p className="mt-2">
        <Link href="/" className="text-gray-500 hover:text-gray-700 underline">
          Back to Home
        </Link>
      </p>
    </div>
  </div>
</div>

 );
}
