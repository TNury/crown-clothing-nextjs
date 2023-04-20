import clsx from 'clsx';

export const Button = (props) => {
  const { className, children, ...restOfProps } = props;

  return (
    <button
      {...restOfProps}
      className={`w-full p-4 mt-auto flex items-center justify-center 
        bg-black border border-black text-base font-bold 
        uppercase transition-all duration-200 text-white 
        hover:bg-white hover:text-black ${clsx(className && className)}`}
    >
      {children}
    </button>
  );
};
