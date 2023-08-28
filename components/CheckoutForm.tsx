import { validateCreditCardDate } from '@/utils/validateCreditCardDate'
import { Main } from './Main'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const checkoutFormSchema = yup
  .object({
    emailAddress: yup.string().email().required(),
    nameOnCard: yup.string().required(),
    cardNumber: yup.string().required(),
    expirationDate: yup.string().required(),
    cvc: yup.string().required(),
    apartament: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    company: yup.string().required(),
    address: yup.string().required(),
  })
  .required()

type CheckoutFormProps = yup.InferType<typeof checkoutFormSchema>

export const CheckoutForm = () => {
  const { register, setValue, handleSubmit, formState } =
    useForm<CheckoutFormProps>({
      resolver: yupResolver(checkoutFormSchema),
    })
  const onSubmit = handleSubmit(data => console.log(data))

  return (
    <div>
      <Main>
        <form className="space-y-8 bg-white p-8" onSubmit={onSubmit}>
          <h2 className="text-xl ">Contact Information</h2>
          <label className="font-semibold">Email</label>
          <input
            className={`w-full ${
              formState.errors.emailAddress ? 'border-red-500' : ''
            }`}
            {...register('emailAddress', { required: 'The email is wrong' })}
            id="email-address"
            type="email"
          />
          <span className="text-red-500 font-bold text-xs">
            {formState.errors.emailAddress?.message}
          </span>
          <h2 className="text-xl ">Payment details</h2>
          <label className="font-semibold">Name on card</label>
          <input
            className="w-full"
            id="name-on-card"
            {...register('nameOnCard')}
            type="text"
          />
          <label className="font-semibold">Card number</label>
          <input
            className="w-full"
            id="card-number"
            {...register('cardNumber')}
            type="text"
          />
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-8 lg:space-y-0">
            <label className="font-semibold">Expiration date</label>
            <input
              className={`w-full ${
                formState.errors.emailAddress ? 'border-red-500' : ''
              }`}
              id="expiration-date"
              type="text"
              {...register('expirationDate', {
                required: true,
                validate: validateCreditCardDate,
              })}
            />
            <span className="text-red-500 font-bold text-xs">
              {formState.errors.expirationDate?.message}
            </span>
            <label className="font-semibold">CVC</label>
            <input
              className="w-full lg:w-[90%]"
              id="cvc"
              {...register('cvc')}
              type="text"
            />
          </div>
          <h2 className="text-xl ">Shipping address</h2>
          <label className="font-semibold">Company</label>
          <input
            className="w-full"
            id="company"
            type="text"
            {...register('company')}
          />
          <label className="font-semibold">Address</label>
          <input
            className="w-full"
            id="address"
            type="text"
            {...register('address')}
          />
          <label className="font-semibold">Apartament, suite, etc.</label>
          <input
            className="w-full"
            id="apartament"
            type="text"
            {...register('apartament')}
          />
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-8 lg:space-y-0 pb-10">
            <div className="w-full">
              <label className="font-semibold">City</label>
              <input
                className="w-full lg:w-[90%]"
                id="city"
                type="text"
                {...register('city')}
              />
            </div>
            <div className="w-full">
              <label className="font-semibold">State / Province</label>
              <input
                className="w-full lg:w-[90%]"
                id="state"
                type="text"
                {...register('state')}
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
