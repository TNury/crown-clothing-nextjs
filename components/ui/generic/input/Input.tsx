'use client';

import { type VariantProps, cva } from 'class-variance-authority';
import { FormikHandlers } from 'formik';

import { cn } from '@/lib/utils/utils';

const inputVariants = cva(
  'border-b bg-gray-1 outline-none p-4 text-base transition-all duration-200 disabled:opacity-70 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'border-b-black bg-gray-1 outline-none placeholder:text-gray-3',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  inputClassName?: string;
  error: boolean | undefined;
  onChange: FormikHandlers['handleChange'];
  helperText: string | false | undefined;
}

export const Input: React.FC<InputProps> = (props) => {
  const {
    id,
    type,
    value,
    onChange,
    error,
    placeholder,
    helperText,
    variant,
    inputClassName,
    disabled,
  } = props;

  return (
    <div className='flex flex-col gap-2'>
      <div className='relative flex flex-col justify-center'>
        <input
          id={id}
          type={type}
          disabled={disabled}
          className={cn(inputVariants({ variant, className: inputClassName }))}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
      {error && (
        <span className='block text-base text-red-500'>{helperText}</span>
      )}
    </div>
  );
};
