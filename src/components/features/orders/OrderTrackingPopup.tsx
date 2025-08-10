import { OrdersContext } from "@/context/OrdersContext";
import { useContextSelector } from "use-context-selector";
import { IoIosClose } from "react-icons/io";

const OrderTrackingPopup = () => {
  const closeTrackingPopup = useContextSelector(
    OrdersContext,
    (ctx) => ctx?.closeTrackingPopup
  );

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-40" />
      <div className="absolute top-32 left-1/2 -translate-x-1/2 z-50 text-white w-[95vw] md:w-[500px] lg:w-[800px] bg-white rounded-2xl py-5 px-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-sm text-primary">
              Track your order
            </h3>
            <p className="flex flex-col">
              <span className="text-text text-[12px]">
                رقم الطلب: #555318168
              </span>
              <span className="text-text text-[12px]">التاريخ: 10/8/2025</span>
            </p>
          </div>
          <button
            className="w-5 h-5 border border-soft-gray flex-center rounded-md cursor-pointer text-primary"
            onClick={closeTrackingPopup}
          >
            <IoIosClose size={25} />
          </button>
        </div>

        <div className="flex flex-col gap-5 mt-5 pr-6 relative before:absolute before:h-[20%] before:w-[2px] before:bg-blue-700 before:rounded-xl before:top-0 before:right-0 before:z-10">
          <span className="absolute h-[260px] w-[2px] bg-light-gray rounded-xl top-0 right-0" />
          <div className="flex flex-col gap-1 relative">
            <div className="text-sm font-semibold text-primary">
              Order placed
            </div>
            <span className="text-[12px] text-text">
              Payment confirmed - Jan 12, 10:30 AM
            </span>

            <div className="w-5 h-5 rounded-full bg-soft-gray absolute -right-[33px] -top-[1px] flex-center z-20"></div>
          </div>
          <div className="flex flex-col gap-1 relative">
            <div className="text-sm font-semibold text-primary">Processing</div>
            <span className="text-[12px] text-text">
              Preparing your items - Jan 12, 10:30 AM
            </span>
            <div className="w-5 h-5 rounded-full bg-soft-gray absolute -right-[33px] -top-[1px] flex-center z-20"></div>
          </div>
          <div className="flex flex-col gap-1 relative">
            <div className="text-sm font-semibold text-primary">Shipped</div>
            <span className="text-[12px] text-text">
              Courier has your order - Jan 12, 10:30 AM
            </span>
            <div className="w-5 h-5 rounded-full bg-soft-gray absolute -right-[33px] -top-[1px] flex-center z-20"></div>
          </div>
          <div className="flex flex-col gap-1 relative">
            <div className="text-sm font-semibold text-primary">
              Out for Delivery
            </div>
            <span className="text-[12px] text-text">Arriving today</span>
            <div className="w-5 h-5 rounded-full bg-soft-gray absolute -right-[33px] -top-[1px] flex-center z-20"></div>
          </div>
          <div className="flex flex-col gap-1 relative">
            <div className="text-sm font-semibold text-primary">Delivered</div>
            <span className="text-[12px] text-text">
              Waiting for confirmation
            </span>
            <div className="w-5 h-5 rounded-full bg-soft-gray absolute -right-[33px] -top-[1px] flex-center z-20"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTrackingPopup;
