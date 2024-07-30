import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSideBar from "../../../components/adminSideBar";
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
    responseToast(res, navigate, "/admin/transaction");
  };
  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    responseToast(res, navigate, "/admin/transaction");
  };
  
  return (
    <div className='grid no-scrollbar overflow-auto grid-cols-[20%_80%] gap-4 md:h-[1000px] pr-4 bg-gray-100 lg:overflow-auto md:grid-cols-[1fr]'>
    <AdminSideBar />
    <main className="no-scrollbar lg:ml-[-70px] overflow-y-auto md:h-[1000px] w-full flex flex-row justify-center md:flex-col md:justify-center md:items-center md:mt-20 md:gap-8 p-16 lg:p-8 sm:flex-col sm:items-center sm:p-0">
     
      <article className="no-scrollbar lg:mr-[-100px] md:h-[1000px] relative p-8 w-full max-w-96 bg-white rounded shadow-gray-700 shadow-sm m-auto">
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
      <section className="no-scrollbar h-[100vh] p-8 mr-[90px] w-full max-w-96 bg-white shadow-gray-700 shadow-sm m-auto flex flex-col gap-4 relative rounded sm:max-w-[400px]">
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
    </main>
  </div>
  )
}
const ProductCard = ({
  name,
  photo,
  price,
  quantity,
  productId,
}: OrderItem) => (
  <div className="transaction-product-card">
    <img className=" h-40 w-40" src={photo} alt={name} />
    <Link to={`/product/${productId}`}>{name}</Link>
    <span>
      ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default TransactionManagement