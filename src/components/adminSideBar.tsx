import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag3Fill } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'
import { AiFillFileText } from 'react-icons/ai'
import { IoIosPeople } from 'react-icons/io'
import { FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaStopwatch } from 'react-icons/fa'
import { HiMenuAlt4 } from 'react-icons/hi'
import { useEffect, useState } from 'react'
const AdminSideBar = () => {
    const location = useLocation()
    
  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  return (
    <>
     {phoneActive && (
        <button id="hamburger" onClick={() => setShowModal(true)} className=' grid place-items-center h-12 w-12 border-none outline-none cursor-pointer text-blue-500 bg-opacity-100 fixed top-4 left-4 text-3xl bg-white rounded-full z-[9]'>
          <HiMenuAlt4 />
        </button>
      )}
   <aside className='bg-white p-4 z-10 overflow-y-auto overflow-hidden'  style={
          phoneActive
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: showModal ? "0" : "-20rem",
                transition: "all 0.5s",
              }
            : {}
        }>
    <h2 className=' tracking-wider font-semibold uppercase my-2 mx-0 mt-[-20px]'>Gujranwala Zone</h2>
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
                <Link to={"/admin/products"} className={`flex content-center items-center gap-4 text-black text-opacity-85 ${location.pathname.includes('/admin/product')? 'text-red-500' : 'text-black'} `}>
                <RiShoppingBag3Fill />
                Products
                </Link>
            </li>
            <li className=' py-1 px-4 rounded-lg'>
                <Link to={"/admin/customers"} className={`flex content-center items-center gap-4 text-black text-opacity-85 ${location.pathname.includes('/admin/customers')? 'text-red-500' : 'text-black'}`}>
                <IoIosPeople />
                Customers
                </Link>
            </li>
            <li className=' py-1 px-4 rounded-lg'>
                <Link to={"/admin/transaction"} className={`flex content-center items-center gap-4 text-black text-opacity-85 ${location.pathname.includes('/admin/transaction')? 'text-red-500' : 'text-black'}`}>
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
    {phoneActive && (
          <button id="close-sidebar" onClick={() => setShowModal(false)} className=' w-[80%] my-4 mx-auto block p-3 border-none outline-none cursor-pointer bg-red-500 text-white rounded-lg'>
            Close
          </button>
        )}
   </aside>
   </>
  )
}






export default AdminSideBar