import useCartData from "@/hooks/useCartData";
import CartItems from "./CartItems";
import CartSidebar from "./CartSidebar";

const Cart = () => {
  const { cartProducts, isLoading, totalItems } = useCartData();

  return (
    <section className="section-container flex flex-col gap-10">
      <div className="flex flex-col">
        <h1 className="text-primary font-bold text-2xl">سلة التسوق</h1>
        <span className="text-text text-sm flex items-center gap-1">
          <span className="font-medium text-primary">{totalItems} منتج</span> في
          سلة التسوق.
        </span>
      </div>
      <div className="flex items-start flex-col xl:flex-row gap-5 xl:gap-10">
        <div className="flex-1 w-full lg:col-span2 xl:col-span4 flex flex-col gap-10">
          <div className="bg-neutral rounded-xl p-5">
            <div className="grid grid-cols-4 xl:grid-cols-6 mb-10">
              <h3 className="col-span-1 md:col-span-2 xl:col-span-3 h3">
                المنتج
              </h3>
              <div className="col-span-3 md:col-span-2 xl:col-span-3 grid grid-cols-3">
                <h3 className="col-span-1 h3 text-center">السعر</h3>
                <h3 className="col-span-1 h3 text-center">الكمية</h3>
                <h3 className="col-span-1 h3 text-center">السعر الإجمالي</h3>
              </div>
            </div>
            <div className="flex flex-col ">
              {isLoading ? (
                <div className="text-text font-medium text-[1.0625rem] text-center">
                  Loading Products...
                </div>
              ) : !cartProducts?.length ? (
                <div className="text-text font-medium text-[1.0625rem] text-center">
                  No Products Found
                </div>
              ) : (
                <CartItems items={cartProducts} />
              )}
            </div>
          </div>
        </div>

        <CartSidebar />
      </div>
    </section>
  );
};

export default Cart;
