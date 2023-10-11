import Layout from "@/layouts";
import { useRouter } from "next/router";

export default function UserByName() {
  const router = useRouter();
  const { id } = router?.query;

  return (
    <Layout metaTitle={"Dynamic Route"} metaDescription={"Route yang dinamis"}>
      <p>Users by Name {id}</p>
    </Layout>
  );
}
