import Image from 'next/image';
import React from 'react';

const FailedIcon = ({ size = 12 }: { size?: number }) => {
  return (
    <Image
      alt="Successful icon"
      src={'/image/general/mark.png'}
      width={0}
      height={0}
      sizes="100%"
      className={`w-${size} h-auto`}
    />
  );
};
export default FailedIcon;
