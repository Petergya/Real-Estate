import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'block w-full rounded-md border shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
              'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600',
              'disabled:bg-gray-100 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400',
              icon ? 'pl-10' : 'pl-3',
              'py-2 pr-3',
              error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : '',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };