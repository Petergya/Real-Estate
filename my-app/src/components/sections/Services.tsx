import { Card } from '@/components/ui/Card';

const services = [
  {
    title: 'Buying Assistance',
    description: 'Expert guidance through the entire home buying process.',
    icon: '🏠',
  },
  {
    title: 'Selling Assistance',
    description: 'Maximize your property value with our marketing strategies.',
    icon: '💰',
  },
  {
    title: 'Property Valuation',
    description: 'Accurate market valuations for your property.',
    icon: '📊',
  },
  {
    title: 'Mortgage Services',
    description: 'Connect with trusted lenders for financing options.',
    icon: '🏦',
  },
];

export function Services() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} hoverEffect className="p-6">
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}