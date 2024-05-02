import HomeNavbar from '@/components/HomeNavbar';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomeLayout(props: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <section>
      <HomeNavbar />
      {props.auth}
      {props.children}
    </section>
  );
}
