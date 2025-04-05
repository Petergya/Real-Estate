import { twMerge } from 'tailwind-merge';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
  secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200',
  destructive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  outline: 'border border-gray-200 dark:border-gray-700',
};

export const Badge = ({ variant = 'default', className, ...props }: BadgeProps) => {
  return (
    <span
      className={twMerge(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
};