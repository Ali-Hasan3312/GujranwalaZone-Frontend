import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import TableHOC from '../components/tableHOC';
import { RootState } from '../redux/store';
import { useMyOrdersQuery } from '../redux/api/orderAPI';
import toast from "react-hot-toast";
import { CustomError } from '../redux/types/api-types';

type DataType = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement;
  };
  const column: Column<DataType>[] = [
    {
      Header: "ID",
      accessor: "_id",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
    },
    {
      Header: "Discount",
      accessor: "discount",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Action",
      accessor: "action",
    },
  ];
  
const Orders = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isError, error } = useMyOrdersQuery(user?._id!);
  const [rows, setRows] = useState<DataType[]>([]);
    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }
  
    useEffect(() => {
      if (data){
        setRows(
          data.orders.map((i) => ({
            _id: i._id,
            amount: i.total,
            discount: i.discount,
            quantity: i.orderItems.length,
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
            action: <Link to={`/orders/orderDetails/${i._id}`} className=' bg-blue-300 hover:bg-inherit hover:text-black hover:transition-all p-1 rounded-lg text-blue-700'>Details</Link>,
          }))
        );
      }
        
    }, [data]);

    
  const Table = TableHOC<DataType>(
    column,
    rows,
    "My Orders",
    rows.length > 6
  )();
  return (
    <div className=" w-full m-auto overflow-auto">
      {Table}
      {data?.orders?.length! <= 0? (<>
      <h1 className='flex items-center justify-center text-2xl mt-16'>Not any order yet</h1>
      </>) : (<></>)}
    </div>
  )
}

export default Orders