import { Id } from "react-toastify";
import { CartItem } from "../redux/types/types";


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
    <div className=" border border-gray-300 shadow-lg no-scrollbar p-4 flex flex-col justify-center items-center relative bg-white gap-1">
        <img src={photo} alt={name} className="h-40 w-40 m-4 object-cover" />
        <p>{name}</p>
        <span className=" font-bold text-lg">Rs{price}</span>
        <div className="flex items-center gap-4">
            <button onClick={()=>handler({ productId, price, name, photo, stock, quantity: 1 })} className="bg-teal-500 text-white lg:text-lg text-sm px-4 py-1 rounded">Add to cart</button>
            <button className=" border border-teal-500 lg:text-lg text-sm px-2 text-teal-500">View</button>
        </div>
    </div>
  )
}

export default ProductCard