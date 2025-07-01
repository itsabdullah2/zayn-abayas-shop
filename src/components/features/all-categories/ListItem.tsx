import type { ProductType } from "@/types";
import { PriceFormatter } from "@/utils/formatePrice";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";

const ListItem = ({
  product,
  index,
}: {
  product: ProductType;
  index: number;
}) => {
  return (
    <figure
      key={product.id}
      className="card-style group animate-appear"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <img
        src={product.product_img}
        alt={product.product_name}
        loading="lazy"
        className="w-full"
      />
      <figcaption className="flex justify-between gap-2 items-center py-4 px-2">
        <p className="card-title">
          {product.product_name.length > 25
            ? product.product_name.slice(0, 25) + "..."
            : product.product_name}
        </p>
        <span className="font-medium text-accentA">
          {PriceFormatter(product.product_price, "en-EG")} L.E
        </span>
      </figcaption>

      <div className="action-btns group-hover:top-2">
        <button
          className="btn hover:text-accentB duration-200"
          // onClick={() => openProductPopup(product.id)}
        >
          <IoIosMore size={19} />
        </button>
        <button
          className="btn hover:text-accentB duration-200"
          // onClick={() => handleCart && handleCart(product.id)}
        >
          <FaShoppingCart size={19} />
        </button>
      </div>
    </figure>
  );
};

export default ListItem;
