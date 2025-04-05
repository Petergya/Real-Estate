

'use client';

interface AvatarImageProps {
  src: string; // The image source
  alt: string; // The alt text for the image
  onError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void; // The onError function accepts an event
}

export const AvatarImage = ({ src, alt, onError }: AvatarImageProps) => (
  <img
    src={src}
    alt={alt}
    className="h-full w-full object-cover rounded-full"
    onError={onError} // Call the onError function passed as a prop
  />
);
