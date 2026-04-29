interface MenuItemProps {
  item: {
    id: number
    name: string
    description: string
    category: string
    price: number
    imageurl: string
    available: boolean
  }
  addToCart: (item: MenuItemProps['item']) => void
}
// MenuItemCard is a component that shows a single menu item in a card format. 
// It takes a menu item as a prop and displays its image, name, description, and price.
// it gets this prop from the MenuSection component, which gets it from the App component that fetches it from the backend API.
const MenuItemCard = ({ item, addToCart }: MenuItemProps) => {

  // backendBaseUrl is used to construct the full image URL for the menu item. 
  // We check if the imageurl from the API is already a full URL (starts with http) or if it's a relative path. 
  // If it's a relative path, we prepend the backendBaseUrl to it to get the full URL for the image.
  const backendBaseUrl = 'http://localhost:8080'
  const imageUrl = item.imageurl.startsWith('http')
    ? item.imageurl
    : item.imageurl.startsWith('/')
      ? `${backendBaseUrl}${item.imageurl}`
      : `${backendBaseUrl}/images/food/${item.imageurl}`

  const handleAddToCart = () => {
    addToCart(item)
  }

  return (
    // we show the menu item in a card format with an image, name, description, and price.

    // article is HTML, self contained content
    <article className="menu-card">
      
      <img src={imageUrl} alt={item.name} className="menu-card-image" />
      <div className="menu-card-body">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
      </div>
      <div className="menu-card-footer">
        <span>${item.price.toFixed(2)}</span>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </article>
  )
}

export default MenuItemCard
