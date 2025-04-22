'use client';

import Link from 'next/link';
import { useRegister } from '../../hooks/useRegister';

export default function SignUpPage() {
 const { formData, handleChange, handleSubmit, error } = useRegister();

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-md w-full space-y-8">
    <div>
     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Your Account</h2>
    </div>

    <form className="mt-8 space-y-4" onSubmit={handleSubmit} autoComplete="off">
     {error && (
      <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded text-sm text-center">
       {error}
      </div>
     )}

     <div className="space-y-2">
      <div>
       <label htmlFor="username" className="sr-only">
        Username
       </label>
       <input
        id="username"
        name="username"
        type="text"
        required
        value={formData.username}
        onChange={handleChange}
        className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#ff5757] focus:border-[#ff5757] sm:text-sm"
        placeholder="Username"
       />
      </div>

      <div>
       <label htmlFor="email" className="sr-only">
        Email
       </label>
       <input
        id="email"
        name="email"
        type="email"
        required
        value={formData.email}
        onChange={handleChange}
        className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#ff5757] focus:border-[#ff5757] sm:text-sm"
        placeholder="Email"
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
        required
        value={formData.password}
        onChange={handleChange}
        className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#ff5757] focus:border-[#ff5757] sm:text-sm"
        placeholder="Password"
       />
      </div>
     </div>

     <div>
      <button
       type="submit"
       className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ff5757] hover:bg-[#ff5757]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5757]"
      >
       Sign Up
      </button>
     </div>
    </form>

    <div className="text-sm text-center text-gray-900">
     <p>
      Already have an account?{' '}
      <Link href="/auth/signin" className="font-medium text-[#ff5757] hover:text-[#ff5757]/90">
       Log In
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
