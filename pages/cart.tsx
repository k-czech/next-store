import { CartState, useCartState } from '@/components/Cart/CartContext'

type CartListItemProps = Pick<CartState, 'items' | 'removeCartItem'>

export const CartListItem = ({ items, removeCartItem }: CartListItemProps) => {
  return (
    <ul role="list" className="-my-6 divide-y divide-gray-200">
      {items.map((item, index) => (
        <li key={`${item.title}_${index}`} className="flex py-6">
          <div className="ml-4 flex flex-1 justify-between items-center">
            <div>
              <div className="flex text-base font-medium text-gray-900">
                <h3>
                  {item.count} x {item.title}
                </h3>
                <p className="ml-4">{item.price}</p>
              </div>
            </div>
            <div className="text-sm">
              <div className="flex flex-1">
                <button
                  type="button"
                  className="font-medium text-red-600 hover:text-red-500"
                  onClick={() => removeCartItem(item.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    aria-label="Delete item"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

type CartSummaryProps = Pick<CartState, 'items'>

export const CartSummary = ({ items }: CartSummaryProps) => {
  return (
    <div className="flex flex-col items-end">
      <h3 className="font-semibold">Cart summary</h3>
      <h3 className="font-normal">Items in cart: {items.length}</h3>
    </div>
  )
}

const CartPage = () => {
  const { items, removeCartItem } = useCartState()
  return (
    <div className="mt-8 grid grid-cols-2">
      <CartListItem items={items} removeCartItem={removeCartItem} />
      <CartSummary items={items} />
    </div>
  )
}

export default CartPage
