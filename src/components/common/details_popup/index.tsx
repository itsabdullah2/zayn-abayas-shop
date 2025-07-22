import { AppContext } from "@/context/AppContext";
import { useEffect, useRef, useState } from "react";
import { useContextSelector } from "use-context-selector";
import LoadingOrError from "./LoadingOrError";
import type { ColorsAndSizesType, VariantsTableType } from "@/supabase/types";
import { getColors, getProducts, getSizes, getVariants } from "@/supabase";
import type { ProductType } from "@/types";
import ProductImg from "./ProductImg";
import ProductInfo from "./ProductInfo";

const ProductDetailsPopup = ({ productId }: { productId: string }) => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [variants, setVariants] = useState<VariantsTableType[]>([]);
  const [colors, setColors] = useState<ColorsAndSizesType[]>([]);
  const [sizes, setSizes] = useState<ColorsAndSizesType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const closeProductPopup = useContextSelector(
    AppContext,
    (ctx) => ctx?.closeProductPopup
  )!;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const [pRes, vRes, colorsRes, sizesRes] = await Promise.all([
          getProducts({ eqCol: "id", eqVal: productId }),
          getVariants(),
          getColors(),
          getSizes(),
        ]);
        setProduct(pRes[0]);
        setVariants(vRes);
        setColors(colorsRes);
        setSizes(sizesRes);
      } catch (err) {
        setError("Failed to load variants or products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (popupRef.current && !popupRef.current.contains(target as Node)) {
        closeProductPopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeProductPopup]);

  return (
    <>
      <div className="fixed bg-black/70 top-0 left-0 w-full h-full z-90" />
      <section className="">
        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 bg-neutral text-primary py-8 px-5 rounded-xl w-[95vw] sm:w-[40.625rem] min-h-[28.125rem] overflow-y-auto `}
          ref={popupRef}
        >
          <LoadingOrError loading={loading} error={error} />

          <div className="grid grid-cols-4 gap-3 mt-5">
            {product && <ProductImg product={product} />}
            {!loading && product && variants && (
              <ProductInfo
                product={product}
                variants={variants}
                sizes={sizes}
                colors={colors}
                close={closeProductPopup}
              />
            )}
          </div>

          <button
            role="button"
            // size="sm"
            className="bg-gray/30 py-1 px-3 rounded-md text-primary border border-text absolute top-2 right-5 cursor-pointer hover:bg-light-gray duration-200"
            onClick={() => closeProductPopup()}
          >
            Esc
          </button>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPopup;
