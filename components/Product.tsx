import Link from "next/link";
import { Rating } from "./Rating";
import Image from "next/image"; // NextJS 12 => import Image from 'next/legacy/image'
import ReactMarkdown from "react-markdown";

interface ProductDetails {
  id: number;
  title: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  description: string;
  longDescription: string;
  rating: number;
}

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <Link href="/products">Wróć do listy produktów</Link>
      <div className="bg-white p-4 aspect-video w-full relative">
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
        <ReactMarkdown>{data.longDescription}</ReactMarkdown>
      </article>
      <Rating rating={data.rating} className="p-4" />
    </>
  );
};

type ProductListItem = Pick<
  ProductDetails,
  "id" | "title" | "thumbnailUrl" | "thumbnailAlt"
>;

interface ProductListItemProps {
  data: ProductListItem;
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
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
      {/* NextJS 12 */}
      {/* <div className="bg-white p-4">
        <Image
          alt={data.thumbnailAlt}
          src={data.thumbnailUrl}
          layout="responsive"
          width={16}
          height={9}
          objectFit="contain"
        />
      </div> */}
      {/* NextJS 12 */}
      <Link href={`/products/${data.id}`}>
        <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
      </Link>
    </>
  );
};
