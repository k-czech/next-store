import { Main } from '@/components/Main'
import { useQuery, gql } from '@apollo/client'

const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      id
      slug
      price
      name
    }
  }
`

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return (
    <Main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Main>
  )
}

export default HomePage
