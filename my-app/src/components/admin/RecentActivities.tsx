import { Activity } from '@/types/admin';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

interface RecentActivitiesProps {
  activities?: Activity[];
  className?: string;
}

export function RecentActivities({ activities = [], className }: RecentActivitiesProps) {
  const recentActivities = activities.length > 0 
    ? activities.slice(0, 5) 
    : DEMO_ACTIVITIES;

    function cn(arg0: string, className: string | undefined): string | undefined {
        throw new Error('Function not implemented.');
    }

  return (
    <div className={cn('space-y-6', className)}>
      <h3 className="text-lg font-medium">Recent Activities</h3>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <span className="text-sm font-medium">
                  {activity.user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{activity.user.name}</p>
                <Badge variant="outline">{activity.type}</Badge>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(activity.timestamp)}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {activity.message}
              </p>
              {activity.property && (
                <a
                  href={`/admin/properties/${activity.property.id}`}
                  className="text-sm text-primary-600 hover:underline dark:text-primary-400 mt-1 inline-block"
                >
                  View Property
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Demo data for when no activities are provided
const DEMO_ACTIVITIES: Activity[] = [
  {
    id: '1',
    type: 'login',
    message: 'Successfully logged in to the admin dashboard',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    user: { id: '1', name: 'Admin User', email: 'admin@example.com' },
  },
  {
    id: '2',
    type: 'property_update',
    message: 'Updated property listing for "Modern Downtown Apartment"',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    user: { id: '2', name: 'Property Manager', email: 'manager@example.com' },
    property: { id: '101', title: 'Modern Downtown Apartment' },
  },
  {
    id: '3',
    type: 'user_create',
    message: 'Created new user account for john.doe@example.com',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    user: { id: '1', name: 'Admin User', email: 'admin@example.com' },
  },
];