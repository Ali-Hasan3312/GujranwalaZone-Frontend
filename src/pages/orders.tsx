import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ReactElement, useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMyOrdersQuery } from '../redux/api/orderAPI';
import { RootState } from '../redux/store';
import { CustomError } from '../redux/types/api-types';
type DataType = {
    id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: string;
    action: ReactElement;
  };
 
const Orders = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isError, error } = useMyOrdersQuery(user?._id!);
  const [rows, setRows] = useState<DataType[]>([]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID',
      headerAlign: 'center', // Center the header text
      align: 'center', width: 240 },
    { field: 'amount', headerName: 'Amount',
      headerAlign: 'center', // Center the header text
      align: 'center', width: 130 },
    { field: 'discount', headerName: 'Discount',
      headerAlign: 'center', // Center the header text
      align: 'center', width: 130 },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      headerAlign: 'center', // Center the header text
      align: 'center',
      width: 90,
    },
    {
      field: 'status',
      headerName: 'Status', 
      headerAlign: 'center', // Center the header text
      align: 'center', 
      width: 160,
      renderCell: (params) => (
        <span className={`${params.row.status==='Processing'?' text-red-600':' text-green-600'}`}>{params.row.status}</span>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',  
      headerAlign: 'center', // Center the header text
      align: 'center',
      width: 160,
      renderCell: (params) => (
        <Link
          to={`/orders/orderDetails/${params.row.id}`}
          className="bg-blue-300 hover:bg-blue-500 p-1 rounded-lg text-blue-700 hover:text-white transition-all"
        >
          Details
        </Link>
      ),
    },
  ];
  const paginationModel = { page: 0, pageSize: 5 };
    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }
    useEffect(() => {
      if (data){
        setRows(
          data.orders.map((i) => ({
            id: i._id,
            amount: i.total,
            discount: i.discount,
            quantity: i.orderItems.length,
            status: i.status,
            action: <Link to={`/orders/orderDetails/${i._id}`} className=' bg-blue-300 hover:bg-inherit hover:text-black hover:transition-all p-1 rounded-lg text-blue-700'>Details</Link>,
          }))
        );
      }
        
    }, [data]);

    
  
  return (
    <div className=" py-8">
      <h1 className=" tracking-[3px] uppercase text-2xl text-center font-normal text-gray-700">Orders</h1>
    <Paper sx={{  width: '72%', mx:'auto', marginTop:'20px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
      {data?.orders?.length! <= 0? (<>
      <h1 className='flex items-center justify-center text-2xl mt-16'>Not any order yet</h1>
      </>) : (<></>)}
    </div>
  )
}

export default Orders