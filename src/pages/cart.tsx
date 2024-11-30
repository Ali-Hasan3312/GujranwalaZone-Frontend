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
    <div className="flex items-start justify-center w-[80%] mx-auto py-8 gap-8">
      <main className="bg-white/90 px-4 py-4 rounded-lg tracking-[2px] font-light uppercase text-center">
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
      <aside className=" flex flex-col gap-4 py-8 w-[400px] px-8 rounded-lg bg-white/90">
       <div className="flex items-center gap-4">
       <p className=" font-semibold text-lg">Subtotal:</p><span>Rs {subtotal}</span> 
       </div>
       <div className="flex items-center gap-4">
       <p className=" font-semibold text-lg">Shipping Charges:</p><span> Rs {shippingCharges}</span>
       </div>
       <div className="flex items-center gap-4">
       <p className=" font-semibold text-lg">Tax:</p> <span>Rs {tax}</span>
       </div>
       <div className="flex items-center gap-4">
       <p className=" font-semibold text-lg">Discount: </p><span><em className=" text-red-500"> - Rs {discount}</em> </span>
       </div>
       <div className="flex items-center gap-4">
       <p className=" font-semibold text-lg">Total:</p><span> Rs {total}</span>
       </div>
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