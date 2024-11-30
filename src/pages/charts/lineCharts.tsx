import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LineChart } from "../../components/charts";
import { useLineQuery } from "../../redux/api/dashboardAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../redux/types/api-types";
import { getLastMonths } from "../../redux/utils/features";
const { last12Months: months } = getLastMonths();
const LineCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, error, isError } = useLineQuery(user?._id!);

  const products = data?.charts.products || [];
  const users = data?.charts.users || [];
  const revenue = data?.charts.revenue || [];
  const discount = data?.charts.discount || [];

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
    return (
      <main className=" p-8">
                <h1 className=" mb-12 ml-8 font-bold text-2xl">Line Charts</h1>
                <section className=" w-[80%] my-16 mx-auto bg-white/95 p-8 rounded-lg">
          <LineChart
            data={users}
            label="Users"
            borderColor="rgb(53, 162, 255)"
            backgroundColor="rgba(53, 162, 255,0.5)"
            labels={months}
          />
          <h2 className=' uppercase text-lg text-gray-700 text-center mt-4 tracking-wider'>Active Users</h2>
        </section>
        <section className=" w-[80%] my-16 mx-auto bg-white/95 p-8 rounded-lg">
          <LineChart
            data={products}
            backgroundColor={"hsla(269,80%,40%,0.4)"}
            borderColor={"hsl(269,80%,40%)"}
            label="Products"
            labels={months}
          />
          <h2 className=' uppercase text-lg text-gray-700 text-center mt-4 tracking-wider'>Total Products (SKU)</h2>
        </section>

        <section className=" w-[80%] my-16 mx-auto bg-white/95 p-8 rounded-lg">
          <LineChart
            data={revenue}
            backgroundColor={"hsla(129,80%,40%,0.4)"}
            borderColor={"hsl(129,80%,40%)"}
            label="Revenue"
            labels={months}
          />
          <h2 className=' uppercase text-lg text-gray-700 text-center mt-4 tracking-wider'>Total Revenue</h2>
        </section>

        <section className=" w-[80%] my-16 mx-auto bg-white/95 p-8 rounded-lg">
          <LineChart
            data={discount}
            backgroundColor={"hsla(29,80%,40%,0.4)"}
            borderColor={"hsl(29,80%,40%)"}
            label="Discount"
            labels={months}
          />
          <h2 className=' uppercase text-lg text-gray-700 text-center mt-4 tracking-wider'>Discount Allotted</h2>
        </section>
            </main>
       
      )
}

export default LineCharts