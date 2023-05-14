'use client';

export const Button = (props) => {
  const { variant, className, children, ...restOfProps } = props;

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
    <button {...restOfProps} className={handleClassNames()}>
      {children}
    </button>
  );
};
