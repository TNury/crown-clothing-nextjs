'use client';

import { useState } from 'react';

import { Options } from '@/components/ui/generic/options-selector/options/Options';

import { Chevron } from '../icons/Chevron';

export type Option = Record<string, any>;

export interface OptionsSelectorProps {
  value: string | number;
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
      className='relative flex w-full flex-col gap-2 text-left text-base text-black'>
      <div
        aria-disabled={disabled}
        className='relative cursor-pointer transition-all duration-200 aria-disabled:pointer-events-none aria-disabled:opacity-50'>
        <div
          className='group relative flex h-full w-full items-center justify-between gap-4 border border-black bg-white p-4 transition-all duration-200 ease-in-out hover:bg-black hover:text-white'
          onClick={toggleOptions}>
          <p className='text-base'>{value ? value : placeholder}</p>
          <Chevron
            data-rotate={showOptions}
            className='h-6 w-6 text-black transition-all duration-200 ease-in-out group-hover:text-white data-[rotate=true]:rotate-180'
          />
        </div>
        {showOptions && (
          <Options
            parentId={`option_selector_${placeholder}`}
            selectedOption={value}
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
