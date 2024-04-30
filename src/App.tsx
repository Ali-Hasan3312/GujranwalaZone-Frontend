import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import Loader from "./components/loader"
// const Home   = lazy(()=> import("./pages/home")) 
// const Search = lazy(()=> import("./pages/search"))   
// const Cart   = lazy(()=> import("./pages/cart")) 
// const Loader = lazy(()=>import("./components/loader.tsx"))
const Dashboard   = lazy(()=> import("./pages/admin/dashboard")) 
const Customers   = lazy(()=> import("./pages/admin/customers")) 
const Products   = lazy(()=> import("./pages/admin/products.tsx")) 
const Transaction   = lazy(()=> import("./pages/admin/transaction.tsx")) 
function App() {
 

  return (
  <Router>
    <Suspense fallback={<Loader />}>
    <Routes>
      {/* <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/cart" element={<Cart />} /> */}
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/customers" element={<Customers />} />
      <Route path="/admin/products" element={<Products />} />
      <Route path="/admin/transaction" element={<Transaction />} />

    </Routes>
    </Suspense>
  </Router>
  )
}

export default App
