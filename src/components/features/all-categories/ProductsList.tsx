import type { ProductType } from "@/types";
import ListItem from "./ListItem";

const ProductsList = ({ products }: { products: ProductType[] }) => {
  return (
    <div className="responsive-grid">
      {products.map((p) => (
        <ListItem key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductsList;
