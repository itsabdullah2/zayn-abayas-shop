import { Skeleton } from "@/components/ui/skeleton";
import { AppContext } from "@/context/AppContext";
import { useEnrichedProducts } from "@/hooks/useEnrichedProducts";
import useOrderItems from "@/hooks/useOrderItems";
import useOrders from "@/hooks/useOrders";
import { useShowProducts } from "@/hooks/useProducts";
import { useSoldProducts } from "@/hooks/useSoldProducts";
import { PriceFormatter } from "@/utils/formatePrice";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useContextSelector } from "use-context-selector";

const ProductsTable = ({ onClick }: { onClick: (id: string) => void }) => {
  const handleEditClick = useContextSelector(
    AppContext,
    (ctx) => ctx?.handleEditClick
  )!;
  const { data: products = [] } = useShowProducts();
  const { data: enrichedProducts = [], isLoading } = useEnrichedProducts({
    products,
  });
  const { data: orders = [] } = useOrders();
  const { orderItemsData } = useOrderItems();
  const soldProducts = useSoldProducts(
    enrichedProducts,
    orders,
    orderItemsData
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 rounded-xl bg-gray-300" />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* <div className={`mt-8 w-full overflow-x-auto`}> */}
      <div className="mt-8 overflow-x-auto w-full">
        <table className="w-full min-w-[800px]">
          <thead className="">
            <tr className="">
              <th
                className={`bg-primary text-neutral p-3 rounded-tr-md rounded-br-md`}
              >
                الأسم
              </th>
              <th className={`bg-primary text-neutral p-3 `}>السعر</th>
              <th className={`bg-primary text-neutral p-3 `}>المخزون</th>
              <th className={`bg-primary text-neutral p-3 `}>مُباع</th>
              <th className={`bg-primary text-neutral p-3 `}>الصورة</th>
              <th
                className={`bg-primary text-neutral p-3 rounded-bl-md rounded-tl-md`}
              >
                خيارات
              </th>
            </tr>
          </thead>
          <tbody>
            {enrichedProducts.map((product) => {
              const targetSoldProduct = soldProducts.find(
                (o) => o.id === product.id
              );
              return (
                <tr key={product.id} className="even:bg-gray-300">
                  <td className="rounded-tr-md rounded-br-md p-3 text-sm">
                    {product.product_name}
                  </td>
                  <td className="p-3 text-sm">
                    {PriceFormatter(product.product_price, "en")}
                  </td>
                  <td className="p-3 text-sm">
                    {targetSoldProduct?.remainingStock ?? product.stock}
                  </td>
                  <td className="p-3 text-sm">
                    {targetSoldProduct?.soldQuantity ?? 0}
                  </td>
                  <td className="p-3">
                    <picture className="rounded-md">
                      {/* avif version */}
                      <source
                        srcSet={`${product.product_img}?quality=80?format=avif`}
                        type="image/avif"
                        className="rounded-md"
                      />
                      {/* webp version */}
                      <source
                        srcSet={`${product.product_img}?quality=80?format=webp`}
                        type="image/webp"
                        className="rounded-md"
                      />
                      <img
                        src={product.product_img}
                        alt={product.product_name}
                        loading="lazy"
                        className="w-[100px] max-w-full object-cover rounded-md"
                      />
                    </picture>
                  </td>
                  <td className="rounded-tl-md rounded-bl-md relative">
                    <div className="absolute-center flex items-center gap-2">
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* </div> */}
    </>
  );
};

export default React.memo(ProductsTable);
