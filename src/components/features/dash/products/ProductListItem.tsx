import { AppContext } from "@/context/AppContext";
import type { ProductType } from "@/types";
import { PriceFormatter } from "@/utils/formatePrice";
import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useContextSelector } from "use-context-selector";

type EnrichedProduct = ProductType & {
  price?: number;
  stock: number;
};
type TSoldProducts = ProductType & {
  stock: number;
  remainingStock: number;
  soldQuantity: number;
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
    (ctx) => ctx?.handleEditClick
  )!;
  const targetSoldProduct = soldProducts.find((o) => o.id === product.id);

  return (
    <>
      <figure
        key={product.id}
        className="card-style group animate-appear "
        style={{ animationDelay: `${idx * 0.1}s` }}
      >
        <picture>
          {/* avif version */}
          <source
            srcSet={`${product.product_img}?quality=80?format=avif`}
            type="image/avif"
          />
          {/* webp version */}
          <source
            srcSet={`${product.product_img}?quality=80?format=webp`}
            type="image/webp"
          />
          <img
            src={product.product_img}
            alt={product.product_name}
            loading="lazy"
            className="w-full object-cover"
          />
        </picture>
        <figcaption className="flex flex-col justify-between gap-2 items-start py-4 px-2">
          <div className="flex flex-col items-start gap-2">
            <p className="card-title">{product.product_name}</p>
            <span className="font-medium text-accentA">
              {product.price
                ? `ج.م ${PriceFormatter(product.price, "en-EG")}`
                : "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <span className={`text-primary font-light text-sm`}>
                المخزون:
              </span>
              <span className={`font-medium text-primary text-sm`}>
                {targetSoldProduct?.remainingStock ?? product.stock}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className={`text-primary font-light text-sm`}>مُباع:</span>
              <span className={`font-medium text-primary text-sm`}>
                {targetSoldProduct?.soldQuantity ?? 0}
              </span>
            </div>
          </div>
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
    </>
  );
};

export default React.memo(ProductListItem);
