import { Card } from '@/components/ui/Card';

const stats = [
  { title: 'Total Properties', value: '124', change: '+12%' },
  { title: 'Active Listings', value: '89', change: '+5%' },
  { title: 'Pending Approvals', value: '7', change: '-2%' },
  { title: 'Total Users', value: '342', change: '+24%' },
];

export function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} hoverEffect>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {stat.title}
            </h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">
              {stat.change} from last month
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}