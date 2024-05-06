import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import React, { useMemo } from 'react';
import Image from 'next/image';

export interface ICustomDropdownItemData {
  value: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined;
  className?: string;
}
export interface ICustomDropdownTriggerProps {
  buttonSize?: 'sm' | 'md' | 'lg' | undefined;
  imageSize?: number;
  src: string;
  alt?: string;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined;
  className?: string;
}
const CustomDropdown = ({
  items,
  triggerProps,
}: {
  items: ICustomDropdownItemData[];
  triggerProps?: ICustomDropdownTriggerProps;
}) => {
  const defaultTriggerProps = useMemo<ICustomDropdownTriggerProps>(() => {
    return {
      color: 'secondary',
      buttonSize: 'sm',
      imageSize: 18,
      src: '/image/room/menu2.png',
      alt: '',
    };
  }, []);
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            color={
              triggerProps ? triggerProps.color : defaultTriggerProps.color
            }
            size={triggerProps?.buttonSize || defaultTriggerProps.buttonSize}
            className={triggerProps?.className || defaultTriggerProps.className}
          >
            <Image
              sizes="100"
              width={triggerProps?.imageSize || defaultTriggerProps.imageSize}
              height={triggerProps?.imageSize || defaultTriggerProps.imageSize}
              src={triggerProps?.src || defaultTriggerProps.src}
              // @ts-ignore
              alt={triggerProps?.alt || defaultTriggerProps.alt}
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {items.map((i) => (
            <DropdownItem
              className={i.className}
              color={i.color}
              key={i.value}
              startContent={i.startContent}
              endContent={i.endContent}
            >
              {i.value}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default CustomDropdown;
