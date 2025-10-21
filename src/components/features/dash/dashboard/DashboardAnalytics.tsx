// import React from 'react'

import { PriceFormatter } from "@/utils/formatePrice";
import { useState } from "react";

const sharedBtnStyles = "py-2 px-2 border rounded-md cursor-pointer text-xs";

export default function DashboardAnalytics() {
  const [activePeriod, setActivePeriod] = useState("1-day");

  const handleActivePeriod = (period: string) => {
    setActivePeriod(period);
  };

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-1 border border-gray-400 py-3 px-5 rounded-lg min-h-20">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-medium text-primary">تقرير مبيعاتك</h3>
          <span className="text-sm text-gray">انظر الى مبيعاتك</span>
        </div>
        <h2 className="text-5xl mt-5">{PriceFormatter(4500, "en")}E.L</h2>

        <div className="flex items-center justify-around mt-8">
          <button
            className={`${sharedBtnStyles} ${
              activePeriod === "1-day"
                ? "bg-primary text-neutral border-primary"
                : "border-gray-400"
            }`}
            onClick={() => handleActivePeriod("1-day")}
          >
            1 يوم
          </button>
          <button
            className={`${sharedBtnStyles} ${
              activePeriod === "7-days"
                ? "bg-primary text-neutral border-primary"
                : "border-gray-400"
            }`}
            onClick={() => handleActivePeriod("7-days")}
          >
            7 أيام
          </button>
          <button
            className={`${sharedBtnStyles} ${
              activePeriod === "30-days"
                ? "bg-primary text-neutral border-primary"
                : "border-gray-400"
            }`}
            onClick={() => handleActivePeriod("30-days")}
          >
            30 يوم
          </button>
          <button
            className={`${sharedBtnStyles} ${
              activePeriod === "1-year"
                ? "bg-primary text-neutral border-primary"
                : "border-gray-400"
            }`}
            onClick={() => handleActivePeriod("1-year")}
          >
            1 سنة
          </button>
        </div>
      </div>
      <div className="col-span-2 border border-gray-400 py-3 px-5 rounded-lg min-h-20" />
    </div>
  );
}
