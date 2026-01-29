import type { Order, OrderItem, VariantsTableType } from "@/supabase/types";
import type { ProductType } from "@/types";

type EnrichedProduct = ProductType & {
  stock: number;
};

export function calculateSoldProducts(
  products: EnrichedProduct[],
  orders: Order[],
  orderItems: OrderItem[],
  variants: VariantsTableType[],
) {
  // Completed order ids
  const completedOrderIds = orders
    .filter((o) => o.status === "delivered")
    .map((o) => o.id);

  // sold items
  return products.map((product) => {
    const soldItems = orderItems.filter(
      (item) =>
        item.product_id === product.id &&
        completedOrderIds.includes(item.order_id),
    );

    // sold quantity
    const soldQuantity = soldItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    // Get total stock from variants
    const totalStock = variants
      .filter((v) => v.product_id === product.id)
      .reduce((sum, v) => sum + v.stock, 0);

    // return remaining stock and sold quantity
    const remainingStock = product.stock - soldQuantity;
    return {
      ...product,
      soldQuantity,
      remainingStock,
      totalStock,
    };
  });
}
