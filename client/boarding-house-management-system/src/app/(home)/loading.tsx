'use client';
import { Card, CircularProgress, Skeleton } from '@nextui-org/react';
import React from 'react';

const Loading = () => {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + getRandomInt(20)));
    }, 500);

    return () => clearInterval(interval);
  }, []);
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };
  return (
    <div className="w-full h-full flex justify-center items-center mt-4">
      <div className="w-full h-full max-w-[800px] min-h-96 flex justify-center items-center container">
        <Card className="w-full space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-48 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-1/5 rounded-lg">
              <div className="h-3 w-1/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/6 rounded-lg">
              <div className="h-3 w-2/6 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/6 rounded-lg">
              <div className="h-3 w-4/6 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      </div>
      <div className="fixed inset-0 bg-black opacity-50 flex justify-center items-center">
        <CircularProgress
          aria-label="Loading..."
          size="lg"
          value={value}
          color="warning"
          strokeWidth={4}
          showValueLabel={true}
          classNames={{
            svg: 'w-36 h-36 drop-shadow-md',
            indicator: 'stroke-white',
            track: 'stroke-white/10',
            value: 'text-3xl font-semibold text-white',
          }}
        />
      </div>
    </div>
  );
};

export default Loading;
