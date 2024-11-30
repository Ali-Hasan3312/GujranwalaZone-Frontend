import { useState } from "react";
import toast from "react-hot-toast";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../redux/types/types";
const Home = () => {
  const [next,setNext] = useState(0);
  const incrementHandler = ()=>{
    if(next>=1){
    return setNext(0)
    }
    setNext(next+1)
    
    
  }
  const decrementHandler = ()=>{
    if(next<=0){
      return setNext(1)
      }
      setNext(next-1)
  }
 
  const {data,isError} = useLatestProductsQuery("")
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem:CartItem)=>{
    if(cartItem.stock < 1) return toast.error("Out Of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  }
  if (isError) toast.error("Cannot Fetch the Products");
  return (
    <div className=" mt-[4px] relative py-8 px-[5%] flex flex-col w-full h-full rounded-lg">
     <div className="">
     <GrPrevious onClick={decrementHandler} className="absolute top-[20%] left-4 opacity-50 hover:opacity-100 transition-all duration-300 text-2xl lg:text-4xl cursor-pointer" />   
     <div>
      {next==0 && (
        <HeroSlider title="New Arrival" heading="New Design Bluetooth Speaker" image="https://flone.jamstacktemplates.dev/assets/img/slider/single-slide-3.png" />
      )}
      {next==1 && (
        <HeroSlider title="Smart Products" heading="Summer Offer 2024 Collection" image="https://flone.jamstacktemplates.dev/assets/img/slider/single-slide-6.png" />
      )}
     </div>
     <GrNext onClick={incrementHandler} className="absolute top-[20%] right-4 opacity-50 hover:opacity-100 transition-all duration-300 text-2xl lg:text-4xl cursor-pointer" />   

     </div>
      <h1 className=' tracking-wide font-normal text-xl uppercase mt-12 flex flex-row justify-between items-centre'>
        Latest Products
        <Link to={"/search"} className="findMore text-base">More</Link>
      </h1>
      {!data?.products? (<Loader />) : ( <main className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-center w-[98%] mx-auto mt-4 no-scrollbar  ">
       {data?.products.map((i)=>(
         <ProductCard 
         key={i._id}
         productId={i._id}
         name={i.name}
         price={i.price}
         stock={i.stock}
         handler={addToCartHandler}
         photo={i.photo}
         />
        ))}
      </main>)}
     
     
     
    </div>
  )
}

export default Home