// components/ui/LoadingSpinner.tsx
'use client';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff5757]"></div>
    </div>
  );
}
