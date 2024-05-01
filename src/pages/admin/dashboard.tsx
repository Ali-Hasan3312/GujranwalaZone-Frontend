import { BsSearch } from 'react-icons/bs'
import AdminSideBar from '../../components/adminSideBar'
import { FaRegBell } from 'react-icons/fa'
import userImg from "../../assets/images/userpic.png"
import { HiTrendingDown, HiTrendingUp } from 'react-icons/hi'
import data from "./../../assets/Data.json"
const Dashboard = () => {
  return (
    <div className='grid grid-cols-[20%_80%] gap-4 h-screen pr-4 bg-gray-100'>
    <AdminSideBar />
    
    <main className=' overflow-y-auto w-full'>
      <div className=' h-10 px-2 py-4 flex-row border-b-2 border-black border-opacity-35 border-solid flex content-center items-center gap-4'>
        <BsSearch />
        <input type="text" placeholder='Search for data, users, docs' className=' mr-auto w-full py-4 px-0 border-none outline-none bg-inherit' />
        <FaRegBell className=' opacity-70 text-sm'/>
        <img src={userImg} alt="User" className=' h-8 w-8 rounded-3xl' />
      </div>
      <section className='flex flex-row justify-between items-stretch gap-8 p-8 pr-8 pb-8'>
      <WidgetItem
            percent={40}
            amount={true}
            value={340000}
            heading="Revenue"
            color='blue'
            
          />
      <WidgetItem
           percent={-14}
           value={400}
           heading="Users"
           color='green'
          />
      <WidgetItem
           percent={80}
           value={23000}
           heading="Transactions"
           color='yellow'
          />
          <WidgetItem
            percent={30}
            value={1000}
            heading="Products"
            color='indigo'
          />
      </section>
      <section className='flex flex-row gap-8 pt-0 pr-2 pb-2 pl-0'>
        <div className='bg-white rounded-lg w-full py-4 px-12'>
          <h2 className=' tracking-wider font-semibold uppercase opacity-80 mt-4  mr-0 mb-1 ml-1 text-center relative bottom-2'>Revenue & Transactions</h2>
          {/* Graph Here */}
        </div>

        <div className='bg-white rounded-lg w-full max-w-64 flex flex-col justify-center gap-0 pb-4'>
          <h2 className=' tracking-wider font-semibold uppercase opacity-80 mx-0 mt-1 mb-1 text-center'>Inventory</h2>
          <div className=' overflow-y-auto pl-2'>

           {data.categories.map((i) => (

             <CategoryItem
             key={i.heading}
             heading={i.heading}
             value={i.value}
             color={`hsl(${i.value * 5},${i.value}%,50%)`} />
           ))}
          </div>
        </div>
      </section>
    </main>
    </div>
  )
}

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  amount?: boolean;
  color: string;
}
const WidgetItem = ({
  heading,
  value,
  percent,
  amount = false,
  color 
  
}: WidgetItemProps) => (
  <article className=" w-64 bg-white shadow-md p-8 flex flex-row justify-between items-stretch gap-0 rounded-lg">
    <div className="">
      <p className=' opacity-70 text-sm'>{heading}</p>
      <h4 className=' font-bold'>{amount ? `Rs${value}` : value}</h4>
      {percent > 0 ? (
        <span className={`text-blue-500 flex flex-row items-center gap-1`}>
          <HiTrendingUp className=' mt-1' /> +{percent}%{" "}
        </span>
      ) : (
        <span className={`text-red-500 flex flex-row items-center gap-1`}>
          <HiTrendingDown /> {percent}%{" "}
        </span>
      )}
    </div>
    <div className='widgetCircle relative h-20 w-20 rounded-full grid place-items-center' style={{
      background: `conic-gradient(${color} ${Math.abs(percent)/100*360}deg, rgb(255,255,255) 0)`
    }}>
      <span className={`relative text-${color}-500`}>{percent}%</span>
    </div>
    </article>
);

interface CategoryItemProps{
  color: string,
  heading: string,
  value: number
}

const CategoryItem = ({color, value, heading}: CategoryItemProps)=>(
  <div className=' w-full flex flex-row justify-between items-center gap-4 p-4'>
    <h5 className=' tracking-wider font-light'>{heading}</h5>
    <div className=' ml-auto w-24 bg-gray-300 h-2 rounded-2xl'>
      <div style={{
        background: color,
        width: `${value}%`
      }} className=' rounded-2xl h-full'></div>
    </div>
    <span className='font-bold text-sm'>{value}%</span>
  </div>
)



export default Dashboard