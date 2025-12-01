import type { ProductType } from "@/types";

const ProductImg = ({ product }: { product: ProductType }) => {
  return (
    <figure className="col-span-2 flex flex-col items-center">
      <img
        src={product?.product_img as string}
        alt={product?.product_name}
        className="rounded-md w-40 md:w-full"
      />

      <figcaption className="mt-1 text-center font-bold mb-2 text-[1.125rem]">
        {product?.product_name}
      </figcaption>
    </figure>
  );
};

export default ProductImg;
