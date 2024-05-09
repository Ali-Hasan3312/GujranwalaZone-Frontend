import { useState } from "react";
import AdminSideBar from "../../../components/adminSideBar"
import { OrderItemType, OrderType } from "../../../types";
import { Link } from "react-router-dom";
const img =  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";
const orderItems: OrderItemType[] = [
  {
    name: "Puma Shoes",
    photo: img,
    _id: "adlfkjslfjlkds",
    quantity: 4,
    price: 2000,
  }
]
const TransactionManagement = () => {
  const [order, setOrder] = useState<OrderType>({
    name: "Abhishek Singh",
    address: "77 Black Street",
    city: "Neyword",
    state: "Nevada",
    country: "India",
    pinCode: 2434341,
    status: "Processing",
    subtotal: 4000,
    discount: 1200,
    shippingCharges: 0,
    tax: 200,
    total: 4000 + 200 + 0 - 1200,
    orderItems,
    _id: "asdnasjdhbn",
  })
  const {
    name,
    address,
    city,
    country,
    state,
    pinCode,
    subtotal,
    shippingCharges,
    tax,
    discount,
    total,
    status,
  } = order;
  const updateHander = () => {
    setOrder((prev) => ({
      ...prev,
      status: prev.status === "Processing" ? "Shipped" : "Delivered",
    }));
  };
  return (
    <div className='grid grid-cols-[20%_80%] gap-4 h-screen pr-4 bg-gray-100 lg:overflow-auto md:grid-cols-[1fr]'>
    <AdminSideBar />
    <main className="overflow-y-auto w-full flex flex-row justify-center p-16">
      <section className="h-[100vh] mr-[-60px] p-8 w-full max-w-96 bg-white rounded shadow-gray-700 shadow-sm m-auto">
        <h2 className=" tracking-wider uppercase text-center font-semibold">Order Items</h2>
        {
          order.orderItems.map((i) => (
            <ProductCard 
            name={i.name}
            photo={i.photo}
            price={i.price}
            quantity={i.quantity}
            _id={i._id}
            />
          ))
        }
      </section>
      <article className="h-[100vh] p-8 w-full max-w-96 bg-white rounded shadow-gray-700 shadow-sm m-auto">
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

          <button onClick={updateHander} className=" my-8 p-2 text-lg cursor-pointer rounded hover:opacity-80 border-none bg-blue-500 text-white w-full">Process Status</button>
      </article>
    </main>
  </div>
  )
}
const ProductCard = ({name, photo, price, quantity, _id}: OrderItemType)=>(
  <div className=" flex flex-row items-center gap-4 lg:overflow-auto">
    <img src={photo} alt={name} className=" h-12 w-12 object-cover rounded" />
    <Link to={`/product/${_id}`}>{name}</Link>
    <span className=" ml-auto">
      ${price} X {quantity} = ${price * quantity}
    </span>
  </div>

)
export default TransactionManagement