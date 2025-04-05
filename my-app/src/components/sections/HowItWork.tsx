import { Card } from '@/components/ui/Card';

const steps = [
  {
    title: 'Find Your Property',
    description: 'Browse our extensive listings or use our search tools to find properties that match your criteria.',
    icon: '🔍',
  },
  {
    title: 'Schedule a Viewing',
    description: 'Contact agents directly to schedule in-person or virtual viewings of properties you like.',
    icon: '📅',
  },
  {
    title: 'Make an Offer',
    description: 'Our agents will guide you through the offer process and negotiations with sellers.',
    icon: '💲',
  },
  {
    title: 'Close the Deal',
    description: 'We handle all the paperwork and legal aspects to make the process smooth for you.',
    icon: '✍️',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} hoverEffect className="p-6 text-center">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}