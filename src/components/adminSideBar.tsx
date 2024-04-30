import { RiDashboardFill, RiShoppingBag3Fill } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'
import { AiFillFileText } from 'react-icons/ai'
import { IoIosPeople } from 'react-icons/io'
const AdminSideBar = () => {
    const location = useLocation()
  return (
   <aside className=' w-full bg-white p-4 z-10 overflow-y-auto overflow-hidden'>
    <h2>Logo.</h2>
    <div className='my-4 mx-4'>
        <h5 className=' tracking-wider font-light uppercase opacity-80 my-2 mx-0'>Dashboard</h5>
        
        <ul className=''>
            <li  className=' py-1 px-4 rounded-lg'>
                <Link to={"/admin/dashboard"} className={`flex content-center items-center gap-4 text-black text-opacity-85 ${location.pathname==='/admin/dashboard'? 'text-red-500' : 'text-black'}`}>
                    <RiDashboardFill />
                    Dashboard
                </Link>

            </li>
            <li className=' py-1 px-4 rounded-lg'>
                <Link to={"/admin/products"} className={`flex content-center items-center gap-4 text-black text-opacity-85 ${location.pathname==='/admin/products'? 'text-red-500' : 'text-black'}`}>
                <RiShoppingBag3Fill />
                Products
                </Link>
            </li>
            <li className=' py-1 px-4 rounded-lg'>
                <Link to={"/admin/customers"} className={`flex content-center items-center gap-4 text-black text-opacity-85 ${location.pathname==='/admin/customers'? 'text-red-500' : 'text-black'}`}>
                <IoIosPeople />
                Customers
                </Link>
            </li>
            <li className=' py-1 px-4 rounded-lg'>
                <Link to={"/admin/transaction"} className={`flex content-center items-center gap-4 text-black text-opacity-85 ${location.pathname==='/admin/transaction'? 'text-red-500' : 'text-black'}`}>
                <AiFillFileText />
                Transaction
                </Link>
            </li>

        </ul>
       
    </div>
    <div className='my-4 mx-4'>
        <h5 className=' tracking-wider font-light uppercase opacity-80 my-2 mx-0'>Charts</h5>
        
        <ul className=''>
            <li  className=' py-1 px-4 rounded-lg'>
                <Link to={"/admin/dashboard"} className={`flex content-center items-center gap-4 text-black text-opacity-85 ${location.pathname==='/admin/dashboard'? 'text-red-500' : 'text-black'}`}>
                    <RiDashboardFill />
                    Dashboard
                </Link>

            </li>
            <li className=' py-1 px-4 rounded-lg'>
                <Link to={"/admin/products"} className={`flex content-center items-center gap-4 text-black text-opacity-85 ${location.pathname==='/admin/products'? 'text-red-500' : 'text-black'}`}>
                <RiShoppingBag3Fill />
                Products
                </Link>
            </li>
            <li className=' py-1 px-4 rounded-lg'>
                <Link to={"/admin/customers"} className={`flex content-center items-center gap-4 text-black text-opacity-85 ${location.pathname==='/admin/customers'? 'text-red-500' : 'text-black'}`}>
                <IoIosPeople />
                Customers
                </Link>
            </li>
            <li className=' py-1 px-4 rounded-lg'>
                <Link to={"/admin/transaction"} className={`flex content-center items-center gap-4 text-black text-opacity-85 ${location.pathname==='/admin/transaction'? 'text-red-500' : 'text-black'}`}>
                <AiFillFileText />
                Transaction
                </Link>
            </li>

        </ul>
       
    </div>
   </aside>
  )
}






export default AdminSideBar