import { useState } from 'react'
import { BiShoppingBag } from 'react-icons/bi'
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { logoutUser } from '../redux/features/auth/authThunks'
import { toast } from 'react-toastify'

const user = {_id: "ldfjal",role:""}
const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);
 const navigate = useNavigate()

    const logoutHandler = ()=>{
        if(authState.user)
         {
            setIsOpen(true)
            dispatch(logoutUser())
            toast.success("User Logged Out Successfully")
            navigate("/user/login")
        
        }
          else{
            setIsOpen(false)
          }
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
                    <button  className=' border-none text-lg cursor-pointer bg-transparent hover:text-teal-500'>
                        <Link to={"/login"}>
                        <FaSignOutAlt onClick={logoutHandler} />
                        </Link>
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