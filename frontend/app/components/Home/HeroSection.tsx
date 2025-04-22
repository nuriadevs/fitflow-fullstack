// components/Home/HeroSection.tsx
'use client';

import Button from '../ui/Button';

const HeroSection = () => {
 return (
  <section className="bg-gradient-to-r from-[#545454] to-[#2d2d2d] text-white">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="text-center">
     <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">FitFlow Personal Fitness</h1>
     <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
      Get personalized workout tips, track your progress, and achieve your fitness goals
     </p>
     <div className="mt-5 max-w-md mx-auto space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4 md:mt-8">
      <div className="w-full">
       <Button
        onClick={() => (window.location.href = '/auth/signup')} 
        text="Join Now"
        className="button-red inline-flex items-center justify-center w-full sm:w-40 h-12 border border-transparent text-xl font-medium rounded-md"
       />
      </div>
      <div className="w-full">
       <Button
        onClick={() => (window.location.href = '/auth/signin')} 
        text="Log In"
        className="button-red inline-flex items-center justify-center w-full sm:w-40 h-12 border border-transparent text-xl font-medium rounded-md"
       />
      </div>
     </div>
    </div>
   </div>
  </section>
 );
};

export default HeroSection;
