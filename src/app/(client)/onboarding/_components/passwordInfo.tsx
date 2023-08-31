"use client";

import { useRegisterStore } from "@/modules/auth/store";

export function PasswordInfo() {
  const { setRegisterData, password, verifyPassword } = useRegisterStore();
  return (
    <div className={"w-full h-full"}>
      <h1 className="mb-4 text-2xl font-bold">رمز عبور</h1>
      <div className="flex flex-col items-stretch justify-between">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">رمز عبور شما</span>
            {/* <span className="label-text-alt">Top Right label</span> */}
          </label>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full "
            value={password}
            onChange={(e) => setRegisterData("password", e.target.value)}
          />
          {/* <label className="label">
            <span className="label-text-alt">
              کاربران شما را با این آی‌دی منشن میکنن.
            </span>
            <span className="label-text-alt">Bottom Right label</span>
          </label> */}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">تکرار رمز عبور شما</span>
            {/* <span className="label-text-alt">Top Right label</span> */}
          </label>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full "
            value={verifyPassword}
            onChange={(e) => setRegisterData("verifyPassword", e.target.value)}
          />
          {/* <label className="label">
            <span className="label-text-alt">
              این نام در پروفایل شما نمایش داده میشه.
            </span>
            <span className="label-text-alt">Bottom Right label</span>
          </label> */}
        </div>
      </div>
    </div>
  );
}
