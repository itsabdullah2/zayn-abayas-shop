import { AppContext } from "@/context/AppContext";
import type { ProductType } from "@/types";
import { PriceFormatter } from "@/utils/formatePrice";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useContextSelector } from "use-context-selector";

type EnrichedProductType = ProductType & {
  price?: number;
};

const ListItem = ({
  product,
  index,
}: {
  product: EnrichedProductType;
  index: number;
}) => {
  const openProductPopup = useContextSelector(
    AppContext,
    (ctx) => ctx?.openProductPopup
  );
  const navigate = useNavigate();

  return (
    <figure
      key={product.id}
      className="card-style group animate-appear"
      style={{ animationDelay: `${index * 0.1}s` }}
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
      <figcaption className="flex justify-between gap-2 items-center py-4 px-2">
        <p className="card-title">
          {product.product_name.length > 20
            ? product.product_name.slice(0, 20) + "..."
            : product.product_name}
        </p>
        <span className="font-medium text-accentA">
          {product.price
            ? `ج.م ${PriceFormatter(product.price, "en-EG")}`
            : "N/A"}
        </span>
      </figcaption>

      <div className="action-btns group-hover:top-2">
        <button
          className="btn hover:text-accentB duration-200"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          <IoIosMore size={19} />
        </button>
        <button
          className="btn hover:text-accentB duration-200"
          onClick={() => openProductPopup?.(product.id)}
        >
          <FaShoppingCart size={19} />
        </button>
      </div>
    </figure>
  );
};

export default ListItem;
