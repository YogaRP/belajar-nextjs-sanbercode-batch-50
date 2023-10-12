import Layout from "@/layouts";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response =>", res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Layout
        metaTitle={"Home"}
        metaDescription={"Ini adalah Halaman Home Atau Landing Page"}
      >
        <p className="bg-fuchsia-500">Home</p>
      </Layout>
    </>
  );
}
