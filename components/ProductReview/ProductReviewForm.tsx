import {
  GetReviewsForProductSlugDocument,
  useCreateProductReviewMutation,
} from '@/generated/gql/graphql'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const productReviewFormSchema = yup
  .object({
    content: yup.string().required(),
    headline: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    rating: yup.number().min(1).max(5).required(),
  })
  .required()

type ProductReviewFormSchemaProps = yup.InferType<
  typeof productReviewFormSchema
>

interface ProductReviewFormProps {
  productSlug: string
}

export const ProductReviewForm = ({ productSlug }: ProductReviewFormProps) => {
  const { register, handleSubmit } = useForm<ProductReviewFormSchemaProps>({
    resolver: yupResolver(productReviewFormSchema),
  })

  const [createReview, { loading }] = useCreateProductReviewMutation({
    refetchQueries: [
      {
        query: GetReviewsForProductSlugDocument,
        variables: { slug: productSlug },
      },
    ],
  })

  const onSubmit = handleSubmit(data =>
    createReview({
      variables: {
        review: {
          ...data,
          product: {
            connect: {
              slug: productSlug,
            },
          },
        },
      },
    }),
  )

  return (
    <form
      className="flex flex-col bg-gray-100 p-8 rounded-md max-w-md mx-auto"
      onSubmit={onSubmit}
    >
      <label htmlFor="content">content</label>
      <input
        required
        type="text"
        {...register('content')}
        className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
        placeholder="Enter your opinion"
      />

      <label htmlFor="headline">headline</label>
      <input
        required
        type="text"
        {...register('headline')}
        className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
        placeholder="Enter your headline"
      />

      <label htmlFor="name">name</label>
      <input
        required
        type="text"
        {...register('name')}
        className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
        placeholder="Enter your name"
      />

      <label htmlFor="name">email</label>
      <input
        required
        type="email"
        {...register('email')}
        className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
        placeholder="Enter your email"
      />

      <label htmlFor="rating">rating</label>
      <input
        type="number"
        required
        {...register('rating')}
        className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
      />
      <div className="mt-3 rounded-md shadow sm:mt-0 sm:flex-shrink-0">
        <button className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:bg-blue-400 transition duration-150 ease-in-out">
          {loading ? 'Loading...' : 'Add review'}
        </button>
      </div>
    </form>
  )
}
