import { Main } from '@/components/Main'
import { NewsletterForm } from '@/components/NewsletterForm'
import { useCreateProductReviewMutation } from '@/generated/gql/graphql'

const HomePage = () => {
  const [createReview, { data, loading, error }] =
    useCreateProductReviewMutation()
  const addReview = () => {
    const data = createReview({
      variables: {
        review: {
          headline: 'Awesome product 123',
          name: 'John Kimich',
          email: 'john@example.co',
          content: 'My favorite product in the store',
          rating: 5,
        },
      },
    })
    console.log({ data })
  }

  return (
    <Main>
      <div className="flex flex-row items-center justify-between w-full">
        <button onClick={addReview} type="button" className="w-80">
          Create review
        </button>
        <NewsletterForm />
      </div>
      {loading && <div className="animate-bounce text-xl">Ładowanko...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </Main>
  )
}

export default HomePage
