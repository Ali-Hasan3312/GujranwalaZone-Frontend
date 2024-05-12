import { ChangeEvent, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

const Shipping = () => {
  const navigate = useNavigate()
    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        country:"",
        pinCode:""
    })
    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> )=>{
      setShippingInfo((prev)=> ({
        ...prev, [e.target.name]:e.target.value
      }))
    }

  return (
    <div className="shipping flex flex-row justify-center items-center gap-8">
        <button onClick={()=> navigate("/cart")} className=" h-9 w-9 bg-gray-800 text-white flex justify-center items-center fixed top-8 left-8 rounded-full border-none outline-none cursor-pointer shadow-lg"><BiArrowBack className="biarrowback" /></button>
        <form className="flex flex-col justify-center items-stretch gap-8 p-8 max-w-[450px] w-full mt-[-50px]">
            <h1 className=" tracking-[1px] font-xl text-lg text-center uppercase">Shipping Address</h1>
            <input type="text"
            required
            placeholder="Address"
            name="address"
            value={shippingInfo.address}
            onChange={changeHandler}
            className=" border border-solid border-gray-800 p-2 text-base rounded border-opacity-35 outline-none"
            />
            <input type="text"
            required
            placeholder="City"
            name="city"
            value={shippingInfo.city}
            onChange={changeHandler}
            className=" border border-solid border-gray-800 p-2 text-base rounded border-opacity-35 outline-none"
            />
            <input type="text"
            required
            placeholder="State"
            name="state"
            value={shippingInfo.state}
            onChange={changeHandler}
            className=" border border-solid border-gray-800 p-2 text-base rounded border-opacity-35 outline-none"
            />
            <select
             name="country"
             required
             value={shippingInfo.country}
             onChange={changeHandler}
             className=" border border-solid border-gray-800 p-2 text-base rounded border-opacity-35 outline-none"
             >
              <option value="">Choose Country</option>
              <option value="pakistan">Pakistan</option>


            </select>
            <input type="number"
            required
            placeholder="Pin Code"
            name="pinCode"
            value={shippingInfo.pinCode}
            onChange={changeHandler}
            className=" border border-solid border-gray-800 p-2 text-base rounded border-opacity-35 outline-none"
            />
            <button type="submit" className=" border-none outline-none cursor-pointer p-2 bg-teal-700 text-white rounded uppercase text-base hover:opacity-80">Pay Now</button>
        </form>

    </div>
  )
}

export default Shipping