'use client';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React from 'react';
import HomeIcon from './icon/HomeIcon';
import Image from 'next/image';

const ManageNavbar = () => {
  const pathname = usePathname();
  console.log(pathname);
  const navbarContent = [
    {
      key: '/manage',
      href: 'manage',
      title: (
        <>
          <HomeIcon />
          <span>Home Management</span>
        </>
      ),
    },
    {
      key: '/report',
      href: 'report',
      title: (
        <>
          <Image
            src={'/image/manageNavbar/analysis.png'}
            alt=""
            className="h-12 w-12"
            width={0}
            height={0}
            sizes="100"
          />
          <span>Total Report</span>
        </>
      ),
    },
    {
      key: '/setting',
      href: 'setting',
      title: (
        <>
          <Image
            src={'/image/manageNavbar/setting.png'}
            alt=""
            className="h-12 w-12"
            width={0}
            height={0}
            sizes="100"
          />
          <span>General Setting</span>
        </>
      ),
    },
    {
      key: '/account',
      href: 'account',
      title: (
        <>
          <Image
            src={'/image/manageNavbar/user.png'}
            alt=""
            className="h-12 w-12"
            width={0}
            height={0}
            sizes="100"
          />
          <span>Account</span>
        </>
      ),
    },
    {
      key: '/logout',
      href: 'logout',
      title: (
        <>
          <Image
            src={'/image/manageNavbar/logout.png'}
            alt=""
            className="h-12 w-12"
            width={0}
            height={0}
            sizes="100"
          />
          <span>Log out</span>
        </>
      ),
    },
  ];
  return (
    <div className="flex w-full flex-col">
      <Tabs
        selectedKey={pathname}
        size="lg"
        fullWidth
        aria-label="Options"
        color="primary"
        variant="bordered"
      >
        {navbarContent.map((i) => (
          <Tab
            key={i.key}
            href={i.href}
            className="h-28"
            title={
              <div className="h-28 flex flex-col justify-center items-center space-y-1">
                {i.title}
              </div>
            }
          />
        ))}
      </Tabs>
    </div>
  );
};

export default ManageNavbar;
