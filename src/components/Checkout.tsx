import { useState } from 'react'

interface CartItem {
  id: number
  name: string
  description: string
  category: string
  price: number
  imageurl: string
  available: boolean
  quantity: number
}

interface CheckoutProps {
  cartItems: CartItem[]
  cartTotal: number
}

// checkout is a component that shows the cart summary and a payment form
// it receives the cart items and total from the App component as props
const Checkout = ({ cartItems, cartTotal }: CheckoutProps) => {

    // state for form fields
  const [pan, setPan] = useState('')
  const [expiryMonth, setExpiryMonth] = useState('')
  const [expiryYear, setExpiryYear] = useState('')
  const [cvv, setCvv] = useState('')

  // handleSubmit is a function that will be called when the user clicks the "Place Order" button.
  const handleSubmit = () => {
    console.log({ pan, expiryMonth, expiryYear, cvv })
  }

  return (
    <div className="app-shell">
      <div className="page-content">

        <h2>Checkout</h2>

        {/* Cart Summary */}
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.quantity} — ${(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p>Total: ${cartTotal.toFixed(2)}</p>
          </div>
        )}

        {/* Payment Form */}
        <div className="card-form">
          <h3>Payment Details</h3>

          <label>Card Number</label>
          <input
            type="text"
            value={pan}
            onChange={(e) => setPan(e.target.value)}
            placeholder="1234 5678 9012 3456"
          />

          <label>Expiry Month</label>
          <input
            type="text"
            value={expiryMonth}
            onChange={(e) => setExpiryMonth(e.target.value)}
            placeholder="MM"
          />

          <label>Expiry Year</label>
          <input
            type="text"
            value={expiryYear}
            onChange={(e) => setExpiryYear(e.target.value)}
            placeholder="YYYY"
          />

          <label>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
          />

          <button onClick={handleSubmit}>Place Order</button>
        </div>

      </div>
    </div>
  )
}

export default Checkout