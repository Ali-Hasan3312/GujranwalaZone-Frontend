import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="home py-8 px-[5%] flex flex-col w-full">
      <section className=" w-full m-auto h-[18.75rem]"></section>
      <h1>
        Latest Products
        <Link to={"/search"} className="findMore">More</Link>
      </h1>
      <main></main>
    </div>
  )
}

export default Home