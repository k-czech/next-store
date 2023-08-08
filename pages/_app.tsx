import { Layout } from '@/components/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import SEO from '../next-seo.config'
import { DefaultSeo } from 'next-seo'
import { CartContextProvider } from '@/components/Cart/CartContext'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/graphql/apolloClient'

const client = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <CartContextProvider>
        <Layout>
          <DefaultSeo {...SEO} />
          <QueryClientProvider client={client}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </Layout>
      </CartContextProvider>
    </ApolloProvider>
  )
}
