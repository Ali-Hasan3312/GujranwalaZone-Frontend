import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, server } from "../redux/store";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartReducer";
import axios from "axios";
const Cart = () => {
  const {cartItems, subtotal, tax, total, shippingCharges, discount} = useSelector((state: RootState)=>state.cartReducer)
  const dispatch = useDispatch()
  const [couponCode,setCouponCode] = useState<string>("")
  const [isValidCouponCode,setIsValidCouponCode] = useState<boolean>(false)
  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;
    
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };
  useEffect(()=>{
    if (!couponCode) return;
    const { token: cancelToken, cancel } = axios.CancelToken.source();
    const timeOutId = setTimeout(()=>{
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken,
        }

        ).then((res) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
      
      
    },1000)
    return ()=>{
      clearTimeout(timeOutId)
      cancel();
      setIsValidCouponCode(false)
     }
  },[couponCode])

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);
  
  return (
    <div className="Cart h-full w-full md:w-[480px] py-8 px-16 md:pr-8  md:mt-8  flex md:flex-col md:justify-center md:items-center md:ml-[-80px] justify-between gap-12">
      <main className=" w-[60%] md:w-full md:h-full tracking-[2px] font-light uppercase text-center overflow-y-auto mt-[-130px]">
        {
          cartItems.length > 0 ? (
            cartItems.map((i,idx)=>(
              <CartItem key={idx}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              cartItem={i} />
            ))
          ): (
               <h1>No Items Added To Cart</h1>
          )
        }
      </main>
      <aside className=" w-[40%] md:w-full p-12 flex  flex-col justify-center items-stretch gap-6 mt-10">
        <p>Subtotal: Rs{subtotal}</p>
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
        {cartItems.length > 0 && 
        <Link className=" bg-teal-500 p-4 text-white flex justify-center items-center gap-4 uppercase tracking-[2px] rounded hover:opacity-80" to={"/shipping"}>Checkout</Link> }
      </aside>
    </div>
  )
}

export default Cart