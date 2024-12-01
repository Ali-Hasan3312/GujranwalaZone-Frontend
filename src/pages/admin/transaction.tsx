import { ReactElement, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Column } from 'react-table'
import TableHOC from '../../components/tableHOC'
import { useAllOrdersQuery } from '../../redux/api/orderAPI'
import { RootState } from '../../redux/store'

interface DataType {
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

const Transaction = () => {

  const user = useSelector((state: RootState) => state.userReducer.user)
  const {  data} = useAllOrdersQuery(user?._id!)
  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.orders.map((i) => ({
          user: i.user?.name,
          amount: i.total!,
          discount: i.discount!,
          quantity: i.orderItems.length!,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "text-red-500"
                  : i.status === "Shipped"
                    ? "text-green-500"
                    : "text-purple-500"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/admin/transaction/${i._id}`} className=' bg-blue-300 hover:bg-inherit hover:text-black hover:transition-all p-1 rounded-lg text-blue-700'>Manage</Link>,
        }))
      );
    }
  }, [data]);

  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      rows,
      "Orders",
      true
    ), [rows])

  return (
    <div className=' lg:p-8 p-4'>
      <main className='overflow-y-auto w-full'>
        {Table()}
      </main>
    </div>
  )
}

export default Transaction
