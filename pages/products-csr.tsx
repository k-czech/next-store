import { ProductListItem } from "@/components/Product";
import { useCallback } from "react";
import { useQuery } from "react-query";

const ProductsPage = () => {
  const getProducts = useCallback(async () => {
    const res = await fetch("https://naszsklep-api.vercel.app/api/products");
    const data: StoreApiResponse[] = await res.json();
    return data;
  }, []);

  const { data, isLoading, isError } = useQuery("products", getProducts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data && isError) {
    return <div>Coś poszło nie tak!</div>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data?.map((product) => {
        return (
          <li key={product.id} className="shadow border-2">
            <ProductListItem
              data={{
                id: product.id,
                title: product.title,
                thumbnailUrl: product.image,
                thumbnailAlt: product.title,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsPage;

export interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
