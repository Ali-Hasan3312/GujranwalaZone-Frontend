import { ReactElement, useCallback, useState } from 'react'
import AdminSideBar from '../../components/adminSideBar'
import { Column } from 'react-table'
import TableHOC from '../../components/tableHOC'
import { Link } from 'react-router-dom'


interface DataType{
  user: string,
  
  amount: number,
  discount: number,
  quantity: number,
  status: ReactElement,
  action: ReactElement
  }
  
  const columns: Column<DataType>[] = [
    {
      Header: 'User',
      accessor: "user"
    },
    {
      Header: 'Amount',
      accessor: "amount"
    },
    {
      Header: 'Discount',
      accessor: "discount"
    },
    {
      Header: 'Quantity',
      accessor: "quantity"
    },
    {
      Header: 'Status',
      accessor: "status"
    },
    {
      Header: 'Action',
      accessor: "action"
    },
  ]
  
  const arr: DataType[] = [
    {
      user: "Charas",
      amount: 4500,
      discount: 400,
      quantity: 3,
      status: <span className=" text-red-600">Processing</span>,
      action: <Link to="/admin/transaction/sajknaskd" className=' no-underline bg-blue-600 bg-opacity-45 text-blue-600 hover:opacity-80 rounded-lg py-1 px-2'>Manage</Link>,
    },
    {
      user: "Xavirors",
      amount: 6999,
      discount: 400,
      status: <span className=" text-green-600">Shipped</span>,
      quantity: 6,
      action: <Link to="/admin/transaction/sajknaskd" className=' no-underline bg-blue-600 bg-opacity-45 text-blue-600 hover:opacity-80 rounded-lg py-1 px-2'>Manage</Link>,
    },
    {
      user: "Xavirors",
      amount: 6999,
      discount: 400,
      status: <span className=" text-purple-600">Delivered</span>,
      quantity: 6,
      action: <Link to="/admin/transaction/sajknaskd" className=' no-underline bg-blue-600 bg-opacity-45 text-blue-600 hover:opacity-80 rounded-lg py-1 px-2'>Manage</Link>,
    },
  ]
const Transaction = () => {
  const [data] = useState<DataType[]>(arr)
  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "Transactions",
      true
    ),[])
  return (
    
    <div className='grid grid-cols-[20%_80%] gap-4 h-screen pr-4 bg-gray-100 lg:overflow-auto md:grid-cols-[1fr]'>
    <AdminSideBar />
    
    <main className=' overflow-y-auto w-full'>
      {Table()}
    </main>
    </div>
  )
}

export default Transaction