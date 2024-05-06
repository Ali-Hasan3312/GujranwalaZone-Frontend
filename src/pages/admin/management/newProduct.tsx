import { ChangeEvent, useState } from "react"
import AdminSideBar from "../../../components/adminSideBar"

const NewProduct = () => {
  const [name,setName]  = useState<string>('')
  const [price,setPrice]  = useState<number>()
  const [stock,setStock]  = useState<number>()
  const [photo,setPhoto]  = useState<string>('')
  const changeImageHandler= (e: ChangeEvent<HTMLInputElement>)=>{
    const file: File | undefined = e.target.files?.[0];
    const reader: FileReader = new FileReader();
    if(file){
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
        if(typeof reader.result==="string"){
          setPhoto(reader.result)
        }
      }

    }
  }
  return (
    <div className='grid grid-cols-[20%_80%] gap-4 h-screen pr-4 bg-gray-100'>
      <AdminSideBar />
      <main className="overflow-y-auto w-full flex flex-row justify-center p-16">
        <article className=" h-[100vh] p-8 w-full max-w-96 bg-white rounded shadow-gray-700 shadow-sm m-auto ">
          <form className="flex flex-col items-center gap-8">
            <h2 className=" uppercase tracking-wide font-semibold">New Product</h2>
            <div className=" w-full relative">
              <label className=" absolute left-0 top-[-1.5rem]">Name</label>
              <input type="text" 
              required
              placeholder="Name"
              
              onChange={(e)=> setName(e.target.name)}
              className=" w-full p-2 rounded border border-opacity-25 outline-none" />
            </div>
            <div className=" w-full relative">
              <label className=" absolute left-0 top-[-1.5rem]">Price</label>
              <input type="number" 
              required
              placeholder="Price"
              value={price}
              onChange={(e)=> setPrice(Number(e.target.value))}
              className=" w-full p-2 rounded border border-opacity-25 outline-none" />
            </div>
            <div className=" w-full relative">
              <label className=" absolute left-0 top-[-1.5rem]">Stock</label>
              <input type="number" 
              required
              placeholder="Stock"
              value={stock}
              onChange={(e)=> setStock(Number(e.target.value))}
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
            <button type="submit" className=" p-2 border-none bg-blue-700 text-white w-full rounded cursor-pointer hover:opacity-80">Create</button>
          </form>
        </article>
      </main>
    </div>
  )
}

export default NewProduct