import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cartItem";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId: "adjlfs",
    photo: "https://m.media-amazon.com/images/I/71DL+S6ihBL._AC_SL1500_.jpg",
    name: "MackBook",
    price: 34000,
    quantity: 3,
    stock: 12
  }
];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.18)
const shippingCharges = 200;
const discount = 400
const total = subTotal + tax + shippingCharges;
const Cart = () => {
  const [couponCode,setCouponCode] = useState<string>("")
  const [isValidCouponCode,setIsValidCouponCode] = useState<boolean>(false)
  useEffect(()=>{
    const timeOutId = setTimeout(()=>{
       if(Math.random() > 0.5)
        setIsValidCouponCode(true);
       
       else
        setIsValidCouponCode(false);

      
    },1000)
    return ()=>{
      clearTimeout(timeOutId)
      setIsValidCouponCode(false)
     }
  },[couponCode])
  
  return (
    <div className="Cart py-8 px-16 flex justify-between gap-12">
      <main className=" w-[70%] tracking-[2px] font-light uppercase text-center overflow-y-auto mt-[-130px]">
        {
          cartItems.length > 0 ? (
            cartItems.map((i,idx)=>(
              <CartItem key={idx} cartItem={i} />
            ))
          ): (
               <h1>No Items Added To Cart</h1>
          )
        }
      </main>
      <aside className=" w-[30%] p-12 flex flex-col justify-center items-stretch gap-6 mt-10">
        <p>Subtotal: Rs{subTotal}</p>
        <p>Shipping Charges: Rs{shippingCharges}</p>
        <p>Tax: Rs{tax}</p>
        <p>Discount: <em className=" text-red-500"> - Rs{discount}</em> </p>
        <p>Total: Rs{total}</p>
        <input className=" p-4 border border-solid border-black border-opacity-30 outline-none rounded mt-8" type="text"
        placeholder="Coupon Code"
        value={couponCode}
        onChange={(e)=> setCouponCode(e.target.value)}
        />
        {
          couponCode && ( 
            isValidCouponCode?(
            <span className=" text-green-500 mt-[-1rem] flex items-center justify-center gap-1">
              Rs{discount} off using the <code className=" font-black self-end">{couponCode}</code>
            </span>
          ) : (
            <span className=" text-red-500 mt-[-1rem] flex items-center justify-center gap-1">Invalid Coupon <VscError /></span>
          )
        )
        }
        <Link className=" bg-teal-500 p-4 text-white flex justify-center items-center gap-4 uppercase tracking-[2px] rounded hover:opacity-80" to={"/shipping"}>Checkout</Link>
      </aside>
    </div>
  )
}

export default Cart