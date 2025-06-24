import type { ProductType } from "@/types";
import { PriceFormatter } from "@/utils/formatePrice";

const ProductInfo = ({ product }: { product: ProductType }) => {
  return (
    <div className="col-span-2">
      <h4 className="font-bold mb-2 text-[1.125rem]">Product Details</h4>

      <div className="flex flex-col gap-1 pb-2 border-b-2 border-text">
        <p className="text-text font-sm">{product?.product_desc}</p>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-neutral px-4 py-1 text-sm bg-accentA rounded-lg">
            Luxury
          </span>
          <span className="text-neutral px-4 py-1 text-sm bg-accentA rounded-lg">
            White
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mt-5">
        <span className="font-medium text-primary inline-block">
          Price: {product ? PriceFormatter(product.product_price, "en-EG") : ""}{" "}
          E.L
        </span>
        <button className="h-9 flex-center rounded-md text-neutral bg-primary px-5 cursor-pointer group relative overflow-hidden">
          Add to cart
          <span className="shine-effect group-hover:animate-shine" />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
