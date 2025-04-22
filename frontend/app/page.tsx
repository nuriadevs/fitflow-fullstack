'use client'


import HeroSection from './components/Home/HeroSection'
import FeaturesSection from './components/Home/FeaturesSection'
import CTASection from './components/Home/CTASection'
import { Navbar } from '../app/components/ui/Navbar'
import {Footer} from '../app/components/ui/Footer'


export default function HomePage() {


  return (
    <>
    <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </>
  )
}
