import Sidebar from '@/components/Sidebar';
import React from 'react';

const HomeManagementLayout = (props: { children: React.ReactNode }) => {
  return (
    <section>
      <Sidebar />
      {props.children}
    </section>
  );
};

export default HomeManagementLayout;
