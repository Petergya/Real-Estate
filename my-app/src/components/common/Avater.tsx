
// 'use client';

// import { cn } from '@/lib/utils'; // Correct import path
// import Image from 'next/image';

// interface AvatarProps {
//   src?: string | null;
//   alt?: string;
//   className?: string;
//   size?: 'sm' | 'md' | 'lg';
// }

// export function Avatar({ 
//   src, 
//   alt = 'Avatar', 
//   className, 
//   size = 'md' 
// }: AvatarProps) {
//   const sizeClasses = {
//     sm: 'h-8 w-8',
//     md: 'h-10 w-10',
//     lg: 'h-12 w-12',
//   };

//   return (
//     <div className={cn(
//       'relative rounded-full overflow-hidden bg-gray-200',
//       sizeClasses[size],
//       className
//     )}>
//       {src ? (
//         <Image
//           src={src}
//           alt={alt}
//           fill
//           className="object-cover"
//         />
//       ) : (
//         <div className="flex items-center justify-center h-full w-full text-gray-500">
//           {alt.charAt(0).toUpperCase()}
//         </div>
//       )}
//     </div>
//   );
// }



// 'use client';

// import { cn } from '@/lib/utils';
// import Image from 'next/image';
// import { useState } from 'react';

// interface AvatarProps {
//   src?: string | null;
//   alt?: string;
//   className?: string;
//   size?: 'sm' | 'md' | 'lg';
// }

// export function Avatar({ 
//   src, 
//   alt = 'User', 
//   className, 
//   size = 'md' 
// }: AvatarProps) {
//   const [hasError, setHasError] = useState(false);

//   const sizeClasses = {
//     sm: 'h-8 w-8 text-sm',
//     md: 'h-10 w-10 text-base',
//     lg: 'h-12 w-12 text-lg',
//   };

//   return (
//     <div 
//       className={cn(
//         'relative flex items-center justify-center rounded-full bg-gray-200 text-gray-500 font-medium',
//         sizeClasses[size],
//         className
//       )}
//     >
//       {!hasError && src ? (
//         <Image
//           src={src}
//           alt={alt}
//           fill
//           className="object-cover rounded-full"
//           onError={() => setHasError(true)}
//         />
//       ) : (
//         <span>{alt.charAt(0).toUpperCase()}</span>
//       )}
//     </div>
//   );
// }




// src/components/common/Avatar.tsx

// 'use client';

// import { cn } from '@/lib/utils';
// import Image from 'next/image';
// import { useState } from 'react';

// interface AvatarProps {
//   src?: string | null;
//   alt?: string;
//   className?: string;
//   size?: 'sm' | 'md' | 'lg';
// }

// export function Avatar({ 
//   src, 
//   alt = 'User', 
//   className, 
//   size = 'md' 
// }: AvatarProps) {
//   const [hasError, setHasError] = useState(false);

//   const sizeClasses = {
//     sm: 'h-8 w-8 text-sm',
//     md: 'h-10 w-10 text-base',
//     lg: 'h-12 w-12 text-lg',
//   };

//   return (
//     <div 
//       className={cn(
//         'relative flex items-center justify-center rounded-full bg-gray-200 text-gray-500 font-medium',
//         sizeClasses[size],
//         className
//       )}
//     >
//       {!hasError && src ? (
//         <Image
//           src={src}
//           alt={alt}
//           fill
//           className="object-cover rounded-full"
//           onError={() => setHasError(true)}
//         />
//       ) : (
//         <span>{alt.charAt(0).toUpperCase()}</span>
//       )}
//     </div>
//   );
// }



'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { AvatarImage } from './AvatarImage';
import { AvatarFallback } from './AvatarFallback';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export function Avatar({
  src,
  alt = 'User',
  className,
  size = 'md',
  children,
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full bg-gray-200 text-gray-500 font-medium',
        sizeClasses[size],
        className
      )}
    >
      {!hasError && src ? (
        <AvatarImage
          src={src}
          alt={alt}
          onError={() => setHasError(true)} // Ensure `onError` is passed
        />
      ) : (
        <AvatarFallback>{children || alt.charAt(0).toUpperCase()}</AvatarFallback> // Use `children` if passed
      )}
    </div>
  );
}

export { AvatarFallback };

