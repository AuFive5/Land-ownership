import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LoadingSpinner = ({ size = 'medium', className }: LoadingSpinnerProps) => {
  const sizeClass = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-3',
    large: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          'animate-spin rounded-full border-t-transparent border-primary',
          sizeClass[size],
          className
        )}
      />
    </div>
  );
};

export default LoadingSpinner;