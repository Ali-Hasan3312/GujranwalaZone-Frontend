import { ChangeEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useNewOrderMutation } from "../redux/api/orderAPI";
import { resetCart } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";
import { NewOrderRequest } from "../redux/types/api-types";
import { responseToast } from "../redux/utils/features";

const Shipping = () => {
  const user = useSelector((state: RootState) => state.userReducer.user);
 
  const {
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state: RootState) => state.cartReducer);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: ""
  });

  const [newOrder] = useNewOrderMutation();
  const [orderResponse, setOrderResponse] = useState<any>(null);

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }));
  };

  const submitHandler = async () => {
    const orderData: NewOrderRequest = {
      shippingInfo,
      orderItems: cartItems,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      user : {
        _id:user?._id!,
        name:user?.name!
      }
    };
    const res = await newOrder(orderData);
    setOrderResponse(res);
  };
  useEffect(() => {
    if (orderResponse?.data) {
      dispatch(resetCart());
      responseToast(orderResponse, navigate, "/orders");
    }
  }, [orderResponse, dispatch, navigate]);

  useEffect(() => {
    if (cartItems.length < 0) navigate("/cart");
  }, [cartItems, navigate]);

  return (
    <div className="shipping flex flex-row justify-center items-center gap-8">
      <button onClick={() => navigate("/cart")} className="h-9 w-9 bg-gray-800 text-white flex justify-center items-center fixed top-8 left-8 rounded-full border-none outline-none cursor-pointer shadow-lg">
        <BiArrowBack className="biarrowback" />
      </button>
      <div className="flex flex-col justify-center items-stretch gap-8 p-8 max-w-[450px] w-full mt-[-50px]">
        <h1 className="tracking-[1px] font-xl text-lg text-center uppercase">Shipping Address</h1>
        <input
          type="text"
          required
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
          className="border border-solid border-gray-800 p-2 text-base rounded border-opacity-35 outline-none"
        />
        <input
          type="text"
          required
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
          className="border border-solid border-gray-800 p-2 text-base rounded border-opacity-35 outline-none"
        />
        <input
          type="text"
          required
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
          className="border border-solid border-gray-800 p-2 text-base rounded border-opacity-35 outline-none"
        />
        <select
          name="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
          className="border border-solid border-gray-800 p-2 text-base rounded border-opacity-35 outline-none"
        >
          <option value="">Choose Country</option>
          <option value="pakistan">Pakistan</option>
        </select>
        <input
          type="number"
          required
          placeholder="Pin Code"
          name="pinCode"
          value={shippingInfo.pinCode}
          onChange={changeHandler}
          className="border border-solid border-gray-800 p-2 text-base rounded border-opacity-35 outline-none"
        />
        <button onClick={submitHandler} className="border-none outline-none cursor-pointer p-2 bg-teal-700 text-white rounded uppercase text-base hover:opacity-80">Confirm</button>
      </div>
    </div>
  );
}

export default Shipping;