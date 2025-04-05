import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card = ({ 
  className, 
  hoverEffect = false, 
  ...props 
}: CardProps) => {
  return (
    <div
      className={twMerge(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        hoverEffect && 'hover:shadow-md transition-shadow',
        className
      )}
      {...props}
    />
  );
};