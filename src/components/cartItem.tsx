import { FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom"
interface cartItemProps{
    cartItem: any

}
const CartItem = ({cartItem}:cartItemProps) => {
    const {photo, productId,name,price,quantity} = cartItem
  return (
    <div className="cart-item p-8 flex justify-start items-center gap-12">
        <img className=" h-40 w-40 object-contain" src={photo} alt={name} />
        <article className="flex flex-col justify-center items-start gap-1">
            <Link className=" text-lg text-gray-800 hover:text-emerald-500" to={`/product/${productId}`} >{name}</Link>
            <span className=" font-bold">Rs{price}</span>
        </article>
        <div className=" ml-auto flex justify-center items-center gap-8">
          <button className=" border-none h-8 w-8 rounded flex justify-center items-center gap-8 cursor-pointer text-xl hover:bg-gray-800 hover:text-white">-</button>
          <p>{quantity}</p>
          <button className=" border-none h-8 w-8 rounded flex justify-center items-center gap-8 cursor-pointer text-xl hover:bg-gray-800 hover:text-white">+</button>
        </div>
        <button className=" border-none bg-transparent flex justify-center items-center gap-8 cursor-pointer text-lg hover:text-red-500"><FaTrash /></button>
    </div>
  )
}

export default CartItem