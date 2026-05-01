import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

const Checkout = ({ cartItems, cartTotal }: CheckoutProps) => {

  const [pan, setPan] = useState('')
  const [expiryMonth, setExpiryMonth] = useState('')
  const [expiryYear, setExpiryYear] = useState('')
  const [cvv, setCvv] = useState('')

  const navigate = useNavigate()


  const handleSubmit = async () => {
    console.log('handleSubmit')

    const orderResponse = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pan: pan,
        expiryMonth: parseInt(expiryMonth),
        expiryYear: parseInt(expiryYear),
        tax: 0,
        tip: 0,
        area: '',
        location: '',
        status: 'pending'
      })
    })

    const order = await orderResponse.json()
    console.log('Order created:', order)

    const itemsResponse = await fetch(`/api/items/order/${order.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        cartItems.flatMap((item) =>
        Array.from({ length: item.quantity }, () => ({
        orderid: order.id,
        itemid: item.id,
        price: item.price,
        notes: '',
        firstName: ''
    }))
)
      )
    })

    const items = await itemsResponse.json()
    console.log('Items added:', items)

    navigate(`/order/${order.id}`) 
  }

  return (
    <div className="app-shell">
      <div className="page-content">

        <h2>Checkout</h2>

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