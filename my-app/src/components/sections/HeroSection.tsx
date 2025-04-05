

"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

const heroData = [
  {
    image: '/images/house.webp',
    title: 'Find Your Dream Home Today',
    description: 'Discover the perfect property that matches your lifestyle and budget from our extensive listings.',
  },
  {
    image: '/images/house2.webp',
    title: 'Luxury Living Redefined',
    description: 'Experience unparalleled comfort in our premium properties designed for sophisticated living.',
  },
  {
    image: '/images/house3.webp',
    title: 'Modern Spaces for Modern Lives',
    description: 'Contemporary homes with smart features for today\'s dynamic lifestyle.',
  },
  {
    image: '/images/house4.webp',
    title: 'Investment Properties That Grow',
    description: 'Build your portfolio with high-value properties in prime locations.',
  },
  {
    image: '/images/house5.webp',
    title: 'Family Homes with Heart',
    description: 'Spacious properties designed for creating lasting memories with your loved ones.',
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[600px] overflow-hidden  ">
      {/* Background Images */}
      <div className="relative h-full w-full">
        {heroData.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
           

<Image
      src={item.image}
      alt={item.title}
      fill
      className="object-cover"
      priority={index === 0}
      style={{
        objectPosition: 'center',
      }}
      quality={100}
      sizes="100vw"
    />

            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 text-white">
          <div className="relative h-64">
            {heroData.map((item, index) => (
              <div
                key={index}
                className={`absolute transition-all duration-1000 ease-in-out ${
                  index === currentSlide
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                }`}
              >
                <h1 className="text-5xl font-bold mb-6">{item.title}</h1>
                <p className="text-xl mb-8 max-w-2xl">{item.description}</p>
                <div className="flex space-x-4">
                  <Button className="px-8 py-4 text-lg">Browse Properties</Button>
                  <Button variant="outline" className="px-8 py-4 text-lg">
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {heroData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}