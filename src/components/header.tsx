import { useState } from 'react'
import { BiShoppingBag } from 'react-icons/bi'
import { FaSearch, FaSignOutAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";

import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { User } from '../redux/types/types'

interface PropsType {
    user: User | null;
  }
// const user = { _id: "ldfjal", role: "" }
const Header = ({ user }: PropsType) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    
    const logoutHandler = async() => {
        try {
            await signOut(auth);
            toast.success("Sign Out Successfully");
            navigate("/")
            setIsOpen(false);
          } catch (error) {
            toast.error("Sign Out Fail");
          }
    }

    return (
        <nav className='header flex justify-end gap-5 p-4'>
            <Link onClick={() => setIsOpen(false)} className='text-gray-800 tracking-[2px] text-md hover:text-teal-500 mb-2 uppercase' to={"/"}>Home</Link>
            <Link onClick={() => setIsOpen(false)} className='text-gray-800 text-md hover:text-teal-500 mt-1' to={"/search"}><FaSearch /></Link>
            <Link onClick={() => setIsOpen(false)} className='text-gray-800 text-lg hover:text-teal-500 mb-2' to={"/cart"}><BiShoppingBag /></Link>

            {user?._id ? (
                <>
                    <button onClick={() => setIsOpen(true)} className='border-none text-lg cursor-pointer bg-transparent hover:text-teal-500 mb-9'>
                        <img src={typeof user.photo === 'string' ? user.photo : ''} alt="" className='h-8 w-8 mt-[-3px] rounded-full' />
                    </button>
                    <dialog open={isOpen} className='firstdialog border border-solid border-gray-300 rounded p-3 w-[100px]'>
                        <div className='flex flex-col justify-start items-center gap-1'>
                            {user.role === "admin" && (
                                <Link onClick={() => setIsOpen(true)} className='text-gray-800 tracking-[2px] text-lg hover:text-teal-500' to={"/admin/dashboard"}>Admin</Link>
                            )}
                            <Link onClick={() => setIsOpen(false)} className='text-gray-800 tracking-[2px] text-lg hover:text-teal-500' to={"/orders"}>Orders</Link>
                            <button className='border-none text-lg cursor-pointer bg-transparent hover:text-teal-500'>
                                <FaSignOutAlt onClick={logoutHandler} />
                            </button>
                        </div>
                    </dialog>
                </>
            ) : (
                <Link to={"/login"} className='text-lg bg-transparent hover:text-teal-500 mt-[-5px]'>
                    Login
                </Link>
            )}
        </nav>
    )
}

export default Header
