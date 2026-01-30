"use client"

import Button from '@/components/ui/button/button';

/**
 * Componente HeroSection que muestra la sección principal de la página de inicio.
 * @returns
 */
export default function HeroSection() {
    return (
        <section className="bg-gray-900  bg-linear-to-r from-gray-700 to-gray-900 text-white">
            <div className="px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-200 ring-1 ring-white/30 hover:ring-white/40">
                            Announcing our next version of FitFlow. <a href="#" className="font-semibold text-indigo-400"><span aria-hidden="true" className="absolute inset-0"></span>Read more <span aria-hidden="true">&rarr;</span></a>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">FitFlow Personal Fitness</h1>
                        <p className="mt-8 text-lg font-medium text-pretty text-gray-200 sm:text-xl/8">Get personalized workout tips, track your progress, and achieve your fitness goals</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Button onClick={() => (window.location.href = '/signup')}
                                text="Join Now"
                                className="button-dark-red inline-flex items-center justify-center w-full sm:w-40 h-12 border border-transparent text-xl font-medium rounded-md"
                            />
                            <Button
                                onClick={() => (window.location.href = '/signin')}
                                text="Sign In"
                                className="button-dark-red inline-flex items-center justify-center w-full sm:w-40 h-12 border border-transparent text-xl font-medium rounded-md"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}