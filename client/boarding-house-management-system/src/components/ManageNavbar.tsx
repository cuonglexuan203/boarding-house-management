'use client';
import { Tab, Tabs } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import HomeIcon from './icon/HomeIcon';
import Image from 'next/image';
import Cookies from 'js-cookie';

const ManageNavbar = () => {
  const pathname = usePathname();
  const tabSelectedKey = useMemo(() => {
    const nextSubrouteIdx = pathname.indexOf('/', 1);
    if (nextSubrouteIdx == -1) {
      return pathname;
    }
    return pathname.substring(0, nextSubrouteIdx);
  }, [pathname]);
  const handleLogout = useCallback(() => {
    Cookies.remove('jwtToken');
  }, []);
  const navbarContent = [
    {
      id: '/manage',
      href: '/manage',
      label: (
        <>
          <HomeIcon />
          <span>Home Management</span>
        </>
      ),
    },
    {
      id: '/report',
      href: '/report',
      label: (
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
      id: '/setting',
      href: '/setting',
      label: (
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
      id: '/account',
      href: '/account',
      label: (
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
      id: '/logout',
      href: '/',
      label: (
        <>
          <div onClick={handleLogout}>
            <Image
              src={'/image/manageNavbar/logout.png'}
              alt=""
              className="h-12 w-12"
              width={0}
              height={0}
              sizes="100"
            />
            <span>Log out</span>
          </div>
        </>
      ),
    },
  ];
  return (
    <div className="flex w-full flex-col">
      <Tabs
        selectedKey={tabSelectedKey}
        size="lg"
        fullWidth
        aria-label="Options"
        color="primary"
        variant="bordered"
        items={navbarContent}
      >
        {navbarContent.map((i) => (
          <Tab
            key={i.id}
            href={i.href}
            className="h-28"
            title={
              <div className="h-28 flex flex-col justify-center items-center space-y-1">
                {i.label}
              </div>
            }
          />
        ))}
      </Tabs>
    </div>
  );
};

export default ManageNavbar;
