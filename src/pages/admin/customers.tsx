import { BsSearch } from 'react-icons/bs'
import { FaRegBell } from 'react-icons/fa'
import userImg from "../../assets/images/userpic.png"
import AdminSideBar from '../../components/adminSideBar'
const Customers = () => {
  return (
    <div className='grid grid-cols-[20%_80%] gap-4 h-screen pr-4 bg-gray-100'>
    <AdminSideBar />
    
    <main className=' overflow-y-auto w-full'>
      <div className=' h-10 px-2 py-4 flex-row border-b-2 border-black border-opacity-35 border-solid flex content-center items-center gap-4'>
        <BsSearch />
        <input type="text" placeholder='Search for data, users, docs' className=' mr-auto w-full py-4 px-0 border-none outline-none bg-inherit' />
        <FaRegBell className=' opacity-70 text-sm'/>
        <img src={userImg} alt="User" className=' h-8 w-8 rounded-3xl' />
      </div>
      
    </main>
    </div>
  )
}


export default Customers