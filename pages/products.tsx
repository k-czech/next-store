import { ProductListItem } from '@/components/Product'
import {
  GetAllProductsDocument,
  GetAllProductsQuery,
} from '@/generated/gql/graphql'
import { apolloClient } from '@/graphql/apolloClient'
import { InferGetStaticPropsType } from 'next'

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.products.map(product => {
        return (
          <li key={product.slug} className="shadow border-2">
            <ProductListItem
              data={{
                id: product.slug,
                title: product.name,
                thumbnailUrl: product.images[0].url,
                thumbnailAlt: product.name,
              }}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default ProductsPage

export const getStaticProps = async () => {
  const { data } = await apolloClient.query<GetAllProductsQuery>({
    query: GetAllProductsDocument,
  })

  return {
    props: {
      data,
    },
  }
}
