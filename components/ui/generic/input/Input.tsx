interface InputProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  placeholder: string;
  helperText: string;
}

export const Input: React.FC<InputProps> = (props) => {
  const { id, type, value, onChange, error, placeholder, helperText } = props;

  return (
    <div className='flex flex-col gap-2'>
      <div className='relative flex flex-col justify-center'>
        <input
          id={id}
          type={type}
          className='border-b border-b-black py-2 text-base outline-none'
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
