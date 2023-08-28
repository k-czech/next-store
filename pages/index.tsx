import { Main } from '@/components/Main'
import {
  CreateProductReviewDocument,
  CreateProductReviewMutation,
  CreateProductReviewMutationVariables,
} from '@/generated/gql/graphql'
import { apolloClient } from '@/graphql/apolloClient'

const HomePage = () => {
  const addReview = async () => {
    const data = await apolloClient.mutate<
      CreateProductReviewMutation,
      CreateProductReviewMutationVariables
    >({
      mutation: CreateProductReviewDocument,
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
    </Main>
  )
}

export default HomePage
