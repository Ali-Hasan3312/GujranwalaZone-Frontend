import { Link, useParams } from "react-router-dom";
import { useOrderDetailsQuery } from "../redux/api/orderAPI";
import { Order, OrderItem } from "../redux/types/types";

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

const OrderDetails = () => {
  const params = useParams();
  const { data } = useOrderDetailsQuery(params.id!);
  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: { name },
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingCharges,
  } = data?.order || defaultData;
  return (
    <main className="flex lg:flex-row flex-col items-start px-8 py-8 w-3/4 mx-auto gap-8">
      <section className=" lg:p-8 py-4 px-2 w-[300px] lg:w-[600px] bg-white/90 rounded shadow-gray-700 shadow-sm">
        <h2 className="tracking-wider uppercase text-center font-semibold">Order Items</h2>
        {orderItems.map((i) => (
          <ProductCard
            key={i._id} // Add the key prop here
            name={i.name}
            photo={i.photo}
            price={i.price}
            quantity={i.quantity}
            productId={i._id}
            _id={i._id}
          />
        ))}
      </section>
      <article className=" bg-white/90 px-8 py-8 rounded shadow-gray-700 shadow-sm">
        <h1 className="text-center tracking-wider font-bold uppercase">Order Info</h1>
        <h5 className="mt-8 ml-2 text-lg font-semibold">User Info</h5>
        <p className="m-1">Name: {name}</p>
        <p className="m-1">
          Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
        </p>

        <h5 className="mt-8 ml-2 text-lg font-semibold">Amount Info</h5>
        <p className="m-1">Subtotal: {subtotal}</p>
        <p className="m-1">Shipping Charges: {shippingCharges}</p>
        <p className="m-1">Tax: {tax}</p>
        <p className="m-1">Discount: {discount}</p>
        <p className="m-1">Total: {total}</p>

        <h5 className="mt-8 ml-2 text-lg font-semibold">Status Info</h5>
        <p className="m-1">
          Status: {" "}
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
  <div className="flex items-center justify-center flex-col gap-2 mt-4">
    <img className=" h-40 w-40 rounded-md" src={`${photo}`} alt={name} />
    <Link to={`/product/${productId}`}>{name}</Link>
    <span>
      ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default OrderDetails;
