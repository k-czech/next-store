import { Main } from '@/components/Main'
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
      <button onClick={addReview} type="button">
        Create review
      </button>
      {loading && <div className="animate-bounce text-xl">Ładowanko...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </Main>
  )
}

export default HomePage
