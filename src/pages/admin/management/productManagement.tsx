import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation
} from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../redux/utils/features";
const ProductManagement = () => {
  const user = useSelector((state: RootState)=> state.userReducer.user)
  const params = useParams()
  const navigate = useNavigate()
  const { data, isError } = useProductDetailsQuery(params.id!);
  const { price, photo, name, stock, category } = data?.product || {
    photo: "",
    category: "",
    name: "",
    stock: 0,
    price: 0,
  };
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File>();
  const changeImageHandler= (e: ChangeEvent<HTMLInputElement>)=>{
    const file: File | undefined = e.target.files?.[0];
    const reader: FileReader = new FileReader();
    if(file){
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
        if(typeof reader.result==="string"){
          setPhotoUpdate(reader.result)
          setPhotoFile(file)
          
          
        }
      }

    }
  }
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (nameUpdate) formData.set("name", nameUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (stockUpdate !== undefined)
      formData.set("stock", stockUpdate.toString());
    if (photoFile) formData.set("photo", photoFile);
    if (categoryUpdate) formData.set("category", categoryUpdate);
   
    
    const res = await updateProduct({
      formData,
      userId: user?._id!,
      productId: data?.product._id!,
    });

    responseToast(res, navigate, "/admin/products");
  };
  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: data?.product._id!,
    });

    responseToast(res, navigate, "/admin/products");
  };
  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
    }
  }, [data]);
  if (isError) return <Navigate to={"/404"} />;
  return (
    <main className="flex lg:flex-row px-4 flex-col items-center justify-center lg:items-start gap-8 lg:gap-20 py-8">
        
        <article className="  relative p-8 px-14  bg-white rounded shadow-gray-700 shadow-sm ">
        <button className="product-delete-btn bg-gray-800 text-white text-[1.2rem] w-[2.5rem] h-[2.5rem] flex items-center justify-center rounded-full cursor-pointer border-none absolute -top-[1.2rem] -right-[1.2rem]" onClick={deleteHandler}>
                <FaTrash className=""/>
              </button>
          <form onSubmit={submitHandler} className="flex flex-col items-center gap-8">
            <h2 className=" uppercase tracking-wide font-semibold">Manage</h2>
            <div className=" w-full relative">
              <label className=" absolute left-0 top-[-1.5rem]">Name</label>
              <input type="text" 
              required
              placeholder="Name"
              value={nameUpdate}
              onChange={(e)=> setNameUpdate(e.target.value)}
              className=" w-full p-2 rounded border border-opacity-25 outline-none" />
            </div>
            <div className=" w-full relative">
              <label className=" absolute left-0 top-[-1.5rem]">Price</label>
              <input type="number" 
              required
              placeholder="Price"
              value={priceUpdate}
              onChange={(e)=> setPriceUpdate(Number(e.target.value))}
              className=" w-full p-2 rounded border border-opacity-25 outline-none" />
            </div>
            <div className=" w-full relative">
              <label className=" absolute left-0 top-[-1.5rem]">Stock</label>
              <input type="number" 
              required
              placeholder="Stock"
              value={stockUpdate}
              onChange={(e)=> setStockUpdate(Number(e.target.value))}
              className=" w-full p-2 rounded border border-opacity-25 outline-none" />
            </div>
            <div className=" w-full relative">
                  <label className=" absolute left-0 top-[-1.5rem]">Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                    className=" w-full p-2 rounded border border-opacity-25 outline-none"
                  />
                </div>
            <div className=" w-full relative">
              <label className=" absolute left-0 top-[-1.5rem]">Photo</label>
              <input type="file" 
              onChange={changeImageHandler}
              className=" w-full p-2 rounded border border-opacity-25 outline-none" />
            </div>
            {photoUpdate && <img src={photoUpdate} alt="New Image" className=" h-20 w-20 object-cover rounded" />}
            <button type="submit" className=" p-2 border-none bg-blue-700 text-white w-full rounded cursor-pointer hover:opacity-80">Update</button>
          </form>
        </article>
        <section className=" p-8  bg-white shadow-gray-700 shadow-sm flex flex-col gap-8 relative rounded ">
          <strong className=" font-light">ID -{data?.product._id}</strong>
          <img src={photo} alt="Product" className=" h-[400px] lg:h-[300px] object-cover" />
          <p className=" tracking-wide font-bold text-gray-500 uppercase text-center text-sm">{name}</p>
          {stock > 0? (
            <span className=" absolute right-8 top-14 text-green-500">{stock} Available</span>
          ):(
            <span className=" absolute right-8 top-14 text-red-500">Not Available</span>
          )}
          <h3 className=" text-2xl text-center font-bold">${price}</h3>
        </section>
      </main>
  
  )
}
export default ProductManagement