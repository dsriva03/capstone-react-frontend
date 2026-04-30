import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


interface OrderDetails {
  id: number
  ordertime: string
  tax: number
  tip: number
  pan: string
  expiryMonth: number
  expiryYear: number
  status: string
}

interface OrderItem {
  id: number
  orderid: number
  itemid: number
  price: number
  notes: string
  firstName: string
}

interface MenuItem {
  id: number
  name: string
  price: number
}

const Order = () => {
  const { id } = useParams()
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [items, setItems] = useState<OrderItem[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])


  useEffect(() => {
    // fetch order details
    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data))

    // fetch order items
    fetch(`/api/items/order/${id}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
    
    fetch('/api/menuitems')           // fetch 3 - all menu items
    .then(res => res.json())
    .then(data => setMenuItems(data))
  }, [id])

  if (!order) return <p>Loading...</p>

  const subtotal = items.reduce((total, item) => total + item.price, 0)
  const total = subtotal + order.tax + order.tip

  return (
    <div className="app-shell">
      <div className="page-content">
        <h2>Order Receipt</h2>
        <p>Order #: {order.id}</p>
        <p>Date: {order.ordertime ? new Date(order.ordertime).toLocaleString() : new Date().toLocaleString()}</p>

        <p>Status: {order.status}</p>

        <h3>Items Ordered</h3>
        <ul>
          {items.map((item) => {
            const menuItem = menuItems.find((m) => m.id === item.itemid)
            return (
            <li key={item.id}>
            {menuItem ? menuItem.name : `Item #${item.itemid}`} — ${item.price.toFixed(2)}
            </li>
  )
        })}
        </ul>

        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tax: ${order.tax.toFixed(2)}</p>
        <p>Tip: ${order.tip.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default Order