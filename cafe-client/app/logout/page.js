"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useLoginStore, useUserStore } from "../../store/user"

const Page = () => {
  const router = useRouter();

  const logOut = useLoginStore((state) => state.logOut);
  const logUserOut = useUserStore((state) => state.logUserOut);

  useEffect(() => {
    logOut()
    logUserOut()
    router.push("/")
  }, [router, logOut, logUserOut]);

  return (null);
};

export default Page;
