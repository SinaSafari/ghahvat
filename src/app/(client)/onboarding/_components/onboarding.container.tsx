"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BaseProfile } from "./baseProfileInfor";
import { PasswordInfo } from "./passwordInfo";
import { ProfileType } from "./profileType";
import { useRegisterStore } from "@/modules/auth/store";
import { useRouter } from "next/navigation";
import { useAuth } from "@/modules/auth/useAuth";

const stepsContent = [
  <BaseProfile key={1} />,
  <PasswordInfo key={2} />,
  // <ProfileType key={3} />,
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    };
  },
};

export function OnboardingContainer() {
  const { password, profileId, displayName, phone } = useRegisterStore();
  const [currentPage, setCurrentPage] = useState([0, 0]);
  const { login } = useAuth();
  const router = useRouter();

  const register = async () => {
    const res = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        password,
        displayName,
        profileId,
      }),
    });

    const data = await res.json();
    login({ accessToken: data.accessToken, refreshToken: data.refreshToken });

    router.push(`/${profileId}`);
  };

  return (
    <>
      <div className="w-[500px] h-96 flex relative ">
        <div className="absolute bottom-0 left-0 right-0 h-24 w-full flex items-center justify-between ">
          <div
            className="prev z-10"
            onClick={() => {
              if (currentPage[0] !== 0) {
                // setCurrentPage(currentPage - 1);
                setCurrentPage([currentPage[0] - 1, -1]);
              }
            }}
          >
            <button disabled={currentPage[0] === 0} className="btn btn-primary">
              پریویوس
            </button>
          </div>
          <div
            className="next z-10"
            onClick={() => {
              if (currentPage[0] === stepsContent.length - 1) {
                return register();
              }
              setCurrentPage([currentPage[0] + 1, 1]);
            }}
          >
            <button className="btn btn-primary">نکست</button>
          </div>
        </div>

        <AnimatePresence initial={false} custom={currentPage[1]}>
          <motion.div
            key={currentPage[0]}
            className="grid place-items-center w-full absolute top-0 left-0 right-0"
            custom={currentPage[1]}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            {stepsContent[currentPage[0]]}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
