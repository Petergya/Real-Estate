


import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedListings } from '@/components/sections/FeatureListings';
import { HowItWorks } from '@/components/sections/HowItWork';
import { Services } from '@/components/sections/Services';
import { Testimonials } from '@/components/sections/Testimonials';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedListings />
      <HowItWorks />
      <Services />
      <Testimonials />
    </main>
  );
}