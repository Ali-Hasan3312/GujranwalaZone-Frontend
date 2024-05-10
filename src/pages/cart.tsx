const cartItems = [];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.18)
const shippingCharges = 200;
const total = subTotal + tax + shippingCharges;
const Cart = () => {
  return (
    <div className="Cart">
      <main></main>
      <aside>
        <p>Subtotal: Rs ${subTotal}</p>
      </aside>
    </div>
  )
}

export default Cart