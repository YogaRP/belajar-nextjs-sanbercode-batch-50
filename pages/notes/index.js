import dynamic from "next/dynamic";
import Link from "next/link";

const LayoutComponent = dynamic(() => import("@/layouts"));

export default function Notes({ notes }) {
  return (
    <>
      <LayoutComponent
        metaTitle={"Notes"}
        metaDescription={"Ini adalah Halaman Notes "}
      >
        {notes.data.map((item) => {
          return (
            <Link
              className=" flex flex-col text-blue-500 underline border p-2 rounded my-3 mx-3 max-w-xs shadow"
              href={`/notes/${item.id}`}
            >
              {item.title}
            </Link>
          );
        })}
      </LayoutComponent>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const notes = await res.json();
  return { props: { notes }, revalidate: 10 };
}
