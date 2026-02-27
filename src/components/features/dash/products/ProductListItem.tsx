import { AppContext } from "@/context/AppContext";
import type { ProductType } from "@/types";
import { PriceFormatter } from "@/utils/formatePrice";
import React, { useRef } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useContextSelector } from "use-context-selector";
import VariantsDialog from "./VariantsDialog";
import { ProductContext } from "@/context/ProductContext";

type EnrichedProduct = ProductType & {
  enrichedVariants: { id: string; stock: number; price: number }[];
};
type TSoldProducts = ProductType & {
  remainingStock: number;
  soldQuantity: number;
  totalStock: number;
};

type Props = {
  product: EnrichedProduct;
  idx: number;
  soldProducts: TSoldProducts[];
  onClick: (id: string) => void;
};

const ProductListItem = ({ product, idx, soldProducts, onClick }: Props) => {
  const handleEditClick = useContextSelector(
    AppContext,
    (ctx) => ctx?.handleEditClick,
  )!;
  const isTargetDialog = useContextSelector(
    ProductContext,
    (ctx) => ctx?.isTargetDialog,
  );
  const handleTargetDialog = useContextSelector(
    ProductContext,
    (ctx) => ctx?.handleTargetDialog,
  )!;

  const dialogRef = useRef<HTMLDivElement | null>(null);

  const targetSoldProduct = soldProducts.find((o) => o.id === product.id);

  return (
    <div className="relative">
      <figure
        key={product.id}
        className="card-style group animate-appear "
        style={{ animationDelay: `${idx * 0.1}s` }}
      >
        <picture>
          {/* avif version */}
          <source
            srcSet={`${product.product_img as string}?quality=80?format=avif`}
            type="image/avif"
          />
          {/* webp version */}
          <source
            srcSet={`${product.product_img as string}?quality=80?format=webp`}
            type="image/webp"
          />
          <img
            src={product.product_img as string}
            alt={product.product_name}
            loading="lazy"
            className="w-full object-cover"
          />
        </picture>
        <figcaption className="flex flex-col justify-between gap-2 items-start py-4 px-2">
          <div className="flex flex-col items-start gap-2">
            <p className="card-title">{product.product_name}</p>
            <span className="font-medium text-accentA">
              {product.product_price
                ? `ج.م ${PriceFormatter(product.product_price, "en-EG")}`
                : "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <span className={`text-primary font-light text-sm`}>
                المخزون:
              </span>
              <span className={`font-medium text-primary text-sm`}>
                {targetSoldProduct?.totalStock}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className={`text-primary font-light text-sm`}>مُباع:</span>
              <span className={`font-medium text-primary text-sm`}>
                {targetSoldProduct?.soldQuantity ?? 0}
              </span>
            </div>
          </div>

          <button
            onClick={() => handleTargetDialog(product.id)}
            className={`cursor-pointer text-sm py-1 px-2 border border-primary rounded `}
          >
            اظهار قائمة الخيارات
          </button>
        </figcaption>

        <div className="action-btns group-hover:top-2">
          <button
            className="btn hover:text-accentB duration-200 ease-in-out"
            onClick={() => handleEditClick(product)}
          >
            <MdEdit size={19} />
          </button>
          <button
            className="btn hover:text-accentB duration-200 ease-in-out"
            onClick={() => onClick(product.id)}
          >
            <MdDelete size={19} />
          </button>
        </div>
      </figure>
      {isTargetDialog === product.id ? (
        <VariantsDialog productId={isTargetDialog} ref={dialogRef} />
      ) : null}
    </div>
  );
};

export default React.memo(ProductListItem);
