'use client';

import { useProperties } from '@/hooks/useProperties';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export function PropertyTable() {
  const { properties, loading } = useProperties();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {properties?.map((property) => (
            <tr key={property.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium">{property.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {property.city}, {property.state}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm capitalize">{property.type}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium">
                  ${property.price.toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge
                  variant={
                    property.status === 'for_sale'
                      ? 'default'
                      : property.status === 'for_rent'
                      ? 'secondary'
                      : 'destructive'
                  }
                >
                  {property.status === 'for_sale'
                    ? 'For Sale'
                    : property.status === 'for_rent'
                    ? 'For Rent'
                    : 'Sold'}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                <Link
                  href={`/admin/properties/${property.id}`}
                  className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400"
                >
                  Edit
                </Link>
                <button className="text-red-600 hover:text-red-900 dark:hover:text-red-400">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}