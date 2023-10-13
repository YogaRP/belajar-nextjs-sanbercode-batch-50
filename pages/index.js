// import Layout from "@/layouts";
// import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect } from "react";
const LayoutComponent = dynamic(() => import("@/layouts"));

export default function Home() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response =>", res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <LayoutComponent
        metaTitle={"Home"}
        metaDescription={"Ini adalah Halaman Home Atau Landing Page"}
      >
        <p className="bg-fuchsia-500">Home</p>
        {/* <Image src="/nextjs.png" width={400} height={400} alt="next img" />
        <img
          src="/nextjs.png"
          style={{ width: 400, height: 400 }}
          alt="next img"
        /> */}
      </LayoutComponent>
    </>
  );
}
