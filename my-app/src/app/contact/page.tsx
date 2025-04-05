import { ContactForm } from '@/components/sections/ContactForm';
import { MapView } from '@/components/property/MapView';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Send us a message</h2>
          <ContactForm />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Our office</h2>
          <div className="h-96 rounded-lg overflow-hidden">
            <MapView address="123 Real Estate Ave, New York, NY" />
          </div>
          <div className="mt-4 space-y-2">
            <p>
              <span className="font-medium">Address:</span> 123 Real Estate Ave, New York, NY 10001
            </p>
            <p>
              <span className="font-medium">Phone:</span> (123) 456-7890
            </p>
            <p>
              <span className="font-medium">Email:</span> info@realestateapp.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}