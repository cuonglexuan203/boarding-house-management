'use client';
import ManageNavbar from '@/components/ManageNavbar';
import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function ManagementLayout(props: { children: React.ReactNode }) {
  const router = useRouter();
  const jwtToken = Cookies.get('jwtToken');
  if (!jwtToken) {
    router.replace('/');
  }
  if (!jwtToken) {
    return <></>;
  }
  return (
    <section>
      <ManageNavbar />
      {props.children}
    </section>
  );
}
