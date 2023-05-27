export const Input = (props) => {
  return (
    <input
      {...props}
      className='border-b border-b-black py-2 text-lg outline-none invalid:border-red-500 invalid:bg-red-500 invalid:bg-opacity-20'
    />
  );
};
