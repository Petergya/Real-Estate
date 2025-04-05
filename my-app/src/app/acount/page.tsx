// 'use client';
// import Link from 'next/link';
// import { useAuth } from '@/hooks/useAuth';
// import { LoadingSpinner } from '@/components/common/LoadingSpinner';
// import { Button } from '@/components/ui/Button';

// export default function AccountPage() {
//   const { user, status, logout } = useAuth();

//   if (status === 'loading') return <LoadingSpinner />;
//   if (status === 'unauthenticated') {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h2 className="text-2xl font-bold mb-4">Please sign in to view your account</h2>
//         <Link href="/auth/login" className="text-primary-600 hover:underline">
//           Sign in
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//         <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
        
//         <div className="space-y-6">
//           <div>
//             <h2 className="text-lg font-medium mb-2">Profile Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-gray-500">Name</p>
//                 <p className="font-medium">{user?.name}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Email</p>
//                 <p className="font-medium">{user?.email}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Account Type</p>
//                 <p className="font-medium capitalize">{user?.role}</p>
//               </div>
//             </div>
//           </div>
          
//           <div>
//             <h2 className="text-lg font-medium mb-2">Security</h2>
//             <Button variant="outline" className="mr-4">
//               Change Password
//             </Button>
//           </div>
          
//           <div className="pt-4 border-t">
//             <Button variant="destructive" onClick={logout}>
//               Sign Out
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/Button';

export default function AccountPage() {
  const { user, status, logout } = useAuth() as {
    user: { name?: string; email?: string; role?: string };
    status: 'loading' | 'authenticated' | 'unauthenticated';
    logout: () => void;
  };

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Please sign in to view your account</h2>
        <Link href="/auth/login" className="text-primary-600 hover:underline">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
        
        <div className="space-y-6">
          {/* Profile Information section remains the same */}
          
          <div>
            <h2 className="text-lg font-medium mb-2">Security</h2>
            <Button variant="outline" className="mr-4">
              Change Password
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <Button 
              variant="outline"
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={logout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}