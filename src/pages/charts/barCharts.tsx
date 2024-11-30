import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BarChart } from "../../components/charts";
import { useBarQuery } from "../../redux/api/dashboardAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../redux/types/api-types";
import { getLastMonths } from "../../redux/utils/features";
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
   
       
        <main className=" p-8">
            <h1 className=" mb-12 ml-8 font-bold text-2xl sm:m-0 sm:text-center">Bar Charts</h1>
            <section className=" w-[80%] my-4 bg-white p-8 rounded-lg mx-auto">
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
            <section className=" w-[80%] my-4 mt-8 bg-white p-8 rounded-lg mx-auto">
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
   
  )
}

export default BarCharts