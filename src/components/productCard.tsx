import { Id } from "react-toastify";
import { CartItem } from "../redux/types/types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ProductsProps{
    productId:string,
    photo: string,
    name: string,
    price: number,
    stock: number,
    handler: (cartItem: CartItem) => Id | undefined;
}
const ProductCard = ({productId,photo,name,price,stock,handler}:ProductsProps) => {
  return (
    <div className="shadow-lg no-scrollbar rounded-lg bg-white/65 pb-4 pt-0 px-0 flex flex-col justify-center items-center relative gap-1">
        <motion.img
        initial={{opacity:'0%',scale:-0.7}}
        whileInView={{opacity:'100%',scale:1}}
        transition={{duration:0.7}}
        exit={{y:'400px',opacity:'0'}}
        src={photo} alt={name} className="h-48 w-[80%] hover:scale-125 transition-all duration-300 cursor-pointer" />
        <motion.p
        initial={{x:'70px'}}
        whileInView={{x:'0'}}
        transition={{duration:0.7}}
        exit={{x:'70px',opacity:'0'}}
        >{name}</motion.p>
        <motion.span
        initial={{x:'-70px'}}
        whileInView={{x:'0'}}
        transition={{duration:0.7}}
        exit={{x:'-70px',opacity:'0'}}
        className=" font-bold text-lg">Rs {price}</motion.span>
        <div className="flex items-center gap-4 mt-2">
            <button onClick={()=>handler({ productId, price, name, photo, stock, quantity: 1 })} className="addToCart relative text-white hover:text-teal-500 hover:border hover:border-teal-500 lg:text-lg text-sm h-8 w-[84px] lg:w-28 lg:h-12 rounded overflow-hidden">
              <span
              className="relative z-10">Add to cart</span>
            </button>
            <Link to={`/productDetails/${productId}`} className="viewBtn flex items-center justify-center hover:text-white hover:border-none relative border border-teal-500 lg:text-lg text-sm text-teal-500 overflow-hidden h-8 w-12 lg:w-16"><span className="relative z-10">View</span></Link>
        </div>
    </div>
  )
}

export default ProductCard