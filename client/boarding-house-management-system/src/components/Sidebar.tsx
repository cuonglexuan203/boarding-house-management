'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { motion } from 'framer-motion';
import {
  Badge,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Tab,
  Tabs,
  Tooltip,
} from '@nextui-org/react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import ReceiptIcon from '@mui/icons-material/Receipt';
import GavelIcon from '@mui/icons-material/Gavel';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PersonIcon from '@mui/icons-material/Person';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const smallNav = React.useRef<HTMLElement | null>(null);
  const route = useRouter();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleListItemClick = (text: string) => {
    switch (text) {
      case 'Room management':
        route.push('/manage');
        break;
      case 'Bill management':
        route.push('/manage');
        break;
      case 'Contract management':
        route.push('/manage');
        break;
      case 'Service management':
        route.push('/manage');
        break;
      case 'Tenant management':
        route.push('/manage');
        break;
      default:
        break;
    }
    setOpen(false);
  };

  return (
    <motion.div
      className="fixed z-50 left-4 top-1/2 transform -translate-y-1/2"
      // @ts-ignore
      ref={smallNav}
      drag
      dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
      dragPropagation
      dragElastic={1}
      dragConstraints={{
        left: 0,
        right: smallNav?.current
          ? window.innerWidth - smallNav.current.offsetWidth - 28
          : 0,
        top: -(smallNav?.current ? window.innerHeight / 2 : 0),
        bottom: smallNav?.current
          ? window.innerHeight / 2 - smallNav.current.offsetHeight - 4
          : 0,
      }}
    >
      <div className="p-8">
        <Tooltip
          content="Management menu"
          color="primary"
          placement="left-start"
          closeDelay={200}
          delay={500}
        >
          <Button
            variant="solid"
            size="sm"
            className="focus:outline-none rounded-full bg-orange-400 w-6 h-12 flex items-center justify-center shadow-2xl drop-shadow-2xl"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon className="text-white" />
          </Button>
        </Tooltip>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 300 }} role="presentation">
          <List>
            {[
              { text: 'Room management', icon: <HouseSidingIcon /> },
              { text: 'Bill management', icon: <ReceiptIcon /> },
              { text: 'Contract management', icon: <GavelIcon /> },
              { text: 'Service management', icon: <WaterDropIcon /> },
              { text: 'Tenant management', icon: <PersonIcon /> },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => handleListItemClick(item.text)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </motion.div>
  );
}
