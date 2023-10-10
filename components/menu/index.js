import Link from "next/link";

export default function Menu() {
  return (
    <>
      <ul className="flex">
        <li className="mr-2">
          <Link className="text-blue-500 hover:text-blue-800" href={"/"}>
            Home
          </Link>
        </li>
        <li className="mr-2">
          <Link className="text-blue-500 hover:text-blue-800" href={"/profile"}>
            Profile
          </Link>
        </li>
        <li>
          <Link className="text-blue-500 hover:text-blue-800" href={"/users"}>
            Users
          </Link>
        </li>
      </ul>
    </>
  );
}
