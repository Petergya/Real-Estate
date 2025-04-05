'use client';

interface AvatarFallbackProps {
  children: React.ReactNode; // The content to show when the image is missing
}

export const AvatarFallback = ({ children }: AvatarFallbackProps) => (
  <div className="flex items-center justify-center h-full w-full rounded-full bg-gray-300 text-white">
    {children}
  </div>
);
