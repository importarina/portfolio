import React from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

const BASE_STYLES = 'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-ring',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

interface ButtonProps<T extends React.ElementType = 'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  as?: T;
  className?: string;
  children?: React.ReactNode;
}

const Button = <T extends React.ElementType = 'button'>({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  as,
  className,
  ...props
}: ButtonProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => {
  const Component = as || 'button';

  return (
    <Component
      className={twMerge(
        BASE_STYLES,
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        isLoading && 'opacity-70 cursor-not-allowed',
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        children
      )}
    </Component>
  );
};

export default Button; 