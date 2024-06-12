import { useSelector } from "react-redux";
import AdminSideBar from "../../components/adminSideBar"
import { BarChart } from "../../components/charts"
import { RootState } from "../../redux/store";
import { getLastMonths } from "../../redux/utils/features";
import { useBarQuery } from "../../redux/api/dashboardAPI";
import { CustomError } from "../../redux/types/api-types";
import { toast } from "react-toastify";
const { last12Months, last6Months } = getLastMonths();
const BarCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, error, isError } = useBarQuery(user?._id!);

  const products = data?.charts.products || [];
  const orders = data?.charts.orders || [];
  const users = data?.charts.users || [];

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className='grid grid-cols-[20%_80%] gap-4 h-screen pr-4 bg-gray-100 lg:overflow-auto md:grid-cols-[1fr]'>
        <AdminSideBar />
        <main className=" bg-white overflow-y-auto p-16 sm:p-0">
            <h1 className=" mb-12 ml-8 font-bold text-2xl sm:m-0 sm:text-center">Bar Charts</h1>
            <section className=" w-[80%] my-16 mx-auto sm:my-32 sm:mx-auto">
                <BarChart
            data_1={products}
            data_2={users}
            labels={last6Months}
            title_1="Products"
            title_2="Users"
            bg_color1={`hsl(260,50%,30%)`}
            bg_color2={`hsl(360,90%,90%)`}/>
            <h2 className="uppercase my-8 text-center tracking-[2px] font-normal sm:text-sm sm:tracking-tight">top selling products & customers</h2>
            </section>
            <section className=" w-[80%] my-16 mx-auto">
            <BarChart
            horizontal={true}
            data_1={orders}
                data_2={[]}
            title_1="Products"
            title_2=""
            bg_color1={`hsl(180, 40%, 50%)`}
            bg_color2=""
            labels={last12Months}
          />
          <h2 className="uppercase my-8 text-center tracking-[2px] font-normal sm:text-sm sm:tracking-tight">Orders throughout the year</h2>
            </section>

        </main>
    </div>
  )
}

export default BarCharts