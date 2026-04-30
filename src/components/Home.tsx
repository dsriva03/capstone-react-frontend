import { useEffect, useState } from 'react'
import MenuSection from '../components/MenuSection'

// define shape of a menu item so we can use it for state and props validation
interface MenuItem {
  id: number
  name: string
  description: string
  category: string
  price: number
  imageurl: string
  available: boolean
}

interface HomeProps {
  addToCart: (item: MenuItem) => void
}

const Home = ({ addToCart }: HomeProps) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // fetch the menu items from the backend API when the component mounts. 
  
    fetch('/api/menuitems')
    // then is used to handle the response from the fetch call
    //  we first check if the response is ok 
    // if it's not, we throw an error. If it is, we parse the response as JSON and return it.
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API request failed: ${res.status}`)
        }
        return res.json()
      })
      // then is used again to handle the parsed JSON data
      // we set the menuItems state with the data we received from the API
      .then((data) => {
        setMenuItems(data)
      })
      .catch((err) => {
        console.error(err)
        setError('Unable to load menu items. Please make sure the backend is running.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // we pass the menuItems, loading, error, and addToCart function as props.
  return (
    <div className="app-shell">
      <MenuSection menuItems={menuItems} loading={loading} error={error} addToCart={addToCart} />
    </div>
  )
}

export default Home