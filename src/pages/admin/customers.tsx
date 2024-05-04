import { ReactElement, useCallback, useState } from 'react'
import AdminSideBar from '../../components/adminSideBar'
import { Column } from 'react-table'
import TableHOC from '../../components/tableHOC'
import { FaTrash } from 'react-icons/fa'

interface DataType{
  avatar: ReactElement,
  name: string,
  role: string,
  gender: string,
  email: string,
  action: ReactElement
  }
  
  const columns: Column<DataType>[] = [
    {
      Header: 'Avatar',
      accessor: "avatar"
    },
    {
      Header: 'Name',
      accessor: "name"
    },
    {
      Header: 'Gender',
      accessor: "gender"
    },
    {
      Header: 'Email',
      accessor: "email"
    },
    {
      Header: 'Role',
      accessor: "role"
    },
    {
      Header: 'Action',
      accessor: "action"
    },
  ]
  const img = "https://randomuser.me/api/portraits/women/54.jpg";
const img2 = "https://randomuser.me/api/portraits/women/50.jpg";

  const arr : DataType[] = [
    {
      avatar: (
        <img
        className=' h-16 w-16 object-contain rounded-full'
          src={img}
          alt="Shoes"
        />
      ),
      name: "Emily Palmer",
      email: "emily.palmer@example.com",
      gender: "female",
      role: "user",
      action: (
        <button>
          <FaTrash className=' text-red-600 hover:opacity-60' />
        </button>
      ),
    },
  
    {
      avatar: (
        <img
        className=' h-16 w-16 object-contain rounded-full'
          src={img2}
          alt="Shoes"
        />
      ),
      name: "May Scoot",
      email: "aunt.may@example.com",
      gender: "female",
      role: "user",
      action: (
        <button>
          <FaTrash className=' text-red-600 hover:opacity-60' />
        </button>
      ),
    },
  ]
const Customers = () => {
  const [data] = useState<DataType[]>(arr)
  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "Customers",
      true
    ),[]
  )
  return (
    <div className='grid grid-cols-[20%_80%] gap-4 h-screen pr-4 bg-gray-100'>
    <AdminSideBar />
    
    <main className=' overflow-y-auto w-full'>
     {Table()}
      
    </main>
    </div>
  )
}


export default Customers