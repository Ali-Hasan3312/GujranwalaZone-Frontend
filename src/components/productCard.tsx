import { FaPlus } from "react-icons/fa"


interface ProductsProps{
    productId:string,
    photo: string,
    name: string,
    price: number,
    stock: number,
    handler: ()=> void

}
const ProductCard = ({productId,photo,name,price,stock,handler}:ProductsProps) => {
  return (
    <div className="productcard w-[12.75rem] h-[16rem] p-4 flex flex-col justify-center items-center relative bg-white  gap-1">
        <img src={photo} alt={name} className=" m-4 object-cover" />
        <p>{name}</p>
        <span className=" font-bold text-lg">Rs{price}</span>
        <div className=" opacity-0 absolute w-full h-full top-0 left-0 bg-black bg-opacity-25 hover:opacity-100 flex flex-row justify-center items-center gap-4">
            <button onClick={()=>handler()} className=" flex flex-row justify-center items-center gap-4 h-8 w-8 rounded-full border-none bg-teal-500 text-white text-sm transition-all hover:rotate-[15deg]"><FaPlus /></button>
        </div>
    </div>
  )
}

export default ProductCard