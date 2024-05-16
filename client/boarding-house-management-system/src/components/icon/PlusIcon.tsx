import React from 'react';
export const PlusIcon = ({
  size,
  height,
  width,
  ...props
}: {
  size?: number;
  height?: number;
  width?: number;
  className?: string;
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 12H18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18V6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
