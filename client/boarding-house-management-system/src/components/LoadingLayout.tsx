'use client';
import { useAppSelector } from '@/libs/hooks';
import React from 'react';
import FloatingLoading from './FloatingLoading';

const LoadingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  return (
    <>
      {isLoading && <FloatingLoading />}
      {children}
    </>
  );
};

export default LoadingLayout;
