'use client';
import { useAppSelector } from '@/libs/hooks';
import { Button } from '@nextui-org/react';

export default function Home() {
  const value = useAppSelector((s) => s.status.value);
  return <main>{value && <Button>Hello</Button>}</main>;
}
