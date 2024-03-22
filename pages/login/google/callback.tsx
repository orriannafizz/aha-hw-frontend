import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";

const Callback = () => {
  const router = useRouter();
  useEffect(() => {
    const { accessToken, refreshToken } = router.query;
    if (accessToken && refreshToken) {
      Cookies.set("accessToken", String(accessToken));
      Cookies.set("refreshToken", String(refreshToken));
      router.push("/");
    }
  }, [router.query]);

  return <Link href="/">Back to Home Page</Link>;
};

export default Callback;
