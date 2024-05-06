'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
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

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
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
    <div>
      <Button onClick={toggleDrawer(true)} style={{ fontSize: '24px' }}>
        <MenuIcon />
        Menu
      </Button>
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
    </div>
  );
}
