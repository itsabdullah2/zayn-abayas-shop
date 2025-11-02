import type { ProductType } from "@/types";

type EnrichedProduct = ProductType & {
  price?: number;
  stock?: number;
};

type Props = {
  products: EnrichedProduct[];
};

const ProductListItem = ({ products }: Props) => {
  return (
    <div className={`mt-5 responsive-grid`}>
      {products.map((product) => (
        <div key={product.id}>{product.stock}</div>
      ))}
    </div>
  );
};

export default ProductListItem;
