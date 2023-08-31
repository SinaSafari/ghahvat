"use client";

import { useRegisterStore } from "@/modules/auth/store";
import type { FC } from "react";

export const BaseProfile: FC = () => {
  const { profileId, displayName, setRegisterData } = useRegisterStore();
  return (
    <div className={"w-full h-full"}>
      <h1 className="mb-4 text-2xl font-bold">شما را چطور صدا کنیم؟</h1>
      <div className="flex flex-col items-stretch justify-between">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">آی‌دی شما</span>
            {/* <span className="label-text-alt">Top Right label</span> */}
          </label>
          <input
            type="text"
            value={profileId}
            onChange={(e) => setRegisterData("profileId", e.target.value)}
            placeholder="jack"
            className="input input-bordered w-full "
          />
          <label className="label">
            <span className="label-text-alt">
              کاربران شما را با این آی‌دی منشن میکنن.
            </span>
            {/* <span className="label-text-alt">Bottom Right label</span> */}
          </label>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">نام نمایشی شما</span>
            {/* <span className="label-text-alt">Top Right label</span> */}
          </label>
          <input
            type="text"
            placeholder="جک"
            value={displayName}
            onChange={(e) => setRegisterData("displayName", e.target.value)}
            className="input input-bordered w-full "
          />
          <label className="label">
            <span className="label-text-alt">
              این نام در پروفایل شما نمایش داده میشه.
            </span>
            {/* <span className="label-text-alt">Bottom Right label</span> */}
          </label>
        </div>
      </div>
    </div>
  );
};
