import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Checkout from './components/Checkout'
import Orders from './components/Orders'
import Login from './components/Login'
import Order from './components/Order'
import './App.css'

// Define the shape of a cart item, which extends the menu item with a quantity field
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

function App() {
  // State to hold the items in the cart. We initialize it as an empty array.
  const [cartItems, setCartItems] = useState<CartItem[]>([])
// Function to add an item to the cart. It takes a menu item (without quantity) as an argument.
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((currentItems) => {
      // Check if the item is already in the cart. If it is, we update the quantity. If not, we add it to the cart with a quantity of 1.
      const existing = currentItems.find((cartItem) => cartItem.id === item.id)
      if (existing) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
        // If the item is already in the cart, we create a new object with the same properties as the existing cart item but with an updated quantity (incremented by 1). 
        // If it's not the item we're updating, we return it unchanged.
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }

      return [...currentItems, { ...item, quantity: 1 }]
    })
  }

  // Calculate the total number of items in the cart and the total price. 
  // We use the reduce method to sum up the quantities and prices of all items in the cart.
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <BrowserRouter>
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} cartTotal={cartTotal} />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order/:id" element={<Order />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
