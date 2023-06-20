'use client';

import { useEffect } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils/utils';

const alertVariants = cva(
  'fixed bottom-4 left-4 border border-black p-4 pr-16 text-white',
  {
    variants: {
      variant: {
        default: 'bg-blue-500',
        error: 'bg-red-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface AlertProps extends VariantProps<typeof alertVariants> {
  open: boolean;
  message: string;
  onClose: () => void;
}

export const Alert = (props: AlertProps) => {
  const { open, message, variant, onClose } = props;

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        onClose();
      }, 5000);
    }
  }, [open]);

  return (
    open && (
      <div className={cn(alertVariants({ variant }))}>
        <p className='text-base'>{message}</p>
      </div>
    )
  );
};
