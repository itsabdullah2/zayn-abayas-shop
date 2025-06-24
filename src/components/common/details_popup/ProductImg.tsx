import type { ProductType } from "@/types";

const ProductImg = ({ product }: { product: ProductType }) => {
  return (
    <figure className="col-span-2">
      <img
        src={product?.product_img}
        alt={product?.product_name}
        className="rounded-md"
      />

      <figcaption className="mt-1 text-center font-bold mb-2 text-[1.125rem]">
        {product?.product_name}
      </figcaption>
    </figure>
  );
};

export default ProductImg;
