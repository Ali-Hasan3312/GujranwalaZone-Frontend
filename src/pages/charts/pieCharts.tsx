import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AdminSideBar from '../../components/adminSideBar';
import { DoughnutChart, PieChart } from '../../components/charts';
import { usePieQuery } from '../../redux/api/dashboardAPI';
import { RootState } from '../../redux/store';

const PieCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isError } = usePieQuery(user?._id!);

  const order = data?.charts.orderFullfillment!;
  const categories = data?.charts.productCategories!;
  const stock = data?.charts.stockAvailability!;
  const revenue = data?.charts.revenueDistribution!;
  const ageGroup = data?.charts.usersAgeGroup!;
  const adminCustomer = data?.charts.adminCustomer!;

  if (isError) return <Navigate to={"/admin/dashboard"} />;

  return (
    <div className='grid grid-cols-[20%_80%] gap-4 h-screen pr-4 bg-gray-100 lg:overflow-auto md:grid-cols-[1fr]'>
      <AdminSideBar />
      <main className="bg-white overflow-y-auto p-16 sm:p-0">
        <h1 className="mb-12 ml-8 font-bold text-2xl sm:m-0 sm:text-centre">Pie & Doughnut Charts</h1>
        
        <section className="w-[80%] my-16 mx-auto sm:my-0 sm:mx-auto">
          <div className='max-w-72 m-auto mt-16 mb-[-1rem]'>
            <PieChart 
              labels={["Processing", "Shipped", "Delivered"]}
              data={[order?.processing, order?.shipped, order?.delivered]}
              backgroundColor={[
                `hsl(110,80%,80%)`,
                `hsl(110,80%,50%)`,
                `hsl(110,40%,50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2 className='uppercase text-lg text-gray-700 text-center mt-4 tracking-wider'>Order Fulfillment Ratio</h2>
        </section>

        <section className="w-[80%] my-16 mx-auto">
          <div className='max-w-72 m-auto mt-16 mb-[-1rem]'>
            <DoughnutChart
              labels={categories?.map((i) => Object.keys(i)[0])}
              data={categories?.map((i) => Object.values(i)[0])}
              backgroundColor={categories?.map(
                (i) =>
                  `hsl(${Object.values(i)[0] * 4}, ${Object.values(i)[0]}%, 50%)`
              )}
              legends={false}
              offset={[0, 0, 0, 80]}
              
            />
          </div>
          <h2 className='uppercase text-lg text-gray-700 text-center mt-4 tracking-wider'>Products Categories Ratio</h2>
        </section>

        <section className="w-[80%] my-16 mx-auto">
          <div className='max-w-72 m-auto mt-16 mb-[-1rem]'>
            <DoughnutChart
              labels={["In Stock", "Out Of Stock"]}
              data={[stock?.inStock, stock?.outOfStock]}
              backgroundColor={["hsl(269,80%,40%)", "rgb(53,162,255)"]}
              legends={false}
              offset={[0, 80]}
              cutout={"70%"}
            />
          </div>
          <h2 className='uppercase text-lg text-gray-700 text-center mt-4 tracking-wider'>Stock Availability</h2>
        </section>

        <section className="w-[80%] my-16 mx-auto">
          <div className='max-w-72 m-auto mt-16 mb-[-1rem]'>
            <DoughnutChart
              labels={[
                "Marketing Cost",
                "Discount",
                "Burnt",
                "Production Cost",
                "Net Margin",
              ]}
              data={[
                revenue?.marketingCost,
                revenue?.discount,
                revenue?.burnt,
                revenue?.productionCost,
                revenue?.netMargin,
              ]}
              backgroundColor={[
                "hsl(110,80%,40%)",
                "hsl(19,80%,40%)",
                "hsl(69,80%,40%)",
                "hsl(300,80%,40%)",
                "rgb(53, 162, 255)",
              ]}
              legends={false}
              offset={[20, 30, 20, 30, 80]}
            />
          </div>
          <h2 className='uppercase text-lg text-gray-700 text-center mt-4 tracking-wider'>Revenue Distribution</h2>
        </section>

        <section className="w-[80%] my-16 mx-auto">
          <div className='max-w-72 m-auto mt-16 mb-[-1rem]'>
            <PieChart
              labels={[
                "Teenager(Below 20)",
                "Adult (20-40)",
                "Older (above 40)",
              ]}
              data={[ageGroup?.teen, ageGroup?.adult, ageGroup?.old]}
              backgroundColor={[
                `hsl(10, ${80}%, 80%)`,
                `hsl(10, ${80}%, 50%)`,
                `hsl(10, ${40}%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2 className='uppercase text-lg text-gray-700 text-center mt-4 tracking-wider'>Users Age Group</h2>
        </section>

        <section className="w-[80%] my-16 mx-auto">
          <div className='max-w-72 m-auto mt-16 mb-[-1rem]'>
            <DoughnutChart
              labels={["Admin", "Customers"]}
              data={[adminCustomer?.admin, adminCustomer?.customer]}
              backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
              offset={[0, 80]}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default PieCharts;
