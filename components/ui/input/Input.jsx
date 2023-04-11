import classes from './input.module.css';

export const Input = (props) => {
  const { id, type, value, onChange, error, label, helperText } = props;

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col justify-center relative'>
        <input
          id={id}
          type={type}
          className='peer/input p-2 text-xl border-b border-b-black outline-none'
          value={value}
          onChange={onChange}
          data-error={error}
        />
        <label
          data-shrink={Boolean(value)}
          htmlFor={`${id}`}
          className={`${classes.input_label} absolute left-2 text-base transition-all duration-200 peer-focus/input:-translate-y-8`}
        >
          {label}
        </label>
      </div>
      {error && (
        <span className='block text-base text-red-500'>{helperText}</span>
      )}
    </div>
  );
};
