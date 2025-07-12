import type { ProductType } from "@/types";
import ListItem from "./ListItem";

const ProductsList = ({ products }: { products: ProductType[] }) => {
  return (
    <div className="responsive-grid">
      {products.map((p, i) => (
        <ListItem key={p.id} product={p} index={i} />
      ))}
    </div>
  );
};

export default ProductsList;
