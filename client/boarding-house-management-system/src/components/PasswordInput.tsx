import React from 'react';
import { EyeSlashFilledIcon } from './icon/EyeSlashFilledIcon';
import { EyeFilledIcon } from './icon/EyeFilledIcon';
import { Input } from '@nextui-org/react';

const PasswordInput = ({
  className,
  size,
  value,
  onValueChange,
}: {
  className?: string;
  size?: 'lg' | 'sm' | 'md' | undefined;
  value?: any;
  onValueChange?: (value: any) => void;
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      size={size}
      label="Password"
      isRequired
      value={value}
      onValueChange={onValueChange}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? 'text' : 'password'}
      className={className}
    />
  );
};

export default PasswordInput;
