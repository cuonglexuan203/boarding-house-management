'use client';
import HostelManagement from '@/components/HostelManagement';
import { Tab, Tabs } from '@nextui-org/react';
import React, { useState } from 'react';

const HomeManagement = () => {
  const [selected, setSelected] = useState('management');

  return (
    <div className="flex w-full flex-col justify-center items-center">
      <Tabs
        fullWidth
        size="lg"
        aria-label="Options"
        color="primary"
        radius="full"
        variant="underlined"
        selectedKey={selected}
        // @ts-ignore
        onSelectionChange={setSelected}
      >
        <Tab
          className="w-full h-12"
          key="management"
          title={<p className="p-4">Hostel Management</p>}
        >
          <HostelManagement />
        </Tab>
        <Tab
          className="w-full h-12"
          key="overview"
          title={<p className="p-4">Accommodation Overview</p>}
        >
          <i>Accommodation Overview</i>
        </Tab>
      </Tabs>
    </div>
  );
};

export default HomeManagement;
