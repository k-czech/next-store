import { ReviewContentFragment } from '@/generated/gql/graphql'

interface ProductReviewListItemProps {
  review: ReviewContentFragment
}

export const ProductReviewListItem = ({
  review,
}: ProductReviewListItemProps) => {
  return (
    <li className="border mt-4 bg-white p-2 max-w-md mx-auto shadow-md rounded-md">
      <h3 className="font-bold">{review.headline}</h3>
      {review.rating && <div className="text-gray-500">{review.rating}</div>}
      <p className="my-2 italic">{review.content}</p>
      <footer className="pl-4">{review.name}</footer>
    </li>
  )
}
