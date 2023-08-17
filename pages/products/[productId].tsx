import { ProductDetails } from '@/components/Product'
import {
  GetProductDetailsDocument,
  GetProductDetailsQuery,
  GetProductDetailsQueryVariables,
  GetProductsSlugsDocument,
  GetProductsSlugsQuery,
} from '@/generated/gql/graphql'
import { apolloClient } from '@/graphql/apolloClient'
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
          id: data.slug,
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
  const { data } = await apolloClient.query<GetProductsSlugsQuery>({
    query: GetProductsSlugsDocument,
  })

  return {
    paths: data.products.map(product => {
      return {
        params: {
          productId: product.slug,
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
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    }
  }

  const { data } = await apolloClient.query<
    GetProductDetailsQuery,
    GetProductDetailsQueryVariables
  >({
    variables: {
      slug: params.productId,
    },
    query: GetProductDetailsDocument,
  })

  if (!data.product) {
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
