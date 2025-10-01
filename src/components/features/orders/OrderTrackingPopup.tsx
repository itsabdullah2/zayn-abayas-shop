import { OrdersContext } from "@/context/OrdersContext";
import { useContextSelector } from "use-context-selector";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
import type { FullOrder } from "@/supabase/types";
import { formateDate } from "@/utils/formateDate";

type Props = {
  status?: string;
  order: FullOrder;
};

const steps = [
  {
    key: "paid",
    title: "تم إنشاء الطلب",
    desc: "تم استلام طلبك بنجاح",
    size: 45,
  },
  {
    key: "processing",
    title: "جاري المعالجة",
    desc: "الطلب قيد التحضير للشحن",
    size: 30,
  },
  {
    key: "shipped",
    title: "تم الشحن",
    desc: "المندوب استلم الطرد",
    size: 30,
  },
  {
    key: "out_for_delivery",
    title: "خارج للتسليم",
    desc: "المندوب في طريقه إليك",
    size: 30,
  },
  {
    key: "delivered",
    title: "تم التسليم",
    desc: "في انتظار التأكيد",
    size: 30,
  },
];

const OrderTrackingPopup = ({ status, order }: Props) => {
  const closeTrackingPopup = useContextSelector(
    OrdersContext,
    (ctx) => ctx?.closeTrackingPopup
  );

  const stepIndex = steps.findIndex((s) => s.key === status);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-40" />
      <div className="absolute top-32 left-1/2 -translate-x-1/2 z-50 text-white w-[95vw] md:w-[500px] lg:w-[800px] bg-white rounded-2xl py-5 px-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-3 items-start">
            <h3 className="font-semibold text-sm text-primary">تتبع الطلب</h3>
            <p className="flex flex-col">
              <span className="text-text text-[12px] flex items-center gap-1">
                رقم الطلب:
                <span dir="ltr">{order?.order_number}</span>
              </span>
              <span className="text-text text-[12px] flex items-center gap-1">
                التاريخ:
                <span dir="ltr">{formateDate(order?.created_at)}</span>
              </span>
            </p>
          </div>
          <button
            className="w-5 h-5 border border-soft-gray flex-center rounded-md cursor-pointer text-primary"
            onClick={closeTrackingPopup}
          >
            <IoIosClose size={25} />
          </button>
        </div>

        {/* Steps */}
        <div
          className={`flex flex-col gap-5 mt-5 pr-6 relative before:absolute ${
            status === "paid"
              ? ""
              : status === "processing"
              ? "before:h-[25%]"
              : status === "shipped"
              ? "before:h-[45%]"
              : status === "out_for_delivery"
              ? "before:h-[70%]"
              : status === "delivered"
              ? "before:h-[90%]"
              : ""
          } before:w-[2px] before:bg-blue-700 before:rounded-xl before:top-0 before:right-0 before:z-10 transition-all duration-200`}
        >
          <span className="absolute h-[260px] w-[2px] bg-light-gray rounded-xl top-0 right-0" />

          {steps.map((step, i) => {
            const isPast = i < stepIndex;
            const isCurrent = i === stepIndex;

            return (
              <div key={step.key} className="relative flex flex-col gap-1">
                <div className="text-sm font-semibold text-primary">
                  {step.title}
                </div>
                <span className="text-[12px] text-text">{step.desc}</span>

                <div
                  className={`w-5 h-5 rounded-full border absolute -right-[33px] -top-[1px] flex-center z-20 ${
                    isPast || isCurrent
                      ? "bg-blue-700 border-blue-700"
                      : "bg-white border-soft-gray"
                  } ${isCurrent ? "animate-ripple" : ""} duration-200`}
                >
                  {isPast && (
                    <IoIosCheckmark
                      size={step.size}
                      className="text-white duration-200"
                    />
                  )}
                  {isCurrent && (
                    <IoIosCheckmark
                      size={step.size}
                      className="text-white duration-200"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OrderTrackingPopup;
