import BarChartIcon from '@mui/icons-material/BarChart';
import CreateIcon from '@mui/icons-material/Create';
import logo from "../assets/logo-removebg-preview.png"
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { createTheme } from '@mui/material/styles';
import { AppProvider, Session, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaShoppingBag, FaStopwatch } from 'react-icons/fa';
import { RiCoupon3Fill } from 'react-icons/ri';
import Customers from '../pages/admin/customers';
import Dashboard from '../pages/admin/dashboard';
import NewProduct from '../pages/admin/management/newProduct';
import Products from '../pages/admin/products';
import Transaction from '../pages/admin/transaction';
import Coupon from '../pages/apps/coupon';
import StopWatch from '../pages/apps/stopWatch';
import Toss from '../pages/apps/toss';
import BarCharts from '../pages/charts/barCharts';
import LineCharts from '../pages/charts/lineCharts';
import PieCharts from '../pages/charts/pieCharts';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'products',
    title: 'Products',
    icon: <InventoryIcon />,
    children: [
        {
        segment: 'all',
        title: 'All Products',
        icon: <FaShoppingBag  />
    },
        {
        segment: 'new',
        title: 'New Product',
        icon: <CreateIcon  />
    },
]
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'roles',
    title: 'Roles',
    icon: <VerifiedUserIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
 
  {
    segment: 'charts',
    title: 'Charts',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'bar',
        title: 'Bar Chart',
        icon: <FaChartBar />,
      },
      {
        segment: 'pie',
        title: 'Pie Chart',
        icon: <FaChartPie />,
      },
      {
        segment: 'line',
        title: 'Line Chart',
        icon: <FaChartLine />,
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Apps',
  },
  {
    segment: 'stopwatch',
    title: 'Stop Watch',
    icon: <FaStopwatch />,
  },
  {
    segment: 'coupon',
    title: 'Coupon',
    icon: <RiCoupon3Fill />,
  },
  {
    segment: 'toss',
    title: 'Toss',
    icon: <FaGamepad />,
  },
  
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: false },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }: { pathname: string
}) {
  if(pathname=='/dashboard'){
    
    return (
        <Dashboard />
      );
  } else if(pathname=='/orders'){
    return (<Transaction />)
  } else if(pathname=='/products/all'){
    return (<Products  />)
  } else if(pathname=='/products/new'){
    return (<NewProduct  />)
  } else if(pathname=='/roles'){
    return (<Customers  />)
  }  else if(pathname=='/charts/bar'){
    return (<BarCharts  />)
  }  else if(pathname=='/charts/line'){
    return (<LineCharts  />)
  }  else if(pathname=='/charts/pie'){
    return (<PieCharts  />)
  } else if(pathname=='/stopwatch'){
    return (<StopWatch  />)
  } else if(pathname=='/toss'){
    return (<Toss  />)
  } else if(pathname=='/coupon'){
    return (<Coupon  />)
  } 
}



export default function DashboardLayoutBasic() {
 const {user} = useSelector((state:RootState)=>state.userReducer)
 const navigate = useNavigate()
    const [session, setSession] = useState<Session | null>({
        user: {
          name: user?.name!,
          email: user?.email,
          image: user?.photo as any,
        },
      });
    
      const authentication = useMemo(() => {
        return {
          signIn: () => {
            setSession({
              user: {
                name: user?.name!,
                email: user?.email,
                image: user?.photo as any,
              },
            });
          },
          signOut: async() => {
            setSession(null);
            try {
                await signOut(auth);
                toast.success("Sign Out Successfully");
                navigate("/")
              } catch (error) {
                toast.error("Sign Out Fail");
              }
          },
        };
      }, []);
  const router = useDemoRouter('/dashboard');
  return (
   
    <AppProvider
      navigation={NAVIGATION}
      pathname={"/cart"}
      session={session}
      authentication={authentication}
      router={router}
      theme={demoTheme}
      branding={{
        logo: <img src={logo} alt="TECHNIFY ZONE logo" />,
        title: 'TECHNIFY ZONE',
      }}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}
