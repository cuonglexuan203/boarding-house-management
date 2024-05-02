import ManageNavbar from '@/components/ManageNavbar';
import React from 'react';

export default function ManagementLayout(props: { children: React.ReactNode }) {
  return (
    <section>
      <ManageNavbar />
      {props.children}
    </section>
  );
}
