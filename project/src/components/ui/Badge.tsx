import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        className={cn(
          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
          {
            'border-gray-200 bg-gray-100 text-gray-800': variant === 'default',
            'border-primary-200 bg-primary-100 text-primary-800': variant === 'primary',
            'border-secondary-200 bg-secondary-100 text-secondary-800': variant === 'secondary',
            'border-success-200 bg-success-100 text-success-800': variant === 'success',
            'border-warning-200 bg-warning-100 text-warning-800': variant === 'warning',
            'border-error-200 bg-error-100 text-error-800': variant === 'error',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;