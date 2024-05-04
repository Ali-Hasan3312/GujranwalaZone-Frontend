import { ReactElement, useCallback, useState } from 'react'
import AdminSideBar from '../../components/adminSideBar'
import TableHOC from '../../components/tableHOC'
import { Column } from 'react-table'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

interface DataType{
photo: ReactElement,
price: number,
stock: number,
name: string,
action: ReactElement
}

const columns: Column<DataType>[] = [
  {
    Header: 'Photo',
    accessor: "photo"
  },
  {
    Header: 'Name',
    accessor: "name"
  },
  {
    Header: 'Price',
    accessor: "price"
  },
  {
    Header: 'Stock',
    accessor: "stock"
  },
  {
    Header: 'Action',
    accessor: "action"
  },
]

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

const arr: DataType[] = [
  {
    photo: <img src={img} alt="Shoes" className=' h-16 w-16 object-contain rounded-lg' />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/product/sajknaskd" className=' no-underline bg-blue-600 bg-opacity-45 text-blue-600 hover:opacity-80 rounded-lg py-1 px-2'>Manage</Link>,
  },

  {
    photo: <img src={img2} alt="Shoes" className=' h-16 w-16 object-contain rounded-lg' />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/product/sdaskdnkasjdn" className=' no-underline bg-blue-600 bg-opacity-45 text-blue-600 hover:opacity-80 rounded-lg py-1 px-2' >Manage</Link>,
  },
  {
    photo: <img src={img} alt="Shoes" className=' h-16 w-16 object-contain rounded-lg' />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/product/sajknaskd" className=' no-underline bg-blue-600 bg-opacity-45 text-blue-600 hover:opacity-80 rounded-lg py-1 px-2' >Manage</Link>,
  },

  {
    photo: <img src={img2} alt="Shoes" className=' h-16 w-16 object-contain rounded-lg' />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/product/sdaskdnkasjdn" className=' no-underline bg-blue-600 bg-opacity-45 text-blue-600 hover:opacity-80 rounded-lg py-1 px-2' >Manage</Link>,
  },
  {
    photo: <img src={img} alt="Shoes" className=' h-16 w-16 object-contain rounded-lg' />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/product/sajknaskd" className=' no-underline bg-blue-600 bg-opacity-45 text-blue-600 hover:opacity-80 rounded-lg py-1 px-2' >Manage</Link>,
  },

  {
    photo: <img src={img2} alt="Shoes" className=' h-16 w-16 object-contain rounded-lg' />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/product/sdaskdnkasjdn" className=' no-underline bg-blue-600 bg-opacity-45 text-blue-600 hover:opacity-80 rounded-lg py-1 px-2' >Manage</Link>,
  },
  {
    photo: <img src={img2} alt="Shoes" className=' h-16 w-16 object-contain rounded-lg' />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/product/sdaskdnkasjdn" className=' no-underline bg-blue-600 bg-opacity-45 text-blue-600 hover:opacity-80 rounded-lg py-1 px-2' >Manage</Link>,
  },
];
const Products = () => {
  const [data] = useState<DataType[]>(arr)
  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "Products",
      true
    ),[]
  )
  return (
    <div className='grid grid-cols-[20%_80%] gap-4 h-screen pr-4 bg-gray-100'>
    <AdminSideBar />
    
    <main className=' overflow-y-auto w-full'>
      {Table()}
    </main>
    <Link to='/admin/product/new' className=' fixed right-8 top-8 h-10 w-10 flex flex-row items-center justify-center gap-0 rounded-full bg-red-600 text-white hover:opacity-80'>
    <FaPlus />
    </Link>
    </div>
  )
}

export default Products