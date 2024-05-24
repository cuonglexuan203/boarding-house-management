'use client';
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import {
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
} from '@/components/icon/Icon';
import RoomHubLogo from '@/components/icon/RoomHubLogo';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const HomeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const jwtAuthToken = Cookies.get('jwtToken');
  const router = useRouter();
  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out',
  ];
  const icons = {
    // @ts-ignore
    chevron: <ChevronDown fill="currentColor" size={16} />,
    // @ts-ignore
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    // @ts-ignore
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: (
      // @ts-ignore
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    // @ts-ignore
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    // @ts-ignore
    server: <Server className="text-success" fill="currentColor" size={30} />,
    // @ts-ignore
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };
  return (
    <main className="">
      <Navbar
        isBordered
        shouldHideOnScroll
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </NavbarContent>
        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <RoomHubLogo />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <RoomHubLogo />
          </NavbarBrand>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={icons.chevron}
                  radius="sm"
                  variant="light"
                >
                  Features
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: 'gap-4',
              }}
            >
              <DropdownItem
                key="autoscaling"
                description="ACME scales apps to meet user demand, automagically, based on load."
                startContent={icons.scale}
              >
                Autoscaling
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                startContent={icons.activity}
              >
                Usage Metrics
              </DropdownItem>
              <DropdownItem
                key="production_ready"
                description="ACME runs on ACME, join us and others serving requests at web scale."
                startContent={icons.flash}
              >
                Production Ready
              </DropdownItem>
              <DropdownItem
                key="99_uptime"
                description="Applications stay on the grid with high availability and high uptime guarantees."
                startContent={icons.server}
              >
                +99% Uptime
              </DropdownItem>
              <DropdownItem
                key="supreme_support"
                description="Overcome any challenge with a supporting team ready to respond."
                startContent={icons.user}
              >
                +Supreme Support
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="gap-2">
          <NavbarItem className="hidden lg:flex">
            {jwtAuthToken ? (
              <Button
                onClick={() => router.push('/manage')}
                className="bg-gradient-to-tr from-cyan-500 to-blue-500 font-bold"
                color="primary"
                startContent={
                  <Image
                    className="w-3/4 h-3/4"
                    src={'/image/home/manage.png'}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100"
                  />
                }
              >
                Manage
              </Button>
            ) : (
              <Button
                onClick={() => router.push('/login')}
                className="bg-gradient-to-tr from-cyan-500 to-blue-500 font-bold"
                color="primary"
                startContent={
                  <Image
                    className="w-3/4 h-3/4"
                    src={'/image/signup.png'}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100"
                  />
                }
              >
                Login
              </Button>
            )}
          </NavbarItem>
          {/* <NavbarItem>
            <Button
              onClick={() => router.push('/register')}
              className="bg-gradient-to-bl from-pink-500 to-yellow-500 text-white shadow-lg font-bold"
              color="primary"
              startContent={
                <Image
                  alt=""
                  src={'/image/avatar.png'}
                  width={0}
                  height={0}
                  sizes="100"
                  className="w-5/6 h-5/6"
                />
              }
            >
              Register
            </Button>
          </NavbarItem> */}
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? 'warning'
                    : index === menuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </main>
  );
};

export default HomeNavbar;
