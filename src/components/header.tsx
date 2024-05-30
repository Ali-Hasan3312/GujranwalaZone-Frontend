import { useState, useEffect } from 'react'
import { BiShoppingBag } from 'react-icons/bi'
import { FaSearch, FaSignOutAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logoutUser } from '../redux/features/auth/authThunks'
import { AppDispatch, RootState } from '../redux/store'

// const user = { _id: "ldfjal", role: "" }
const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [hasLoggedOut, setHasLoggedOut] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()
    const authState = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        // Effect to handle side effects or reset state based on auth changes
        if (!authState.user) {
            setIsOpen(false)
            if (hasLoggedOut) {
                toast.success("User Logged Out Successfully")
                navigate("/login")
                setHasLoggedOut(false)
            }
        }
    }, [authState.user, hasLoggedOut, navigate])

    const logoutHandler = () => {
        if (authState.user) {
            setIsOpen(true)
            dispatch(logoutUser())
            setHasLoggedOut(true)
        } else {
            setIsOpen(false)
        }
    }

    return (
        <nav className='header flex justify-end gap-5 p-4'>
            <Link onClick={() => setIsOpen(false)} className='text-gray-800 tracking-[2px] text-md hover:text-teal-500 mb-2 uppercase' to={"/"}>Home</Link>
            <Link onClick={() => setIsOpen(false)} className='text-gray-800 text-md hover:text-teal-500 mt-1' to={"/search"}><FaSearch /></Link>
            <Link onClick={() => setIsOpen(false)} className='text-gray-800 text-lg hover:text-teal-500 mb-2' to={"/cart"}><BiShoppingBag /></Link>

            {authState.user?.user._id ? (
                <>
                    <button onClick={() => setIsOpen(true)} className='border-none text-lg cursor-pointer bg-transparent hover:text-teal-500 mb-9'>
                        <img src={authState.user.user.photo} alt="" className='h-8 w-8 mt-[-3px]' />
                    </button>
                    <dialog open={isOpen} className='firstdialog border border-solid border-gray-300 rounded p-3 w-[100px]'>
                        <div className='flex flex-col justify-start items-center gap-1'>
                            {authState.user?.user.role === "admin" && (
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
