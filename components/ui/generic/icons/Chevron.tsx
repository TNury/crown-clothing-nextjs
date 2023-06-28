type IconProps = React.SVGAttributes<SVGElement>;

export const Chevron: React.FC<IconProps> = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='25'
      fill='currentColor'
      viewBox='0 0 24 25'
      {...props}>
      <g>
        <path
          fill='currentColor'
          fillRule='evenodd'
          d='M12.398 16.163a.562.562 0 01-.796 0l-5.735-5.735a.562.562 0 010-.795l.266-.266c.22-.22.575-.22.795 0L12 14.44l5.072-5.072c.22-.22.576-.22.795 0l.266.266c.22.22.22.575 0 .795l-5.735 5.735z'
          clipRule='evenodd'></path>
      </g>
    </svg>
  );
};
