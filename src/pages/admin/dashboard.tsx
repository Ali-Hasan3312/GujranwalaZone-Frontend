import { BiMaleFemale } from 'react-icons/bi';
import { HiTrendingDown, HiTrendingUp } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { BarChart, DoughnutChart } from '../../components/charts';
import DashboardTable from '../../components/dashboardTable';
import { useStatsQuery } from '../../redux/api/dashboardAPI';
import { RootState } from '../../redux/store';
import { getLastMonths } from '../../redux/utils/features';

const { last6Months: months } = getLastMonths();

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isError } = useStatsQuery(user?._id!);

  if (isError) return <Navigate to={"/"} />;
  
  const stats = data?.stats ;
  const changePercent = stats?.changePercent ;
  const count = stats?.count ;
  const chart = stats?.chart ;
  const userRatio = stats?.userRatio ;
  const categoryCount = stats?.categoryCount;
  const latestTransaction = stats?.latestTransaction ;
 
  return (
   
      
      <main className='pb-8'>
        
        <section className='flex lg:flex-row flex-col items-center justify-center py-8 gap-8 px-8'>
          <WidgetItem
            percent={changePercent?.revenue || 0}
            amount={true}
            value={count?.revenue || 0}
            heading="Revenue"
            color='blue'
          />
          <WidgetItem
            percent={changePercent?.users || 0}
            value={count?.users || 0}
            heading="Users"
            color='green'
          />
          <WidgetItem
            percent={changePercent?.orders || 0}
            value={count?.orders || 0}
            heading="Transactions"
            color='yellow'
          />
          <WidgetItem
            percent={changePercent?.products || 0}
            value={count?.products || 0}
            heading="Products"
            color='indigo'
          />
        </section>
        <section className='flex lg:flex-row flex-col lg:px-8 lg:items-start items-center justify-center gap-8'>
          <div className='bg-white lg:w-[62%] w-[92%] rounded-lg px-2 py-4 lg:px-6'>
            <h2 className=' tracking-wider font-semibold uppercase opacity-80 mt-4  mr-0 mb-1 ml-1 text-center relative bottom-2'>Revenue & Transactions</h2>
            <BarChart 
              labels={months}
              data_1={chart?.revenue || []}
              data_2={chart?.order || []}
              title_1='Revenue'
              title_2='Transaction'
              bg_color1='rgb(0,115,255)'
              bg_color2='rgba(53,162,235,0.8)'
            />
          </div>

          <div className='bg-white lg:w-[42%] w-[92%] rounded-lg px-2 py-4 lg:px-6'>
            <h2 className=' tracking-wider font-semibold uppercase opacity-80 mx-0 mt-1 mb-1 text-center'>Inventory</h2>
            <div className=' overflow-y-auto pl-2'>
              {categoryCount?.map((i) => {
                const [heading, value] = Object.entries(i)[0];
                return (
                  <CategoryItem
                    key={heading}
                    value={value as number}
                    heading={heading}
                    color={`hsl(${(value as number) * 5},${(value as number)}%,50%)`}
                  />
                )
              })}
            </div>
          </div>
        </section>
        <section className="flex lg:flex-row flex-col gap-8 w-[94%] lg:w-[88%] px-2 mx-auto mt-8">
          <div className="gender-chart bg-white shadow-md rounded-lg w-full p-4 relative">
            <h2 className=' text-center mt-6 mx-0 mb-8 tracking-[0.2rem] uppercase font-semibold'>Gender Ratio</h2>
            <DoughnutChart 
              labels={["Female","Male"]} 
              data={[userRatio?.female || 0, userRatio?.male || 0]}
              backgroundColor={["hsl(340,82%,56%)","rgba(53,162,235,0.8)"]}
              cutout={90}
            />
            <p className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-black opacity-65'>
              <BiMaleFemale />
            </p>
          </div>
          <DashboardTable data={latestTransaction!} />
        </section>
      </main>
    
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
          <HiTrendingUp className=' mt-1' /> +{`${percent > 10000 ? 9999 : percent}%`}
        </span>
      ) : (
        <span className={`text-red-500 flex flex-row items-center gap-1`}>
          <HiTrendingDown />  {`${percent < -10000 ? -9999 : percent}%`}
        </span>
      )}
    </div>
    <div className='widgetCircle relative h-20 w-20 rounded-full grid place-items-center' style={{
      background: `conic-gradient(${color} ${Math.abs(percent)/100*360}deg, rgb(255,255,255) 0)`
    }}>
      <span className={`relative text-${color}-500`}>
        {percent > 0 && `${percent > 10000 ? 9999 : percent}%`}
        {percent < 0 && `${percent < -10000 ? -9999 : percent}%`}
      </span>
    </div>
  </article>
);

interface CategoryItemProps {
  color: string;
  heading: string;
  value: number;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
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
);

export default Dashboard;
