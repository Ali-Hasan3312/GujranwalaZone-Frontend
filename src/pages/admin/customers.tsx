import { ReactElement, useEffect, useMemo, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Column } from 'react-table'
import TableHOC from '../../components/tableHOC'
import { useAllUsersQuery, useDeleteUserMutation } from '../../redux/api/userAPI'
import { RootState } from '../../redux/store'

interface DataType{
  photo: ReactElement,
  name: string,
  role: string,
  gender: string,
  email: string,
  action: ReactElement
  }
  const columns: Column<DataType>[] = [
    {
      Header: 'Avatar',
      accessor: "photo"
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
const Customers = () => {
  const user = useSelector((state:RootState)=>state.userReducer.user)
  const {data} = useAllUsersQuery(user?._id!)
  
  const [rows, setRows] = useState<DataType[]>([]);
  const [deleteUser] = useDeleteUserMutation()
  const deleteHandler = async(userId: string)=>{
     await deleteUser({ userId, adminUserId: user?._id! });
    
      
    
  }
  useEffect(() => {
    if (data) {
      setRows(
        data.users.map((i) => ({
          photo: <img src={typeof i.photo === 'string' ? i.photo : ''} alt={`${i.name} photo`} className=' h-16 w-16' />,
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role,
          action: ( <button onClick={()=>deleteHandler(i._id)} className=' text-red-600 hover:opacity-60'><FaTrash /></button> )
        }))
      );
    }
  
  }, [data]);
  const Table = useMemo(() =>
    TableHOC<DataType>(
      columns,
      rows,
      "All Roles",
      rows.length > 6
    ),[columns, rows]
  )
  return (
   
    
    
    <main className=' lg:p-8 p-4'>
     {Table()}
    </main>
   
  )
}
export default Customers