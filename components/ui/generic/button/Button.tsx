'use client';

interface ButtonProps {
  variant?: string;
  children: React.ReactNode;
  type: 'button' | 'submit';
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  const { variant, children, type, onClick } = props;

  const handleClassNames = () => {
    const standardClasses =
      'w-full p-4 flex items-center justify-center transition-all duration-200';

    switch (variant) {
      case 'secondary':
        return `${standardClasses} bg-opaque-white-90 border border-black text-base font-bold uppercase text-black hover:bg-black hover:text-white`;
      case 'primary':
      default:
        return `${standardClasses} bg-black border border-black text-base font-bold uppercase text-white hover:bg-white hover:text-black`;
    }
  };

  return (
    <button type={type} className={handleClassNames()} onClick={onClick}>
      {children}
    </button>
  );
};
