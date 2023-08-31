"use client";

import {} from "react";

export function ProfileType() {
  return (
    <div className="w-full h-full flex items-center flex-col ">
      <div className="flex items-center justify-between gap-2 w-full mb-4">
        <div className="flex-1 h-10 text-center border rounded grid place-items-center hover:bg-slate-900 hover:text-white transition-colors duration-500 cursor-pointer">
          پادکستر
        </div>
        <div className="flex-1 h-10 text-center border rounded grid place-items-center hover:bg-slate-900 hover:text-white transition-colors duration-500 cursor-pointer">
          یوتوبر
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 w-full mb-4">
        <div className="flex-1 h-10 text-center border rounded grid place-items-center hover:bg-slate-900 hover:text-white transition-colors duration-500 cursor-pointer">
          گیمر
        </div>
        <div className="flex-1 h-10 text-center border rounded grid place-items-center hover:bg-slate-900 hover:text-white transition-colors duration-500 cursor-pointer">
          بقیه رشته ها
        </div>
      </div>
    </div>
  );
}
