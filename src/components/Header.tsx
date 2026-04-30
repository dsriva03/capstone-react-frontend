import { Link } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
  cartCount: number
}
// header displays the title of the app and a navigation menu with links to the home page, checkout page, orders page, and login page. It also shows the number of items in the cart next to the checkout link
// we use the Link component from react-router-dom to create links that navigate to different routes in our app without causing a full page reload.
const Header = ({ cartCount }: HeaderProps) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-title">
          <p className="kicker">Dinner and a Movie</p>
          <h1>Menu Items</h1>
        </div>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/checkout" className="nav-link">Checkout ({cartCount})</Link>
          <Link to="/orders" className="nav-link">Orders</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header