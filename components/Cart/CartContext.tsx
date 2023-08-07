import {
  getCartItemsFromLocalStorage,
  setCartItemsToLocalStorage,
} from '@/utils/cartStorage'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface CartItem {
  readonly id: number
  readonly price: number
  readonly title: string
  readonly count: number
}

export interface CartState {
  readonly items: readonly CartItem[] | undefined
  readonly addCartItem: (item: CartItem) => void
  readonly removeCartItem: (id: CartItem['id']) => void
}

export const CartContext = createContext<CartState | null>(null)

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[] | undefined>(undefined)

  useEffect(() => {
    setCartItems(getCartItemsFromLocalStorage())
  }, [])

  useEffect(() => {
    if (cartItems === undefined) {
      return
    }
    setCartItemsToLocalStorage(cartItems)
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addCartItem: item => {
          setCartItems(prevState => {
            if (!prevState) {
              return
            }

            const existingItem = prevState.find(
              existingItem => existingItem.id === item.id,
            )

            if (!existingItem) {
              return [...prevState, item]
            }

            return prevState.map(existingItem => {
              if (existingItem.id === item.id) {
                return {
                  ...existingItem,
                  count: existingItem.count + 1,
                }
              }
              return existingItem
            })
          })
        },
        removeCartItem: id => {
          setCartItems(prevState => {
            if (!prevState) {
              return
            }

            const existingItem = prevState.find(
              existingItem => existingItem.id === id,
            )

            if (existingItem && existingItem.count <= 1) {
              return prevState.filter(existingItem => existingItem.id !== id)
            }

            return prevState.map(existingItem => {
              if (existingItem.id === id) {
                return {
                  ...existingItem,
                  count: existingItem.count - 1,
                }
              }
              return existingItem
            })
          })
        },
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartState = () => {
  const cartState = useContext(CartContext)
  if (!cartState) {
    throw new Error('You forgot CartContext')
  }
  return cartState
}
