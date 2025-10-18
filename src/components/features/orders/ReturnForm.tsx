// import React from 'react'

import { AuthContext } from "@/context/AuthContext";
import { OrdersContext } from "@/context/OrdersContext";
import { createReturnFeedback } from "@/supabase";
import type { FullOrder } from "@/supabase/types";
import { useState } from "react";
import { toast } from "sonner";
import { useContextSelector } from "use-context-selector";

type TReturnData = {
  reason: string;
  tried: string;
  rating: string;
  exchange: string;
  deliverySpeed: string;
  note: string;
};

type Prop = {
  order: FullOrder;
};

const sharedStyles =
  "cursor-pointer border border-accentA rounded-lg px-10 py-1 hover:bg-accentA duration-150 hover:text-white";
const labelStyles = "";

const INITIAL_STATE: TReturnData = {
  reason: "",
  tried: "",
  rating: "",
  exchange: "",
  deliverySpeed: "",
  note: "",
};

export default function ReturnForm({ order }: Prop) {
  const [returnData, setReturnData] = useState<TReturnData>(INITIAL_STATE);
  const setReturnPopup = useContextSelector(
    OrdersContext,
    (ctx) => ctx?.setReturnPopup
  );
  const user = useContextSelector(AuthContext, (ctx) => ctx?.user);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setReturnData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const changedFields = Object.entries(returnData).reduce(
      (acc, [key, value]) => {
        if (value !== INITIAL_STATE[key as keyof TReturnData]) {
          acc[key as keyof TReturnData] = value;
        }
        return acc;
      },
      {} as Partial<TReturnData>
    );

    if (!changedFields.reason) {
      // Show Toast
      toast.error("رجاء قم بإضافة سبب الإسترجاع");
      return;
    }

    console.log("User Answers:", changedFields);
    // Backend Login in here
    if (user && order) {
      const user_id = user.id;
      const order_id = order.id;
      const product_id = order.order_items[0].product.id;
      const feedbackData = {
        user_id,
        order_id,
        product_id,
        rating: returnData.rating,
        reason: returnData.reason,
        tried: returnData.tried,
        notes: returnData.note,
        delivery_speed: returnData.deliverySpeed,
        exchange: returnData.exchange,
      };

      await createReturnFeedback(feedbackData);
    }

    // Reset the state
    setReturnData(INITIAL_STATE);
    setReturnPopup?.(false);
  };
  return (
    <>
      <form
        id="return_form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 mb-5"
      >
        <div className="flex flex-col gap-2">
          <label className={`${labelStyles}`}>
            ما سبب رغبتك في إرجاع الطلب؟
          </label>
          <select
            name="reason"
            value={returnData.reason}
            onChange={handleChange}
            className="border rounded px-2 w-full"
          >
            <option value="">اختيار السبب</option>
            <option value="المقاس غير مناسب">المقاس غير مناسب</option>
            <option value="اللون مختلف عن الصورة">اللون مختلف عن الصورة</option>
            <option value="التصميم لا يناسبني">التصميم لا يناسبني</option>
            <option value="جودة القماش غير كما توقعت">
              جودة القماش غير كما توقعت
            </option>
            <option value="سبب آخر">سبب آخر</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className={`${labelStyles}`}>
            هل جربت العباءة قبل اتخاذ قرار الإرجاع؟
          </label>
          <div className="flex gap-4">
            <label className={`${labelStyles}`}>
              <input
                type="radio"
                name="tried"
                value="نعم"
                onChange={handleChange}
              />{" "}
              نعم
            </label>
            <label className={`${labelStyles}`}>
              <input
                type="radio"
                name="tried"
                value="لا"
                onChange={handleChange}
              />{" "}
              لا
            </label>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className={`${labelStyles}`}>كيف تُقيّم تجربة التسوق؟</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={returnData.rating}
            onChange={handleChange}
            className="border rounded px-2 w-16"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>هل هناك رغبة في الاستبدال؟</label>
          <div className="flex gap-4">
            <label className={`${labelStyles}`}>
              <input
                type="radio"
                name="exchange"
                value="نعم"
                onChange={handleChange}
              />{" "}
              نعم
            </label>
            <label className={`${labelStyles}`}>
              <input
                type="radio"
                name="exchange"
                value="لا"
                onChange={handleChange}
              />{" "}
              لا
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className={`${labelStyles}`}>
            ما مدى رضاك عن سرعة التوصيل؟
          </label>
          <select
            name="deliverySpeed"
            value={returnData.deliverySpeed}
            onChange={handleChange}
            className="border rounded px-2 w-full"
          >
            <option value="">اختيار</option>
            <option value="ممتازة">ممتازة</option>
            <option value="جيدة">جيدة</option>
            <option value="بطيئة">بطيئة</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className={`${labelStyles}`}>هل لديك أي ملاحظات إضافية؟</label>
          <textarea
            name="note"
            value={returnData.note}
            onChange={handleChange}
            className="border rounded p-2 w-full text-sm caret-accentA"
            placeholder="قم بكتابة الملاحظة"
          />
        </div>
      </form>

      <div className={`flex items-center justify-between gap-3`}>
        <button
          className={`${sharedStyles}`}
          onClick={() => setReturnPopup?.(false)}
        >
          الغاء
        </button>

        <button type="submit" className={`${sharedStyles}`} form="return_form">
          إرسال
        </button>
      </div>
    </>
  );
}
