
// import React, { useState } from 'react';
// import { cn } from '@/lib/utils';

// interface DropDownMenuProps {
//   trigger: React.ReactNode;
//   items: {
//     label: string;
//     onClick: () => void;
//     icon?: React.ReactNode;
//   }[];
//   className?: string;
// }

// export function DropDownMenu({ trigger, items, className }: DropDownMenuProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className={cn('relative inline-block', className)}>
//       <div onClick={() => setIsOpen(!isOpen)}>
//         {trigger}
//       </div>

//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
//           <div className="py-1">
//             {items.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   item.onClick();
//                   setIsOpen(false);
//                 }}
//                 className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               >
//                 {item.icon && <span className="mr-2">{item.icon}</span>}
//                 {item.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// src/components/ui/DropDown.tsx

// import * as React from 'react';

// export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
//   return <div className="dropdown-menu">{children}</div>;
// };

// export const DropdownMenuContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
//   return <div className={`dropdown-menu-content ${className}`}>{children}</div>;
// };

// export const DropdownMenuItem = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
//   return (
//     <div className="dropdown-menu-item" onClick={onClick}>
//       {children}
//     </div>
//   );
// };

// export const DropdownMenuTrigger = ({ children }: { children: React.ReactNode }) => {
//   return <div className="dropdown-menu-trigger">{children}</div>;
// };


import * as React from 'react';

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  return <div className="dropdown-menu">{children}</div>;
};

export const DropdownMenuContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`dropdown-menu-content ${className}`}>{children}</div>;
};

export const DropdownMenuItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      className="dropdown-menu-item cursor-pointer py-2 px-4 hover:bg-gray-100"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const DropdownMenuTrigger = ({ children }: { children: React.ReactNode }) => {
  return <div className="dropdown-menu-trigger">{children}</div>;
};
