import { ReactElement, useEffect, useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import { toast } from 'react-toastify';
import AdminSideBar from '../../components/adminSideBar';
import TableHOC from '../../components/tableHOC';
import { useAllProductsQuery } from '../../redux/api/productAPI';
import { RootState } from '../../redux/store';
import { CustomError } from '../../redux/types/api-types';

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
 

  // Check if userId is null before calling the query
  const { isError, error, data } = useAllProductsQuery(user?._id!);
  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setRows(
        data.products.map((i) => ({
          photo: <img src={`${i.photo}`} alt={`${i.name} photo`} className=' h-16 w-16' />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`} className=' bg-blue-300 hover:bg-inherit hover:text-black hover:transition-all p-1 rounded-lg text-blue-700'>Manage</Link>,
        }))
      );
    }
  }, [data]);

  const Table = useMemo(() => TableHOC<DataType>(
    columns,
    rows,
    "Products",
    rows.length > 6
  ), [columns, rows]);

  return (
    <div className='grid grid-cols-[20%_80%] gap-4 h-screen pr-4 bg-gray-100 lg:overflow-auto md:grid-cols-[1fr]'>
      <AdminSideBar />
      <main className='overflow-y-auto w-full'>
        {Table()}
      </main>
      <Link to='/admin/products/new' className='fixed right-8 top-8 h-10 w-10 flex flex-row items-center justify-center gap-0 rounded-full bg-red-600 text-white hover:opacity-80'>
        <FaPlus />
      </Link>
    </div>
  );
}

export default Products;
