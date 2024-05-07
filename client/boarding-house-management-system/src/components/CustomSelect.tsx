import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';

export interface ICustomSelectProps {
  label: string;
  items: string[];
  description?: string;
  isRequired?: boolean;
  size?: 'lg' | 'md' | 'sm' | undefined;
  selectedKey?: any;
  onSelectionChange?: ((key: any) => any) | undefined;
}
const CustomAutocomplete = ({
  label,
  items,
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
        className="max-w-xs focus:outline-none"
        label={label}
        description={description}
        size={size}
        selectedKeys={selectedKey}
        onSelectionChange={onSelectionChange}
      >
        {items.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </Select>
    </>
  );
};

export default CustomAutocomplete;
