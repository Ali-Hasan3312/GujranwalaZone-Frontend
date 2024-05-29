import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import Header from "./components/header.tsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// User Logged In Imports
const Home   = lazy(()=> import("./pages/home")) 
const Search = lazy(()=> import("./pages/search"))   
const Cart   = lazy(()=> import("./pages/cart")) 
const Shipping   = lazy(()=> import("./pages/shipping.tsx")) 
const Login =  lazy(()=> import("./pages/login.tsx"))
const Register =  lazy(()=> import("./pages/register.tsx"))
const ForgotPassword =  lazy(()=> import("./pages/forgotPassword.tsx"))
const ResetPassword =  lazy(()=> import("./pages/resetPassword.tsx"))
const Orders =  lazy(()=> import("./pages/orders.tsx"))
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
 

  return (
  <Router>
    {/*  Header */}
    <Header />
    <Suspense fallback={<Loader />}>
    <Routes>
    // User Logged In Routes
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password-reset/:token" element={<ResetPassword />} />
      <Route>
      <Route path="/shipping" element={<Shipping />} />
      </Route>
      <Route path="/orders" element ={<Orders />} />
      <Route path="/orders/orderDetails" element ={<OrderDetails />} />

      // Admin Routes
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
      <Route path="/admin/products/:id" element={<ProductManagement />} />
      <Route path="/admin/transaction/:id" element={<TransactionManagement />} />

    </Routes>
    </Suspense>
    <ToastContainer />
  </Router>
  )
}

export default App
