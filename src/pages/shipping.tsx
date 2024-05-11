import { ChangeEvent, useState } from "react"
import { BiArrowBack } from "react-icons/bi"

const Shipping = () => {
    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        country:"",
        pinCode:""
    })
    const changeHandler = (e: ChangeEvent<HTMLInputElement>)=>{}

  return (
    <div className="shipping">
        <button><BiArrowBack /></button>
        <form >
            <h1>Shipping Address</h1>
            <input type="text"
            required
            placeholder="Address"
            name="address"
            value={shippingInfo.address}
            onChange={changeHandler}
            />
        </form>

    </div>
  )
}

export default Shipping