import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import './style.css';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Logo from '../../images/logo1.png';
import { fontWeight, height } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../actions";
const drawerWidth = 240;

const openedMixin = (theme) => ({
width: drawerWidth,
transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
}),
overflowX: 'hidden',
});

const closedMixin = (theme) => ({
transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
}),
overflowX: 'hidden',
width: `calc(${theme.spacing(7)} + 1px)`,
[theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
},
});

const DrawerHeader = styled('div')(({ theme }) => ({
display: 'flex',
alignItems: 'center',
justifyContent: 'flex-end',
padding: theme.spacing(0, 1),
// necessary for content to be below app bar
...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
zIndex: theme.zIndex.drawer + 1,
transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
}),
...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
    }),
}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
    }),
}),
);

const navigation = [
    {
        path:'/',
        name:'Home',
        icon:'HomeIcon'
    },
    {
        path:'/category',
        name:'Category',
        icon:'HomeIcon'
    },
    {
        path:'/products',
        name:'Product',
        icon:'HomeIcon'
    },
    {
        path:'/orders',
        name:'Orders',
        icon:'HomeIcon'
    }
]
function getAvataricon(icon){
    switch (icon) {
      case 'Home':
        return (<HomeIcon />)  
      case 'Category':
        return (<CategoryIcon />);
      case 'Product':
        return (<ProductionQuantityLimitsIcon />);
        case 'Orders':
            return (<ShoppingCartIcon />);
      default:
        return (<HomeIcon />);
    }
  }
export default function Navbar() {
const theme = useTheme();
const [open, setOpen] = React.useState(false);

const handleDrawerOpen = () => {
    setOpen(true);
};

const handleDrawerClose = () => {
    setOpen(false);
};
const dispatch = useDispatch();
const logout = () => {
    dispatch(signout());
};
return (
    <Box sx={{ display: 'flex' }} className={`navbarDrawer ${open ?  `active` : ``}` }>
    <CssBaseline />
    <AppBar position="fixed" open={open}  >
        <Toolbar sx={{justifyContent:'space-between'}}>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
            }}
        >
            <MenuIcon />
        </IconButton>
        <IconButton  onClick={logout} ><LogoutIcon /></IconButton>
        </Toolbar>
    </AppBar>
    <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{justifyContent:'space-between'}}>
        <Typography variant="h6" noWrap component="div" sx={{color:'#FFAF3A',fontWeight:700,letterSpacing:'2px'}}>
            GO ANUSHA
        </Typography>
        <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
        </DrawerHeader>
        <Divider />
        <List className='navlist'>
        
        {navigation.map((text, index) => (
            
            <NavLink key={text.name} to={`${text.path}`} className='navlink' exact={true}>
                <div className='list1'>
                    <ListItem button className='list'  >
                        <ListItemIcon>
                            {getAvataricon(text.name)}
                        </ListItemIcon>
                        <ListItemText primary={text.name} />
                    </ListItem>
                </div>
            </NavLink>
        ))}
        
        </List>
        <Divider />
        {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
            <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
            </ListItem>
        ))}
        </List> */}
    </Drawer>
    </Box>
);
}
