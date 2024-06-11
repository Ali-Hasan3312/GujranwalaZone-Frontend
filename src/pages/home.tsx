import { Link } from "react-router-dom"
import ProductCard from "../components/productCard"
import { useLatestProductsQuery } from "../redux/api/productAPI"
import { useDispatch } from "react-redux"
import { CartItem } from "../redux/types/types"
import { toast } from "react-toastify"
import { addToCart } from "../redux/reducer/cartReducer"
import { server } from "../redux/store"


const Home = () => {
  const {data,isError} = useLatestProductsQuery("")
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem:CartItem)=>{
    if(cartItem.stock < 1) return toast.error("Out Of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  }
  if (isError) toast.error("Cannot Fetch the Products");
  return (
    <div className="home mt-[-30px] py-8 px-[5%] flex flex-col w-full h-full">
      <section className=" w-full mx-auto h-[250px]">
        
      </section>
      <h1 className=' tracking-wide font-normal text-xl uppercase mt-12 flex flex-row justify-between items-centre'>
        Latest Products
        <Link to={"/search"} className="findMore text-base">More</Link>
      </h1>
      <main className="noScrollbar w-full flex-[1] flex gap-4 overflow-x-auto">
        {data?.products.map((i)=>(
         <ProductCard 
         key={i._id}
         productId={i._id}
         name={i.name}
         price={i.price}
         stock={i.stock}
         handler={addToCartHandler}
         photo={`${server}/${i.photo}`}
         />
        ))}
      
     
      </main>
     
     
    </div>
  )
}

export default Home