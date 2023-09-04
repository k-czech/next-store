import { MarkdownResult } from '@/types/utils'
import { NextSeo } from 'next-seo'
import Image from 'next/image' // NextJS 12 => import Image from 'next/legacy/image'
import Link from 'next/link'
import { useCartState } from './Cart/CartContext'
import { Markdown } from './Markdown'
import { ProductReviewContainer } from './ProductReview/ProductReviewContainer'
import { Rating } from './Rating'

interface ProductDetails {
  id: string
  slug: string
  title: string
  thumbnailUrl: string
  thumbnailAlt: string
  description: string
  longDescription: MarkdownResult
  rating: number
}

interface ProductProps {
  data: ProductDetails
}

export const ProductDetails = ({ data }: ProductProps) => {
  const { title, description, thumbnailAlt, thumbnailUrl, id } = data
  return (
    <>
      <Link href="/products">Wróć do listy produktów</Link>
      <div className="bg-white p-4 aspect-video w-full relative">
        <NextSeo
          title={title}
          description={description}
          canonical={`https://next-store-red.vercel.app/products/${id}`}
          openGraph={{
            url: thumbnailUrl,
            title: title,
            description: description,
            images: [
              {
                url: thumbnailUrl,
                alt: thumbnailAlt,
                type: 'image/jpeg',
              },
            ],
            siteName: 'Next store',
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        />
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          fill
          className="object-contain"
        />
      </div>
      <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
      <p className="p-4">{data.description}</p>
      <article className="p-4 prose lg:prose-xl">
        <Markdown>{data.longDescription}</Markdown>
      </article>
      <Rating rating={data.rating} className="p-4" />

      <ProductReviewContainer productSlug={data.slug} />
    </>
  )
}

type ProductListItem = Pick<
  ProductDetails,
  'id' | 'title' | 'thumbnailUrl' | 'thumbnailAlt'
>

interface ProductListItemProps {
  data: ProductListItem
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  const cartState = useCartState()
  return (
    <>
      <div className="bg-white p-4 aspect-video w-full relative">
        <Image
          alt={data.thumbnailAlt}
          src={data.thumbnailUrl}
          fill
          className="object-contain"
        />
      </div>
      <div className="p-4 ">
        <Link href={`/products/${data.id}`}>
          <h2 className="text-3xl font-bold">{data.title}</h2>
        </Link>
        <button
          onClick={() =>
            cartState.addCartItem({
              id: data.id,
              price: 24.37,
              title: data.title,
              count: 1,
            })
          }
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 mt-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Add to cart
        </button>
      </div>
    </>
  )
}
