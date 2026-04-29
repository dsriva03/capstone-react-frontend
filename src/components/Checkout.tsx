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
                  {item.name} x {item.quantity} — ${ (item.price * item.quantity).toFixed(2) }
                </li>
              ))}
            </ul>
            <p>Total: ${cartTotal.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Checkout