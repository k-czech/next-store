import { FormEventHandler } from 'react'
import { Main } from './Main'

interface CheckoutFormProps {
  email: string
  nameOnCard: string
  cardNumber: string
  expirationDate: string
  cvc: string
  apartament: string
  city: string
  state: string
  company: string
  address: string
}

export const CheckoutForm = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    console.log(e)
  }
  return (
    <div>
      <Main>
        <form className="space-y-8 bg-white p-8" onSubmit={handleSubmit}>
          <h2 className="text-xl ">Contact Information</h2>
          <label className="font-semibold">Email</label>
          <input className="w-full" name="email" id="email" type="email" />
          <h2 className="text-xl ">Payment details</h2>
          <label className="font-semibold">Name on card</label>
          <input
            className="w-full"
            id="nameOnCard"
            name="nameOnCard"
            type="text"
          />
          <label className="font-semibold">Card number</label>
          <input
            className="w-full"
            id="cardNumber"
            name="cardNumber"
            type="text"
          />
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-8 lg:space-y-0">
            <label className="font-semibold">Expiration date</label>
            <input
              className="w-full lg:w-[90%]"
              id="expirationDate"
              type="text"
              name="expirationDate"
            />
            <label className="font-semibold">CVC</label>
            <input
              className="w-full lg:w-[90%]"
              id="cvc"
              name="cvc"
              type="text"
            />
          </div>
          <h2 className="text-xl ">Shipping address</h2>
          <label className="font-semibold">Company</label>
          <input className="w-full" id="company" type="text" name="company" />
          <label className="font-semibold">Address</label>
          <input className="w-full" id="address" type="text" name="address" />
          <label className="font-semibold">Apartament, suite, etc.</label>
          <input
            className="w-full"
            id="apartament"
            type="text"
            name="apartament"
          />
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-8 lg:space-y-0 pb-10">
            <div className="w-full">
              <label className="font-semibold">City</label>
              <input
                className="w-full lg:w-[90%]"
                id="city"
                type="text"
                name="city"
              />
            </div>
            <div className="w-full">
              <label className="font-semibold">State / Province</label>
              <input
                className="w-full lg:w-[90%]"
                id="state"
                type="text"
                name="state"
              />
            </div>
            <div className="w-full">
              <label className="font-semibold">Zip / Postal code</label>
              <input className="w-full lg:w-[90%]" id="zip" type="text" />
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-full bg-blue-700 text-white"
          >
            Continue
          </button>
        </form>
      </Main>
    </div>
  )
}
