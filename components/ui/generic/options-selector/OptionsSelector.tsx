'use client';

import { useState } from 'react';

import { Options } from '@/components/ui/generic/options-selector/options/Options';

import { Chevron } from '../icons/Chevron';

export type Option = Record<string, any>;

export interface OptionsSelectorProps {
  value: string;
  placeholder: string;
  options: Option[];
  optionLabelPath: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string | false;
  onOptionClick: (optionProps: Record<string, any>) => void;
}

export const OptionsSelector: React.FC<OptionsSelectorProps> = (props) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const {
    value,
    placeholder,
    options,
    optionLabelPath,
    disabled,
    error,
    helperText,
    onOptionClick,
  } = props;

  const toggleOptions = (): void => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (optionProps: Record<string, any>): void => {
    onOptionClick(optionProps);

    setShowOptions(false);
  };

  return (
    <div
      id={`option_selector_${placeholder}`}
      className='relative flex flex-col gap-2 text-left text-base text-black'>
      <div
        aria-disabled={disabled}
        className='relative cursor-pointer transition-all duration-200 aria-disabled:pointer-events-none aria-disabled:opacity-50'>
        <div className='group relative flex h-full w-full items-center justify-between hover:text-white'>
          <div
            className='flex w-full items-center gap-4 border border-black bg-white p-4 transition-all duration-200 ease-in-out group-hover:bg-black'
            onClick={toggleOptions}>
            <p>{value ? value : placeholder}</p>
          </div>
          <Chevron
            data-rotate={showOptions}
            className='absolute right-4 h-6 w-6 text-black transition-all duration-200 ease-in-out group-hover:text-white data-[rotate=true]:rotate-180'
          />
        </div>
        {showOptions && (
          <Options
            parentId={`option_selector_${placeholder}`}
            options={options}
            optionLabelPath={optionLabelPath}
            handleOptionClick={handleOptionClick}
            setShowOptions={setShowOptions}
          />
        )}
      </div>
      {error && (
        <span className='text-red-1 block text-base'>{helperText}</span>
      )}
    </div>
  );
};
