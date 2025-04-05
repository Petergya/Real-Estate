import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, children, ...props }, ref) => {
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
        <select
          className={cn(
            'block w-full rounded-md border shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
            'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600',
            'disabled:bg-gray-100 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400',
            'py-2 pl-3 pr-10',
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : '',
            className
          )}
          ref={ref}
          {...props}
        >
          {options
            ? options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))
            : children}
        </select>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };