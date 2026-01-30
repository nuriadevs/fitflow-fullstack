
import SignUpForm from '@/components/auth/signup-form';

/**
 * Sign Up Page Component
 * @returns
 */
export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <SignUpForm />
        </div>
    );
}