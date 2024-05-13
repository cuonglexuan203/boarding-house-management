import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';

export interface ISelectItem {
  id: string;
  value: string;
}

export interface ICustomSelectProps {
  label: string;
  items: string[] | ISelectItem[];
  className?: string;
  description?: string;
  isRequired?: boolean;
  size?: 'lg' | 'md' | 'sm' | undefined;
  selectedKey?: any;
  onSelectionChange?: ((key: any) => any) | undefined;
}
const CustomAutocomplete = ({
  label,
  items,
  className,
  description,
  isRequired,
  size,
  selectedKey,
  onSelectionChange,
}: ICustomSelectProps) => {
  return (
    <>
      <Select
        isRequired={isRequired}
        className={className || 'max-w-xs focus:outline-none'}
        label={label}
        description={description}
        size={size}
        selectedKeys={selectedKey}
        onSelectionChange={onSelectionChange}
      >
        {items?.map((item) => {
          if (typeof item === 'string') {
            return (
              <SelectItem
                // @ts-ignore
                key={item}
                value={item}
              >
                {item}
              </SelectItem>
            );
          } else {
            return (
              <SelectItem
                key={(item as ISelectItem).id}
                value={(item as ISelectItem).value}
              >
                {(item as ISelectItem).value}
              </SelectItem>
            );
          }
        })}
      </Select>
    </>
  );
};

export default CustomAutocomplete;
