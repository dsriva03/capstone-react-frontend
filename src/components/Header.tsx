import { Link } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
  cartCount: number
}

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