export const Input = (props) => {
  const { id, type, value, onChange, error, placeholder, helperText } = props;

  return (
    <div className='flex flex-col gap-2'>
      <div className='relative flex flex-col justify-center'>
        <input
          id={id}
          type={type}
          className='peer/input border-b border-b-black p-2 text-xl outline-none'
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
