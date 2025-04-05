import { Card } from '@/components/ui/Card';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Home Buyer',
    content: 'Found my dream home in just two weeks! The team was incredibly helpful throughout the entire process.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Property Investor',
    content: 'The market insights provided helped me make a great investment decision. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'First-time Seller',
    content: 'Sold my condo for 15% above asking price thanks to their marketing strategy.',
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{testimonial.content}"</p>
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}