import { Layout } from '@/components/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import SEO from '../next-seo.config'
import { DefaultSeo } from 'next-seo'
import { CartContextProvider } from '@/components/Cart/CartContext'

const client = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Layout>
        <DefaultSeo {...SEO} />
        <QueryClientProvider client={client}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Layout>
    </CartContextProvider>
  )
}
