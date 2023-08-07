import { CartState } from '@/components/Cart/CartContext'

export const getCartItemsFromLocalStorage = () => {
  const itemsFromLocalStorage = localStorage.getItem('SHOPPING_CART')

  if (!itemsFromLocalStorage) {
    return []
  }

  try {
    const items = JSON.parse(itemsFromLocalStorage)
    return items
  } catch (error) {
    console.error(error)
    return []
  }
}

export const setCartItemsToLocalStorage = (items: CartState['items']) => {
  return localStorage.setItem('SHOPPING_CART', JSON.stringify(items))
}
