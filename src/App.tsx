import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { lazy, Suspense, useEffect } from "react"
import Header from "./components/header.tsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store.ts";
import ProtectedRoute from "./components/protectedRoute.tsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.ts";
import { getUser } from "./redux/api/userAPI.ts";
import { userExist, userNotExist } from "./redux/reducer/userReducer.ts";

// User Logged In Imports
const Home   = lazy(()=> import("./pages/home")) 
const Search = lazy(()=> import("./pages/search"))   
const Cart   = lazy(()=> import("./pages/cart")) 
const Shipping   = lazy(()=> import("./pages/shipping.tsx")) 
const Login =  lazy(()=> import("./pages/login.tsx"))

const Orders =  lazy(()=> import("./pages/orders.tsx"))
const NotFound = lazy(() => import("./pages/not-found"));
// Loader
const Loader = lazy(()=>import("./components/loader.tsx"))
//  Admin Imports
const Dashboard   = lazy(()=> import("./pages/admin/dashboard")) 
const Customers   = lazy(()=> import("./pages/admin/customers")) 
const Products   = lazy(()=> import("./pages/admin/products.tsx")) 
const Transaction   = lazy(()=> import("./pages/admin/transaction.tsx")) 
const NewProduct   = lazy(()=> import("./pages/admin/management/newProduct.tsx")) 
const ProductManagement   = lazy(()=> import("./pages/admin/management/productManagement.tsx")) 
const TransactionManagement   = lazy(()=> import("./pages/admin/management/transactionManagement.tsx")) 
const BarChart   = lazy(()=> import("./pages/charts/barCharts.tsx")) 
const LineChart   = lazy(()=> import("./pages/charts/lineCharts.tsx")) 
const PieChart   = lazy(()=> import("./pages/charts/pieCharts.tsx")) 
const Coupon   = lazy(()=> import("./pages/apps/coupon.tsx")) 
const StopWatch   = lazy(()=> import("./pages/apps/stopWatch.tsx")) 
const Toss   = lazy(()=> import("./pages/apps/toss.tsx")) 
const OrderDetails = lazy(()=> import("./pages/orderDetails.tsx")) 
function App() {
  const {user} = useSelector((state:RootState)=>state.userReducer)
  const dispatch = useDispatch();
 
  
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else dispatch(userNotExist());
    });
  }, []);
  return (
  <Router>
    {/*  Header */}
    <Header user={user} />
    <Suspense fallback={<Loader />}>
    <Routes>

      // Not Logged In Routes
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/login" element={<Login />} />
    // User Logged In Routes
   
      <Route path="/orders" element ={<Orders />} />
      <Route path="/orders/orderDetails/:id" element ={<OrderDetails />} />
     
      // Admin Routes
    
      <Route 
      element={<ProtectedRoute isAuthenticated={true} admin={user?.role==="admin"? true : false} adminOnly={true} />}
      >
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/customers" element={<Customers />} />
      <Route path="/admin/products" element={<Products />} />
      <Route path="/admin/transaction" element={<Transaction />} />

      {/* Charts */}
      <Route path="/admin/chart/bar" element={<BarChart />} />
      <Route path="/admin/chart/line" element={<LineChart />} />
      <Route path="/admin/chart/pie" element={<PieChart />} />
      {/* Apps */}
      <Route path="/admin/apps/coupon" element={<Coupon />} />
      <Route path="/admin/apps/stopWatch" element={<StopWatch />} />
      <Route path="/admin/apps/toss" element={<Toss />} />
      {/* Management */}
      <Route path="/admin/products/new" element={<NewProduct />} />
      <Route path="/admin/product/:id" element={<ProductManagement />} />
      <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
    <ToastContainer />
  </Router>
  )
}

export default App
