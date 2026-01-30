import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface FeatureCardProps {
    icon: IconDefinition
    title: string
    description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div
            data-slot="card"
            className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
        >
            {/* Header */}
            <div
                data-slot="card-header"
                className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 pb-2"
            >
                {/* Icon */}
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200/30">
                    <FontAwesomeIcon icon={icon} className="h-5 w-5 text-red-400" />
                </div>

                {/* Title */}
                <div
                    data-slot="card-title"
                    className="font-semibold text-lg text-gray-900"
                >
                    {title}
                </div>
            </div>

            {/* Content */}
            <div data-slot="card-content" className="px-6">
                <div
                    data-slot="card-description"
                    className="text-muted-foreground text-sm"
                >
                    {description}
                </div>
            </div>
        </div>
    )
}