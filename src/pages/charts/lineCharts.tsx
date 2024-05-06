import AdminSideBar from "../../components/adminSideBar"

const LineChart = () => {
    return (
        <div className='grid grid-cols-[20%_80%] gap-4 h-screen pr-4 bg-gray-100'>
            <AdminSideBar />
            <main className=" bg-white overflow-y-auto p-16">
                <h1 className=" mb-20 ml-8">Pie & Dougnut Charts</h1>
                <section>
                    <div>
                       
                    </div>
                </section>
            </main>
        </div>
      )
}

export default LineChart