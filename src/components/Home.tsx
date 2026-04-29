import { useEffect, useState } from 'react'
import MenuSection from '../components/MenuSection'

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
    fetch('/api/menuitems')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API request failed: ${res.status}`)
        }
        return res.json()
      })
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

  return (
    <div className="app-shell">
      <MenuSection menuItems={menuItems} loading={loading} error={error} addToCart={addToCart} />
    </div>
  )
}

export default Home