'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PropertyGalleryProps {
  images: string[];
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="relative h-96 w-full rounded-lg overflow-hidden">
        <Image
          src={mainImage}
          alt="Main property image"
          fill
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(image)}
            className={`relative h-20 rounded-md overflow-hidden ${mainImage === image ? 'ring-2 ring-primary-500' : ''}`}
          >
            <Image
              src={image}
              alt={`Property image ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}