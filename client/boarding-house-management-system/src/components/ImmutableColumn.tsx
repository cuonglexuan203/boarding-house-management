import Image from 'next/image';
import React from 'react';

const ImmutableColumn = ({
  iconSize,
  iconSrc,
}: {
  iconSize: number;
  iconSrc: string;
}) => {
  return (
    <div>
      <Image
        alt=""
        src={iconSrc}
        sizes="100"
        width={iconSize || 18}
        height={iconSize || 18}
      />
    </div>
  );
};

export default ImmutableColumn;
