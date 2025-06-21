import { CATEGORY_IDS } from "@/constants";
import { getProducts } from "@/supabase/db/products";
import type { ProductType } from "@/types";
import { PriceFormatter } from "@/utils/formatePrice";
import { useEffect, useState } from "react";

const FeaturedProducts = () => {
  const [data, setData] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts({
        eqCol: "category_id",
        eqVal: CATEGORY_IDS.classic,
      });
      setData(products);
    };

    fetchData();
  }, []);

  return (
    <div className="flex-1 grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols- gap-5 container">
      {data.map((item) => (
        <div key={item.id} className="">
          <img
            src={item.product_img}
            alt={item.product_name}
            className="w-full sm:w-[400px]"
          />
          <p>{item.product_name}</p>
          <p>{item.product_desc}</p>
          <p>{PriceFormatter(item.product_price, "en-US")}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;
