export function getArabicStatusLabel(status: string): string {
  switch (status) {
    case "paid":
      return "تم الدفع";
    case "processing":
      return "قيد المعالجة";
    case "shipped":
      return "تم الشحن";
    case "out_for_delivery":
      return "جاري التوصيل";
    case "delivered":
      return "تم التوصيل";
    case "cancelled":
      return "تم الإلغاء";
    case "refunded":
      return "تم الاسترجاع";
    case "returned":
      return "تم الإرجاع";
    default:
      return "غير معروف";
  }
}

export function getStatusColors(status: string): { bg: string; text: string } {
  switch (status) {
    case "paid":
      return { bg: "bg-blue-600", text: "text-white" };
    case "processing":
      return { bg: "bg-yellow-500", text: "text-white" };
    case "shipped":
      return { bg: "bg-indigo-600", text: "text-white" };
    case "out_for_delivery":
      return { bg: "bg-orange-500", text: "text-white" };
    case "delivered":
      return { bg: "bg-green-600", text: "text-white" };
    case "cancelled":
      return { bg: "bg-gray-600", text: "text-white" };
    case "refunded":
      return { bg: "bg-red-600", text: "text-white" };
    case "returned":
      return { bg: "bg-pink-600", text: "text-white" };
    default:
      return { bg: "bg-neutral-600", text: "text-white" };
  }
}
