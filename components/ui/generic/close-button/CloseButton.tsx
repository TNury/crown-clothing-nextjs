import { cn } from '@/lib/utils/utils';

type CloseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const CloseButton: React.FC<CloseButtonProps> = ({
  className = '',
  ...restOfProps
}) => {
  return (
    <button
      {...restOfProps}
      className={cn(
        `h-11 w-11 text-lg transition-all duration-200 hover:opacity-50 ${className}`
      )}>
      &#10005;
    </button>
  );
};
