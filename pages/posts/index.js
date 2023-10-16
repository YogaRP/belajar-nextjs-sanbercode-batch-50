import dynamic from "next/dynamic";
// import Link from "next/link";

const LayoutComponent = dynamic(() => import("@/layouts"));

export default function Posts({ posts }) {
  return (
    <>
      <LayoutComponent metaTitle={"Posts"}>
        {posts.map((item) => {
          return (
            <div>
              <p>{item.id}</p>
              <p>
                <b>{item.title}</b>
              </p>
              <p>{item.body}</p>
            </div>
          );
        })}
      </LayoutComponent>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return { props: { posts } };
}
