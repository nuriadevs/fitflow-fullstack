'use client';
import Button from '@/components/ui/button/button';

/**
 * Componente CTASection que muestra una sección de llamada a la acción.
 * @returns
 */
export default function CTASection() {
    return (
        <div className="bg-white">
            <div className="mx-auto container py-24 sm:px-6 sm:py-32 lg:px-8">
                <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-16 shadow-2xl sm:rounded-3xl sm:px-16 lg:flex lg:items-center lg:gap-x-20 lg:px-24 lg:py-20">
                    <div className="lg:flex-auto">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            <span className="block">Ready to get started?</span>
                            <span className="block text-white">Sign up today and start your fitness journey.</span>
                        </h2>
                    </div>
                    <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:shrink-0">
                        <Button
                            onClick={() => (window.location.href = '/auth/signup')}
                            text="Get Started Now"
                            className="button-dark-red inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}