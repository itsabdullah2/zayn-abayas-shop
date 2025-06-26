import useCartData from "@/hooks/useCartData";
import type { ProductType } from "@/types";
import { PriceFormatter } from "@/utils/formatePrice";

const ProductInfo = ({ product }: { product: ProductType }) => {
  const { handleCart } = useCartData();

  return (
    <div className="col-span-2">
      <h4 className="font-bold mb-2 text-[1.125rem]">Product Details</h4>

      <div className="flex flex-col gap-1 pb-2 border-b-2 border-text">
        <p className="text-text font-sm">{product?.product_desc}</p>

        <div className="flex items-center gap-2 mt-2">
          <span className="product-label">Luxury</span>
          <span className="product-label">White</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mt-5">
        <span className="font-medium text-primary inline-block">
          Price: {product ? PriceFormatter(product.product_price, "en-EG") : ""}{" "}
          E.L
        </span>
        <button
          className="h-9 flex-center rounded-md text-neutral bg-primary px-5 cursor-pointer group relative overflow-hidden"
          onClick={() => product && handleCart?.(product.id)}
        >
          Add to cart
          <span className="shine-effect group-hover:animate-shine" />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
