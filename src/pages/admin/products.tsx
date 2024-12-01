import { Button } from '@mui/material';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import toast from "react-hot-toast";
import { useSelector } from 'react-redux';
import { Column } from 'react-table';
import TableHOC from '../../components/tableHOC';
import { useAllProductsQuery } from '../../redux/api/productAPI';
import { RootState } from '../../redux/store';
import { CustomError } from '../../redux/types/api-types';
import { useNavigate } from 'react-router-dom';

interface DataType {
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
];

const Products = () => {
  const user = useSelector((state: RootState) => state.userReducer.user);
  const navigate = useNavigate()
  const { isError, error, data } = useAllProductsQuery(user?._id!)
  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setRows(
        data.products.map((i) => ({
          photo: <img src={i.photo} alt={`${i.name} photo`} className=' h-16 w-16' />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Button onClick={()=>navigate(`/admin/product/${i._id}`)} className=''>View</Button>,
        }))
      );
    }
  }, [data]);

  const Table = useMemo(() => TableHOC<DataType>(
    columns,
    rows,
    "All Products",
    rows.length > 6
  ), [columns, rows]);

  return (
   <>
  
   <div className='relative'>
     
     <main className=' lg:p-12 p-4 '>
       {Table()}
     </main>
     
   </div>
   </>
  );
}

export default Products;
