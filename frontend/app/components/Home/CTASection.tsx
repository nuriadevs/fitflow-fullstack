// components/Home/CTASection.tsx
'use client';

import Button from '../ui/Button';

const CTASection = () => {
 return (
  <section className="bg-[#ff5757]">
   <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
     <span className="block">Ready to get started?</span>
     <span className="block text-white">Sign up today and start your fitness journey.</span>
    </h2>
    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
     <Button
      onClick={() => (window.location.href = '/auth/signup')} // Redirige al signup
      text="Get Started Now"
      className="button-dark inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md"
     />
    </div>
   </div>
  </section>
 );
};

export default CTASection;
