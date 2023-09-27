'use client';

import * as RadixCheckbox from '@radix-ui/react-checkbox';

import { Check } from '@/icons/Check';

type CheckBoxProps = {
  onCheckedChange: (checkedStatus: boolean) => void;
  label: string;
  checked?: boolean;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  onCheckedChange,
  label,
  checked,
}) => {
  return (
    <RadixCheckbox.Root
      checked={checked}
      className='flex w-fit items-center gap-2 transition-all duration-200 hover:opacity-50'
      onCheckedChange={onCheckedChange}>
      <div className='flex h-4 w-4 items-center justify-center gap-2 bg-gray-1 p-3'>
        <RadixCheckbox.Indicator className='text-blue'>
          <Check />
        </RadixCheckbox.Indicator>
      </div>
      <p className='w-fit text-base'>{label}</p>
    </RadixCheckbox.Root>
  );
};
