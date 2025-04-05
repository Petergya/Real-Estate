

// 'use client';

// import { Avatar } from '@/components/common/Avater'; // Check the import path
// import { AvatarImage } from '@/components/common/AvatarImage';
// import { AvatarFallback } from '@/components/common/AvatarFallback';
// import { Button } from '@/components/ui/Button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/DropDown';
// import { useAuth } from '@/hooks/useAuth';
// import Link from 'next/link';
// import { LogOut, Settings, User } from 'lucide-react';

// interface User {
//   name: string;
//   email: string;
//   avatar?: string | null;
// }

// interface UserMenuProps {
//   user: User | null;
// }

// export function UserMenu({ user }: UserMenuProps) {
//   const { logout } = useAuth();

//   if (!user) {
//     return (
//       <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//         <Avatar className="h-8 w-8">
//           <AvatarFallback>?</AvatarFallback>
//         </Avatar>
//       </Button>
//     );
//   }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//           <Avatar className="h-8 w-8">
//             {user.avatar && (
//               <AvatarImage
//                 src={user.avatar}
//                 alt={user.name}
//                 onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//                   (e.target as HTMLImageElement).src = '/fallback-avatar.jpg';
//                 }}
//               />
//             )}
//             <AvatarFallback>
//               {user.name
//                 .split(' ')
//                 .map((n) => n[0])
//                 .join('')}
//             </AvatarFallback>
//           </Avatar>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56">
//         <div className="p-2">
//           <p className="text-sm font-medium">{user.name}</p>
//           <p className="text-xs text-gray-500">{user.email}</p>
//         </div>
//         {/* Fixing asChild usage by rendering Link directly */}
//         <DropdownMenuItem>
//           <Link href="/account" className="flex items-center w-full">
//             <User className="mr-2 h-4 w-4" />
//             Account
//           </Link>
//         </DropdownMenuItem>
//         <DropdownMenuItem>
//           <Link href="/settings" className="flex items-center w-full">
//             <Settings className="mr-2 h-4 w-4" />
//             Settings
//           </Link>
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={logout}>
//           <div className="text-red-600 dark:text-red-400 flex items-center">
//             <LogOut className="mr-2 h-4 w-4" />
//             Log out
//           </div>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }



'use client';

import { Avatar } from '@/components/common/Avater'; 
import { AvatarImage } from '@/components/common/AvatarImage';
import { AvatarFallback } from '@/components/common/AvatarFallback';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropDown';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { LogOut, Settings, User } from 'lucide-react';

interface User {
  name: string;
  email: string;
  avatar?: string | null;
}

interface UserMenuProps {
  user: User | null;
}

export function UserMenu({ user }: UserMenuProps) {
  const { logout } = useAuth();

  if (!user) {
    return (
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {user.avatar && (
              <AvatarImage
                src={user.avatar}
                alt={user.name}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  (e.target as HTMLImageElement).src = '/fallback-avatar.jpg';
                }}
              />
            )}
            <AvatarFallback>
              {user.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="p-2">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
        <DropdownMenuItem>
          <Link href="/account" className="flex items-center w-full">
            <User className="mr-2 h-4 w-4" />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings" className="flex items-center w-full">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <div className="text-red-600 dark:text-red-400 flex items-center">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
