import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Order {
  id: number
  ordertime: string
  status: string
  pan: string
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data))
  }, [])

  return (
    <div className="app-shell">
      <div className="page-content">
        <h2>Order History</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li
                key={order.id}
                onClick={() => navigate(`/order/${order.id}`)}
                style={{ cursor: 'pointer', marginBottom: '12px' }}
              >
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