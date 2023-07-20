import { Main } from "@/components/Main";
import { ProductDetails } from "@/components/Product";

const data = {
  id: 1,
  title: "Custom product",
  thumbnailUrl: "https://picsum.photos/id/30/300/400",
  thumbnailAlt: "random image",
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, ducimus nostrum quibusdam atque dolores cumque incidunt consequatur nesciunt, laudantium dolor consectetur iure aut ab porro. Odio, explicabo recusandae unde illum magnam quis expedita, corrupti, iste ea laborum iusto mollitia ut excepturi provident debitis aut sunt inventore quod consequatur accusamus nobis voluptate. Excepturi, molestias, porro soluta fugiat labore sapiente cumque rem, fuga magni quod et reprehenderit veritatis! Eius sunt sed corporis temporibus voluptas quasi aperiam ab, error, esse ipsa, dolore mollitia consequuntur quaerat laborum illum architecto iure consequatur voluptatum! Quae sit cum saepe. Illo quis eos deserunt ab ad quam. Velit!",
  longDescription: "",
  rating: 4.5,
};

const HomePage = () => {
  return (
    <Main>
      <ProductDetails data={data} />
    </Main>
  );
};

export default HomePage;
