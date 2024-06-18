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
    <main className="bg-gray-100 no-scrollbar overflow-y-auto w-full md:gap-8 overflow-auto flex-wrap flex flex-row  md:flex-col md:items-center md:justify-center justify-center p-16">
      <article className="md:h-[80vh] h-[100vh] lg:mr-[-170px] relative p-8 w-full max-w-96 bg-white rounded shadow-gray-700 shadow-sm m-auto">
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
      <section className="md:h-[50vh] h-[100vh] p-8 w-full max-w-96 bg-white rounded shadow-gray-700 shadow-sm m-auto">
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
  <div className="transaction-product-card">
    <img src={`${photo}`} alt={name} />
    <Link to={`/product/${productId}`}>{name}</Link>
    <span>
      ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default OrderDetails;
