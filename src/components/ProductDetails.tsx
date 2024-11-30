import { IoIosStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useProductDetailsQuery } from "../redux/api/productAPI";
const ProductDetails = () => {
   
    const params = useParams();
    const {data} = useProductDetailsQuery(params.id!)
    const product = data?.product
    
  return (
    
    <main className=" pb-8">
       <div className="flex items-center justify-center gap-48">
       <div className="flex flex-col items-center ">
            <img src={product?.photo} alt={product?.name} />
            <div className="h-20 w-20 flex items-center justify-center border border-teal-600 cursor-pointer bg-white/70 rounded-lg">
                <img src={product?.photo} className="h-full" alt={product?.name} />
            </div>
        </div>
        <div className="flex flex-col gap-4">
            <h1 className=" font-semibold text-4xl">{product?.name}</h1>
            <div className="flex gap-3">
                <span className=" text-gray-500">Brand:</span>
                <span className=" font-medium">Apple</span>
            </div>
            <div className="flex items-center gap-2">
                <span className=" text-gray-500">Rating: </span>
                <span className="flex items-center text-xl text-yellow-500">
                    <IoStar />
                    <IoStar />
                    <IoStar />
                    <IoStar />
                    <IoIosStarOutline />
                </span>
                (50)
            </div>
            <div className="flex gap-3">
                <span className=" text-gray-500">Price:</span>
                <span className=" font-medium">{product?.price} Pkr</span>
            </div>
            <div className="flex gap-3">
                <span className=" text-gray-500">Stock:</span>
                <span className=" font-medium">{product?.stock!>0? "Available":"Sold"}</span>
            </div>
            <div className="flex items-center gap-4 mt-2">
            <button  className="addToCart relative text-white hover:text-teal-500 hover:border hover:border-teal-500 lg:text-lg text-sm w-28 h-12 rounded overflow-hidden">
              <span className="relative z-10">Add to cart</span>
            </button>
            <Link to={"/productDetails"} className="viewBtn flex items-center justify-center hover:text-white hover:border-none relative border border-teal-500 lg:text-lg text-sm text-teal-500 overflow-hidden h-8 w-24"><span className="relative z-10">Buy Now</span></Link>
        </div>
        </div>
       </div>
     <section className=" px-20 mt-10">
        <h4 className="font-semibold text-xl">Description:</h4>
        <p className="mt-2">{product?.description}</p>
        </section>  
    </main>
  )
}

export default ProductDetails