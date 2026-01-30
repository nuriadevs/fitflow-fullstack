import { FeatureCard } from '@/components/ui/card/feature-card';
import { faDatabase, faBolt, faShield, faDumbbell, faRobot } from '@fortawesome/free-solid-svg-icons'


/**
 * Componente FeatureSection que muestra una sección de características.
 * @returns
 */
export default function FeatureSection() {
    return (
        <section className="py-12">
            <div className="mx-auto w-full container px-4 p-4 md:p-6 flex items-center justify-center">
                <div className="">
                    <div className="mb-10 text-center">
                        <h2 className="mb-3 text-4xl sm:6xl font-bold tracking-tight text-gray-900">Why teams choose us</h2>
                        <p className="text-muted-foreground">We obsess over the details so you don&apos;t have to.</p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex gap-4">
                            <FeatureCard
                                icon={faDatabase}
                                title="Real-time Database"
                                description="Sync data across all clients instantly with built-in conflict resolution and offline support."
                            />
                        </div>
                        <div className="flex gap-4">
                            <FeatureCard
                                icon={faBolt}
                                title="Lightning Fast"
                                description="Optimized performance with edge caching and automatic code splitting."
                            />
                        </div>
                        <div className="flex gap-4">

                            <FeatureCard
                                icon={faShield}
                                title="Secure by Default"
                                description="Built-in authentication, authorization, and data encryption."
                            />

                        </div>
                        <div className="flex gap-4">
                            <FeatureCard
                                icon={faDumbbell}
                                title="Personalized Workouts"
                                description="Get exercise recommendations based on your goals and fitness level."
                            />
                        </div>
                        <div className="flex gap-4">
                            <FeatureCard
                                icon={faRobot}
                                title="AI-Assistant"
                                description="Chat with our AI assistant for tips and answers to your fitness questions."
                            />
                        </div>
                        <div className="flex gap-4">
                            <FeatureCard
                                icon={faDumbbell}
                                title="Progress Tracking"
                                description="Log and visualize your progress over time to stay motivated."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
