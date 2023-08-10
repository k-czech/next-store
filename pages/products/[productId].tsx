import { ProductDetails } from '@/components/Product'
import { apolloClient } from '@/graphql/apolloClient'
import { gql } from '@apollo/client'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serialize } from 'next-mdx-remote/serialize'

const ProductIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Coś poszło nie tak</div>
  }
  return (
    <div>
      <ProductDetails
        data={{
          id: data.id,
          title: data.name,
          thumbnailUrl: data.images[0].url,
          thumbnailAlt: data.name,
          description: data.description,
          longDescription: data.longDescription,
          rating: 5,
        }}
      />
    </div>
  )
}

export default ProductIdPage

export const getStaticPaths = async () => {
  interface GetProductsSlugsProps {
    products: Product[]
  }

  interface Product {
    id: string
    slug: string
  }
  const { data } = await apolloClient.query<GetProductsSlugsProps>({
    query: gql`
      query GetProductsSlugs {
        products {
          id
          slug
        }
      }
    `,
  })

  return {
    paths: data.products.map(product => {
      return {
        params: {
          productId: product.id,
        },
      }
    }),
    fallback: false,
  }
}

export type InferGetStaticPathsType<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>
}>
  ? R
  : never

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<InferGetStaticPathsType<typeof getStaticPaths>>) => {
  interface GetProductDetailsByIdProps {
    product: Product
  }

  interface Product {
    id: string
    slug: string
    name: string
    description: string
    price: number
    images: Image[]
  }

  interface Image {
    url: string
  }

  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    }
  }

  const { data } = await apolloClient.query<GetProductDetailsByIdProps>({
    variables: {
      id: params.productId,
    },
    query: gql`
      query GetProductDetailsById($id: ID) {
        product(where: { id: $id }) {
          id
          slug
          name
          description
          price
          images {
            url
          }
        }
      }
    `,
  })

  if (!data) {
    return {
      props: {},
      notFound: true,
    }
  }

  return {
    props: {
      data: {
        ...data.product,
        longDescription: await serialize(data.product.description),
      },
    },
  }
}
