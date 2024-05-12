import { useState } from 'react'
import { BiShoppingBag } from 'react-icons/bi'
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const user = {_id: "ldfjal",role:""}
const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const logoutHandler = ()=>{
        setIsOpen(false)
    }
  return (
   <nav className='header flex  justify-end items-stretch gap-5 p-4'>
    <Link onClick={()=> setIsOpen(false)} className=' text-gray-800 tracking-[2px] text-md hover:text-teal-500 mb-2 uppercase' to={"/"} >Home</Link>
    <Link onClick={()=> setIsOpen(false)} className=' text-gray-800 text-md hover:text-teal-500 mt-1' to={"/search"} ><FaSearch /></Link>
    <Link onClick={()=> setIsOpen(false)} className=' text-gray-800  text-lg hover:text-teal-500 mb-2' to={"/cart"} ><BiShoppingBag /></Link>

    {
        user?._id? ( 
            <>
            <button onClick={()=> setIsOpen(true)} className=' border-none text-lg cursor-pointer bg-transparent hover:text-teal-500 mb-9'>
                <FaUser />
            </button>
            <dialog open={isOpen} className='firstdialog border border-solid border-gray-300 rounded p-3 w-[100px] '>
                <div className='flex flex-col justify-start items-center gap-1'>
                    {
                       user.role==="admin" && (
                        <Link onClick={()=> setIsOpen(false)} className=' text-gray-800 tracking-[2px] text-lg hover:text-teal-500' to={"/admin/dashboard"}>Admin</Link>
                       )
                    }
                    <Link onClick={()=> setIsOpen(false)} className=' text-gray-800 tracking-[2px] text-lg hover:text-teal-500' to={"/orders"}>Orders</Link>
                    <button onClick={logoutHandler}  className=' border-none text-lg cursor-pointer bg-transparent hover:text-teal-500'>
                        <FaSignOutAlt />
                    </button>
                </div>
            </dialog>
            </>
        ) : (
            <Link to={"/login"} >
             <FaSignInAlt />
            </Link>
           

        )
    }
   </nav>
  )
}

export default Header