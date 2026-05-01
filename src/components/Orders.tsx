import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// defineing the shape of an order (type safety)
interface Order {
  id: number
  ordertime: string
  status: string
  pan: string
}

// ofetches list of orders from backend and displays them
const Orders = () => {
    // initiialize state as empty array or orders
  const [orders, setOrders] = useState<Order[]>([])
  // useNavigate hook navigates to a different page when orderis clicked
  const navigate = useNavigate()

  // useEffect hook to fetch orders when component mounts
  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data))
  }, [])

  return (
    <div className="app-shell">
      <div className="page-content">
         {/* Order History */}
        <h2>Order History</h2>
         {/* If orders don't exist, display message */}
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul>
             {/* Map thru orders and display them */}
             {/* Navigate to order details page */}
            {orders.map((order) => (
              <li
                key={order.id}
                onClick={() => navigate(`/order/${order.id}`)}
                style={{ cursor: 'pointer', marginBottom: '12px' }}
              >
                 {/* Display order info, format order time, and show status */}
                Order #{order.id} — {order.status} — {order.ordertime ? new Date(order.ordertime).toLocaleString() : 'Date unavailable'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Orders