import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from "../../../redux/api/orderAPI";
import { RootState } from "../../../redux/store";
import { Order, OrderItem } from "../../../redux/types/types";
import { responseToast } from "../../../redux/utils/features";


const defaultData: Order = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  status: "",
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: { name: "", _id: "" },
  _id: "",
};
const TransactionManagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const params = useParams();
  const navigate = useNavigate();

  const {data } = useOrderDetailsQuery(params.id!);
  let name;
  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingCharges,
  } = data?.order || defaultData;
  if(data?.order?.user?.name){
   name = data.order.user.name
  }
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const updateHandler = async () => {
    const res = await updateOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    responseToast(res, navigate, "/dashboard");
  };
  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    responseToast(res, navigate, "/admin/transaction");
  };
  
  return (
    <main className="flex items-start justify-center gap-8 mx-auto py-8">
     <section className=" bg-white py-4 px-4 shadow-gray-700 shadow-sm flex flex-col items-center justify-center gap-4 rounded">
        <h2 className=" tracking-wider uppercase text-center font-semibold">Order Items</h2>
        {
          orderItems.map((i) => (
            <ProductCard 
            key={i._id}
            name={i.name}
            photo={i.photo}
            price={i.price}
            quantity={i.quantity}
            productId={i._id}
            _id={i._id}
            />
          ))
        }
      </section>
      <article className="bg-white rounded px-8 w-[40vw] py-2 shadow-gray-700 shadow-sm">
      <button className="product-delete-btn bg-gray-800 text-white text-[1.2rem] w-[2.5rem] h-[2.5rem] flex items-center justify-center rounded-full cursor-pointer border-none absolute -top-[1.2rem] -right-[1.2rem]" onClick={deleteHandler}>
                <FaTrash className=""/>
              </button>
      <h1 className=" text-center tracking-wider font-bold uppercase">Order Info</h1>
          <h5 className=" mt-8 ml-2 text-lg font-semibold">User Info</h5>
          <p className=" m-1">Name: {name}</p>
          <p className=" m-1">
            Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
          </p>

          <h5 className=" mt-8 ml-2 text-lg font-semibold">Amount Info</h5>
          <p className=" m-1">Subtotal: {subtotal}</p>
          <p className=" m-1">Shipping Charges: {shippingCharges}</p>
          <p className=" m-1">Tax: {tax}</p>
          <p className=" m-1">Discount: {discount}</p>
          <p className=" m-1">Total: {total}</p>

          <h5 className=" mt-8 ml-2 text-lg font-semibold">Status Info</h5>
          <p className=" m-1">
            Status:  {" "}
            <span
              className={
                status === "Delivered"
                  ? `text-purple-500`
                  : status === "Shipped"
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {status}
            </span>
          </p>

          <button onClick={()=>updateHandler()} className=" my-8 p-2 text-lg cursor-pointer rounded hover:opacity-80 border-none bg-blue-500 text-white w-full">Process Status</button>
      </article>
      
    </main>
 
  )
}
const ProductCard = ({
  name,
  photo,
  price,
  quantity,
  productId,
}: OrderItem) => (
  <div className="flex flex-col justify-center gap-4">
    <img className=" h-96 w-96" src={photo} alt={name} />
    <Link to={`/product/${productId}`}>{name}</Link>
    <span>
      ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default TransactionManagement