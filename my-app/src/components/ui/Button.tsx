// import React, { ButtonHTMLAttributes } from 'react';
// import { twMerge } from 'tailwind-merge';

// type ButtonVariant = 'default' | 'outline' | 'ghost';

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: ButtonVariant;
// }

// const variantClasses: Record<ButtonVariant, string> = {
//   default: 'bg-primary-600 text-white hover:bg-primary-700',
//   outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/50',
//   ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
// };

// export const Button: React.FC<ButtonProps> = ({
//   variant = 'default',
//   className,
//   children,
//   ...props
// }) => {
//   return (
//     <button
//       className={twMerge(
//         'px-4 py-2 rounded-md font-medium transition-colors',
//         variantClasses[variant],
//         className
//       )}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };


import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'default' | 'outline' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  loadingText?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-primary-600 text-white hover:bg-primary-700',
  outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/50',
  ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'default',
    loading = false,
    loadingText,
    className,
    children,
    ...props
  }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          'px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2',
          variantClasses[variant],
          loading && 'opacity-70 cursor-not-allowed',
          className
        )}
        disabled={loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingText || children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';