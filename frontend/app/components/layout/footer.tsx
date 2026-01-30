// app/components/layout/footer.tsx
import { Facebook,Instagram, Youtube } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-gray-200 bg-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">

                    {/* Copyright */}
                    <p className="text-sm text-gray-600 text-center md:text-left">
                        © {currentYear} FitFlow. All rights reserved.
                    </p>

                    {/* Enlaces sociales */}
                    <div className="flex items-center gap-4">
                        <SocialLink
                            href="#"
                            icon={<Facebook className="h-5 w-5" />}
                            label="Facebook"
                        />
                        <SocialLink
                            href="#"
                            icon={<Youtube className="h-5 w-5" />}
                            label="YouTube"
                        />
                        <SocialLink
                            href="#"
                            icon={<Instagram className="h-5 w-5" />}
                            label="Instagram"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}

// Componente reutilizable para enlaces sociales
function SocialLink({
    href,
    icon,
    label
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <a
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#ff5757] transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100"
        >
            {icon}
        </a>
    );
}