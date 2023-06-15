'use client';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils/utils';

const buttonVariants = cva(
  'w-full p-4 flex items-center justify-center transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-black border border-black text-base font-bold uppercase text-white hover:bg-white hover:text-black',
        secondary:
          'bg-opaque-white-90 border border-black text-base font-bold uppercase text-black hover:bg-black hover:text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, variant, ...restOfProps } = props;

  return (
    <button
      className={cn(buttonVariants({ variant, className }))}
      {...restOfProps}>
      {children}
    </button>
  );
};
