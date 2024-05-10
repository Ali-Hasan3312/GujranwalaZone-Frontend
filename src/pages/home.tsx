import { Link } from "react-router-dom"
import ProductCard from "../components/productCard"

const img = "https://m.media-amazon.com/images/I/71DL+S6ihBL._AC_SL1500_.jpg"
const addToCardHandler = ()=>{

}
const Home = () => {
  return (
    <div className="home mt-[-30px] py-8 px-[5%] flex flex-col w-full h-full">
      <section className=" w-full mx-auto h-[250px]">
        
      </section>
      <h1 className=' tracking-wide font-normal text-xl uppercase mt-12 flex flex-row justify-between items-centre'>
        Latest Products
        <Link to={"/search"} className="findMore text-base">More</Link>
      </h1>
      <main className="noScrollbar w-full flex-[1] flex gap-4 overflow-x-auto">
      <ProductCard 
        productId="84739478"
        name="Laptop"
        price={44874}
        stock={30}
        handler={addToCardHandler}
        photo={img}
        />
      <ProductCard 
        productId="84739478"
        name="Laptop"
        price={44874}
        stock={30}
        handler={addToCardHandler}
        photo={img}
        />
      <ProductCard 
        productId="84739478"
        name="Laptop"
        price={44874}
        stock={30}
        handler={addToCardHandler}
        photo={img}
        />
      <ProductCard 
        productId="84739478"
        name="Laptop"
        price={44874}
        stock={30}
        handler={addToCardHandler}
        photo={img}
        />
      </main>
     
     
    </div>
  )
}

export default Home