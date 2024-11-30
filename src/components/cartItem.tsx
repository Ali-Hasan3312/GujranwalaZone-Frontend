import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { CartItem } from "../redux/types/types";
type CartItemProps = {
    cartItem: CartItem;
    incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;

}
const CartItem = ({cartItem,
  incrementHandler,
  decrementHandler, 
  removeHandler}:CartItemProps) => {
    const {photo, productId,name,price,quantity} = cartItem
  return (
    <div className="cart-item p-8 flex justify-start items-center md:gap-4 gap-12">
        <img className=" h-24 w-24 object-contain" src={photo} alt={name} />
        <article className="flex flex-col justify-center items-start gap-1">
            <Link className=" text-lg md:text-sm sm:text-[4px] text-gray-800 hover:text-emerald-500" to={`/product/${productId}`} >{name}</Link>
            <span className=" font-bold">Rs{price}</span>
        </article>
        <div className="flex justify-center items-center gap-8">
          <button className=" border-none h-8 w-8 rounded flex justify-center items-center gap-8 cursor-pointer text-3xl transition-all duration-300 hover:bg-gray-800 hover:text-white" onClick={() => decrementHandler(cartItem)}>-</button>
          <p>{quantity}</p>
          <button className=" border-none h-8 w-8 rounded flex justify-center items-center gap-8 cursor-pointer text-2xl transition-all duration-300 hover:bg-gray-800 hover:text-white" onClick={() => incrementHandler(cartItem)}>+</button>
        </div>
        <button className=" border-none bg-transparent flex justify-center items-center gap-8 cursor-pointer text-lg transition-all duration-300 hover:text-red-500" onClick={() => removeHandler(productId)}><FaTrash /></button>
    </div>
  )
}

export default CartItem