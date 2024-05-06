import AdminSideBar from "../../components/adminSideBar"
import { BarChart } from "../../components/charts"
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const BarCharts = () => {
  return (
    <div className='grid grid-cols-[20%_80%] gap-4 h-screen pr-4 bg-gray-100'>
        <AdminSideBar />
        <main className=" bg-white overflow-y-auto p-16">
            <h1 className=" mb-20 ml-8">Bar Charts</h1>
            <section className=" w-[80%] my-16 mx-auto">
                <BarChart data_1={[200, 444, 343, 556, 778, 455, 990]}
            data_2={[300, 144, 433, 655, 237, 755, 190]}
            title_1="Products"
            title_2="Users"
            bg_color1={`hsl(260,50%,30%)`}
            bg_color2={`hsl(360,90%,90%)`}/>
            <h2 className="uppercase my-8 text-center tracking-[2px] font-normal">top selling products & customers</h2>
            </section>
            <section className=" w-[80%] my-16 mx-auto">
            <BarChart
            horizontal={true}
            data_1={[
              200, 444, 343, 556, 778, 455, 990, 444, 122, 334, 890, 909,
            ]}
            data_2={[]}
            title_1="Products"
            title_2=""
            bg_color1={`hsl(180, 40%, 50%)`}
            bg_color2=""
            labels={months}
          />
          <h2 className="uppercase my-8 text-center tracking-[2px] font-normal">Orders throughout the year</h2>
            </section>

        </main>
    </div>
  )
}

export default BarCharts