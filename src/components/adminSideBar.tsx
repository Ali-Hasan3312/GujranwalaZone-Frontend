import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag3Fill } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'
import { AiFillFileText } from 'react-icons/ai'
import { IoIosPeople } from 'react-icons/io'
import { FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaStopwatch } from 'react-icons/fa'
const AdminSideBar = () => {
    const location = useLocation()
  return (
   <aside className='bg-white p-4 z-10 overflow-y-auto overflow-hidden'>
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
                <Link to={"/admin/chart/bar"} className={`flex content-center items-center gap-4 text-black text-opacity-85 ${location.pathname==='/admin/chart/bar'? 'text-red-500' : 'text-black'}`}>
                    <FaChartBar />
                    Bar
                </Link>

            </li>
            <li className=' py-1 px-4 rounded-lg'>
                <Link to={"/admin/chart/pie"} className={`flex content-center items-center gap-4 text-black text-opacity-85 ${location.pathname==='/admin/chart/pie'? 'text-red-500' : 'text-black'}`}>
                <FaChartPie />
                Pie
                </Link>
            </li>
            <li className=' py-1 px-4 rounded-lg'>
                <Link to={"/admin/chart/line"} className={`flex content-center items-center gap-4 text-black text-opacity-85 ${location.pathname==='/admin/chart/line'? 'text-red-500' : 'text-black'}`}>
                <FaChartLine />
                Line
                </Link>
            </li>
           

        </ul>
       
    </div>
    <div className='my-4 mx-4'>
        <h5 className=' tracking-wider font-light uppercase opacity-80 my-2 mx-0'>Apps</h5>
        
        <ul className=''>
            <li  className=' py-1 px-4 rounded-lg'>
                <Link to={"/admin/apps/stopwatch"} className={`flex content-center items-center gap-4 text-black text-opacity-85 ${location.pathname==='/admin/apps/stopwatch'? 'text-red-500' : 'text-black'}`}>
                    <FaStopwatch />
                    Stopwatch
                </Link>

            </li>
            <li className=' py-1 px-4 rounded-lg'>
                <Link to={"/admin/apps/coupon"} className={`flex content-center items-center gap-4 text-black text-opacity-85 ${location.pathname==='/admin/apps/coupon'? 'text-red-500' : 'text-black'}`}>
                <RiCoupon3Fill />
                Coupon
                </Link>
            </li>
            <li className=' py-1 px-4 rounded-lg'>
                <Link to={"/admin/apps/toss"} className={`flex content-center items-center gap-4 text-black text-opacity-85 ${location.pathname==='/admin/apps/toss'? 'text-red-500' : 'text-black'}`}>
                <FaGamepad />
                Toss
                </Link>
            </li>
           

        </ul>
       
    </div>
   </aside>
  )
}






export default AdminSideBar