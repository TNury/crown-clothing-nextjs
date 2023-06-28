import { Dispatch, SetStateAction } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';

import type { Option, OptionsSelectorProps } from '../OptionsSelector';

interface OptionsProps {
  parentId: string;
  options: OptionsSelectorProps['options'];
  optionLabelPath: OptionsSelectorProps['optionLabelPath'];
  handleOptionClick: (optionProps: Record<string, any>) => void;
  setShowOptions: Dispatch<SetStateAction<boolean>>;
}

export const Options = (props: OptionsProps) => {
  const { parentId, optionLabelPath, handleOptionClick, setShowOptions } =
    props;

  useClickOutside({
    elementId: parentId,
    onOutsideClick: () => setShowOptions(false),
  });

  return (
    <div className='absolute z-10 max-h-56 w-full overflow-auto border border-t-0 border-black bg-white'>
      {props.options.map((entry: Option, index: number) => (
        <div
          key={index}
          onClick={() => handleOptionClick(entry)}
          className='border-b border-black p-4 transition-all duration-200 ease-in-out last:border-b-0 hover:bg-black hover:text-white'>
          <p className='transition-all duration-200 ease-in-out'>
            {optionLabelPath.split('.').reduce((obj, key) => obj[key], entry)}
          </p>
        </div>
      ))}
    </div>
  );
};
