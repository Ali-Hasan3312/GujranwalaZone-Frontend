import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import TableHOC from '../components/tableHOC';

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
    const [rows] = useState<DataType[]>([
        {
            _id: "jfsjlkdj",
            amount: 8734,
            quantity:64,
            discount:200,
            status: <span className=' text-red-500'>Processing</span>,
            action: <Link to={"/orders/orderDetails"}>View</Link>
        }
    ]);
    
  const Table = TableHOC<DataType>(
    column,
    rows,
    "Orders",
    
  )();
  return (
    <div className=" w-full m-auto overflow-auto">
      <h1 className=' tracking-[3px] font-semibold uppercase text-left text-2xl'>My Orders</h1>
      {Table}
    </div>
  )
}

export default Orders