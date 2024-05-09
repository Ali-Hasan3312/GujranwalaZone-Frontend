import { ChangeEvent, FormEvent, useState } from "react"
import AdminSideBar from "../../../components/adminSideBar"

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const ProductManagement = () => {
  const [name,setName]  = useState<string>('Puma Shoes')
  const [price,setPrice]  = useState<number>(2500)
  const [stock,setStock]  = useState<number>(10)
  const [photo,setPhoto]  = useState<string>(img)
  
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);
  const changeImageHandler= (e: ChangeEvent<HTMLInputElement>)=>{
    const file: File | undefined = e.target.files?.[0];
    const reader: FileReader = new FileReader();
    if(file){
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
        if(typeof reader.result==="string"){
          setPhotoUpdate(reader.result)
        }
      }

    }
  }
  
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(nameUpdate);
    setPrice(priceUpdate);
    setStock(stockUpdate);
    setPhoto(photoUpdate);
  };
  return (
    <div className='grid grid-cols-[20%_80%] gap-4 h-screen pr-4 bg-gray-100 lg:overflow-auto md:grid-cols-[1fr]'>
      <AdminSideBar />
      <main className="overflow-y-auto w-full flex flex-row justify-center p-16 lg:p-8 sm:flex-col sm:items-center sm:p-0">
        <section className="h-[100vh] p-8 mr-[-60px] w-full max-w-96 bg-white shadow-gray-700 shadow-sm m-auto flex flex-col gap-4 relative rounded sm:max-w-[400px]">
          <strong className=" font-light">ID - adlfkjslfjlkds</strong>
          <img src={photo} alt="Product" className=" h-full w-full object-cover" />
          <p className=" tracking-wide font-bold text-gray-500 uppercase text-center text-sm">{name}</p>
          {stock > 0? (
            <span className=" absolute right-8 top-8 text-green-500">{stock} Available</span>
          ):(
            <span className=" absolute right-8 top-8 text-red-500">Not Available</span>
          )}
          <h3 className=" text-2xl text-center font-bold">${price}</h3>
        </section>
        <article className=" h-[100vh] p-8 w-full max-w-96 bg-white rounded shadow-gray-700 shadow-sm m-auto ">
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
              <label className=" absolute left-0 top-[-1.5rem]">Photo</label>
              <input type="file" 
              required
              onChange={changeImageHandler}
              className=" w-full p-2 rounded border border-opacity-25 outline-none" />
            </div>
            {photo && <img src={photo} alt="New Image" className=" h-20 w-20 object-cover rounded" />}
            <button type="submit" className=" p-2 border-none bg-blue-700 text-white w-full rounded cursor-pointer hover:opacity-80">Update</button>
          </form>
        </article>
      </main>
    </div>
  )
}
export default ProductManagement