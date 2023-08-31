"use client";

import Image from "next/image";
import gbmLogo from "../../../../public/gbmlogo.jpg";
// import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterStore } from "@/modules/auth/store";
import { useAuth } from "@/modules/auth/useAuth";

export default function LoginPage() {
  const [data, setData] = useState({ phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [passwordAuth, setPasswordAuth] = useState(false);
  const router = useRouter();
  const { setRegisterData } = useRegisterStore();
  const { login } = useAuth();

  const fetchIsNewUser = async () => {
    try {
      let res = await fetch(`/api/users/login-request?phone=${data.phone}`);
      const { newUser } = await res.json();

      if (newUser) {
        setRegisterData("phone", data.phone);
        return router.push("/onboarding");
      }

      setPasswordAuth(true);
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  const loginRequest = async () => {
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: data.phone, password: data.password }),
      });
      const loginData = (await res.json()) as {
        accessToken: string;
        refreshToken: string;
      };
      login({
        accessToken: loginData.accessToken,
        refreshToken: loginData.refreshToken,
      });

      router.push("/");
    } catch (err) {}
  };

  const nextBtnHandler = () => {
    if (passwordAuth) {
      loginRequest();
    } else {
      fetchIsNewUser();
    }
  };
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="w-96 px-2">
        <div className="avatar flex items-center justify-center mb-4">
          <div className="w-24 rounded-full">
            <Image src={gbmLogo} alt="logo" />
          </div>
        </div>
        <h1 className="text-xl font-extrabold text-center mb-4">
          ورود به قهوه‌ت با من
        </h1>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">شماره تلفن شما</span>
          </label>
          <input
            type="text"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            placeholder="9123456789"
            className="input input-bordered w-full"
          />
        </div>
        <div
          className={`form-control w-full overflow-hidden transition-[max-height] duration-500 ease-in ${
            passwordAuth ? "max-h-44" : "max-h-0"
          }`}
        >
          <label className="label">
            <span className="label-text">رمز عبور شما</span>
          </label>
          <input
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="xxxxxx"
            className="input input-bordered w-full"
          />
        </div>
        {/* )} */}

        <div className="flex flex-row-reverse items-center mt-4">
          <button className="btn btn-primary" onClick={nextBtnHandler}>
            <span
              className={`loading loading-spinner overflow-hidden transition-[max-width] duration-500 ease-in ${
                loading ? "max-w-[14px]" : "max-w-0"
              }`}
            ></span>
            <span>ورود</span>
          </button>
        </div>
      </div>
    </div>
  );
}
