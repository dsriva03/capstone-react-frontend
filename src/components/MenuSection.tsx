import MenuItemCard from './MenuItem'

// define the MenuItem shape so we can use it for state and props

interface MenuItem {
  id: number
  name: string
  description: string
  category: string
  price: number
  imageurl: string
  available: boolean
}

// define Menusection props so we can use it for props validation

interface MenuSectionProps {
  menuItems: MenuItem[]
  loading: boolean
  error: string | null
  addToCart: (item: MenuItem) => void
}
// prop drilling: we pass the menuItems, loading, error, and addToCart function from App to MenuSection as props.
const MenuSection = ({ menuItems, loading, error, addToCart }: MenuSectionProps) => {
    // if loading, show loading message. if error, show error message. otherwise show menu items.
  if (loading) {
    return <div className="status-message">Loading menu items…</div>
  }

  if (error) {
    return <div className="status-message error">{error}</div>
  }

  return (
    <div className="menu-grid">
      {menuItems.map((item) => (
        <MenuItemCard key={item.id} item={item} addToCart={addToCart} />
      ))}
    </div>
  )
}

export default MenuSection