import { ReactNode, createContext, useContext, useState } from 'react'

interface CartItem {
  price: number
  title: string
}

interface CasrtState {
  items: CartItem[]
}

export const CartContext = createContext<CasrtState | null>(null)

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      price: 21.37,
      title: 'Zajebiaszcza koszulka',
    },
  ])

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
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
