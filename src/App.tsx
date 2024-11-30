import { onAuthStateChanged } from "firebase/auth";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../firebase.ts";
import PrimarySearchAppBar from "./components/AppBar.tsx";
import Footer from "./components/Footer.tsx";
import ProductDetails from "./components/ProductDetails.tsx";
import ProtectedRoute from "./components/protectedRoute.tsx";
import { getUser } from "./redux/api/userAPI.ts";
import { userExist, userNotExist } from "./redux/reducer/userReducer.ts";
import DashboardLayoutBasic from "./components/DashboardLayout.tsx";

// User Logged In Imports
const Home = lazy(() => import("./pages/home"));
const Search = lazy(() => import("./pages/search"));
const Cart = lazy(() => import("./pages/cart"));
const Shipping = lazy(() => import("./pages/shipping.tsx"));
const Login = lazy(() => import("./pages/login.tsx"));
const Register = lazy(() => import("./pages/register.tsx"));
const Orders = lazy(() => import("./pages/orders.tsx"));
const Contact = lazy(() => import("./components/ContactUs.tsx"));
const NotFound = lazy(() => import("./pages/not-found"));

// Loader
const Loader = lazy(() => import("./components/loader.tsx"));

// Admin Imports
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Products = lazy(() => import("./pages/admin/products.tsx"));
const Transaction = lazy(() => import("./pages/admin/transaction.tsx"));
const NewProduct = lazy(() => import("./pages/admin/management/newProduct.tsx"));
const ProductManagement = lazy(() => import("./pages/admin/management/productManagement.tsx"));
const TransactionManagement = lazy(() => import("./pages/admin/management/transactionManagement.tsx"));
const BarChart = lazy(() => import("./pages/charts/barCharts.tsx"));
const LineChart = lazy(() => import("./pages/charts/lineCharts.tsx"));
const PieChart = lazy(() => import("./pages/charts/pieCharts.tsx"));
const Coupon = lazy(() => import("./pages/apps/coupon.tsx"));
const StopWatch = lazy(() => import("./pages/apps/stopWatch.tsx"));
const Toss = lazy(() => import("./pages/apps/toss.tsx"));
const OrderDetails = lazy(() => import("./pages/orderDetails.tsx"));

function App() {
 
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else dispatch(userNotExist());
      
    });
  }, [dispatch]);

  return (
    <>
      <DynamicNavbar />
      <Suspense fallback={<Loader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />

          {/* Protected User Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/orderDetails/:id" element={<OrderDetails />} />
          </Route>
         
            <Route path="/dashboard" element={<DashboardLayoutBasic />} />
            <Route path="/dashboard/products/:id" element={<DashboardLayoutBasic />} />
          {/* Admin Routes */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            <Route path="/admin/chart/bar" element={<BarChart />} />
            <Route path="/admin/chart/line" element={<LineChart />} />
            <Route path="/admin/chart/pie" element={<PieChart />} />
            <Route path="/admin/apps/coupon" element={<Coupon />} />
            <Route path="/admin/apps/stopWatch" element={<StopWatch />} />
            <Route path="/admin/apps/toss" element={<Toss />} />
            <Route path="/dashboard/products/new" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<ProductManagement />} />
            <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        </AnimatePresence>
      </Suspense>
      <DynamicFooter />
      <Toaster />
      </>
  );
}

const DynamicNavbar: React.FC = () => {
  const location = useLocation();

  // Check if the current route is for doctor pages
 
  const isAdminRoute = location.pathname.startsWith('/dashboard');
  // Render the appropriate navbar
  if(isAdminRoute){
    return <></>;
  }  else{
    return <PrimarySearchAppBar />
  }
};
const DynamicFooter: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/dashboard');
  if(isAdminRoute){
    return <></>;
  }  else{
   return <Footer />
  }
};

export default App;
