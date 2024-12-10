import Link from "next/link";
import { BASE_PATH } from "@/constants/common";

export default function Header() {
  return (
    <header className=" flex items-center justify-between px-5 py-3  ">
      <div className="flex items-center gap-2">
        <Link className="flex" href="/">
          <img className="h-5" src={`${BASE_PATH}/logo.png`} alt="Boards" />
        </Link>
      </div>
      <nav className="flex items-center gap-5">
        <Link
          href="/auth"
          className="text-white bg-primary hover:bg-foreground focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 me-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          Login
        </Link>
      </nav>
    </header>
  );
}
