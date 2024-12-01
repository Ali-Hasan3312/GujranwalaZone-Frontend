import { default as AccountCircle, default as AccountCircleIcon } from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { signOut } from 'firebase/auth';
import * as React from 'react';
import toast from "react-hot-toast";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import logo from "../assets/logo-removebg-preview.png";
import { RootState } from '../redux/store';
import { Divider, Typography } from '@mui/material';

   
const logoutHandler = async() => {
    try {
        await signOut(auth);
        toast.success("Sign Out Successfully");
      } catch (error) {
        toast.error("Sign Out Fail");
      }
}

const SidebarList = [
  {
    id: 1,
    page: "Register",
    icon: <HowToRegIcon />,
    to: "/register"
  },
  {
    id: 2,
    page: "login",
    icon: <LoginIcon />,
    to: "/login"
  },
  {
    id: 3,
    page: "Home",
    icon: <HomeIcon />,
    to: "/"
  },
  {
    id: 4,
    page: "Products",
    icon: <InventoryIcon />,
    to: "/search"
  },
  {
    id: 5,
    page: "Orders",
    icon: <LocalShippingIcon />,
    to: "/orders"
  },
  {
    id: 6,
    page: "Cart",
    icon: <ShoppingCartIcon />,
    to: "/cart"
  },
  {
    id: 7,
    page: "My Profile",
    icon: <AccountCircleIcon  />,
    to: "/profile"
  },
  {
    id: 8,
    page: "Contact Us",
    icon: <PermContactCalendarIcon />,
    to: "/contact"
  },
 
]

export default function PrimarySearchAppBar() {
  const cart = useSelector((state:RootState)=>state.cartReducer.cartItems)
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [open, setOpen] = React.useState(false);
  
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  
 const DrawerList = (
  <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
    <ListItem>
     <Link to={"/"} className=' w-full'>
     <ListItemButton>
          <img src={logo} className='h-16' alt="" />
      </ListItemButton>
     </Link>
    </ListItem>
    <Divider />
    <List>
      {SidebarList.map((item) => (
        <ListItem key={item.id} disablePadding>
         <ListItemButton>
         <Link to={item.to} className='flex items-center w-full gap-2'>
              <IconButton color='primary'>
              {item.icon}
              </IconButton>
            <ListItemText primary={item.page} />
         </Link>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
   
  </Box>
);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  console.log(mobileMoreAnchorEl);
  
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleLogout = () => {
   logoutHandler()
    setAnchorEl(null);
    handleMobileMenuClose();
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
      <Link to={"/dashboard"}>
      Dashboard
      </Link>
      </MenuItem>
      <MenuItem >
      {user? (<Link onClick={()=>{
        handleLogout()
      }} to={"/"}>Logout</Link>) : (<Link onClick={handleMenuClose} className=' w-full' to={"/login"}>login</Link>)}
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon  />
          </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
         <Link to={"/"}>
         <Box>
          <img src={logo} className='h-20 w-28' alt="" />
         </Box>
         </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: 'flex' }, alignItems:'center' }}>
           
            <Link to={"/search"}>
            <IconButton
              size="large"
              aria-label=""
              color="inherit"
            >
               <SearchIcon />
            </IconButton>
            </Link>
            <Link className=' relative' to={"/cart"}>
            <IconButton
              size="large"
              aria-label=""
              color="inherit"
            >
              <span className='absolute text-white text-xs top-2 right-1 h-4 w-4 bg-red-500 flex items-center justify-center rounded-full'>{cart.length}</span>
               <ShoppingCartIcon />
            </IconButton>
            </Link>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
             {user? (<>
             <img src={`${user.photo}`} className='h-10 w-10 rounded-full' alt={user.name} />
             </>):(<>
             <AccountCircle />
             </>)}
             
            </IconButton>
          </Box>
          
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
