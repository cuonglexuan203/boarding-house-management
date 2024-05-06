import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

const OnlyIconButton = ({
  imageSize,
  buttonSize,
  src,
  alt,
  color,
  className,
}: {
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
}) => {
  return (
    <Button isIconOnly color={color} size={buttonSize} className={className}>
      <Image
        sizes="100"
        width={imageSize || 18}
        height={imageSize || 18}
        src={src}
        alt={alt || ''}
      />
    </Button>
  );
};

export default OnlyIconButton;
