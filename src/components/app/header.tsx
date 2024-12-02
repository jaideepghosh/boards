import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/dropdown-menu";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import appwriteClient from "@/config/appwrite";
import { Account } from "appwrite";
import { useRouter } from "next/router";
import { LayoutDashboard, PlugZap, Presentation } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/drawer";

export default function Header() {
  const { user, session } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const logout = () => {
    const account = new Account(appwriteClient);
    account.deleteSession(session?.$id as string);
    router.push("/auth");
  };
  const isActive = (path: string) => path === pathname;
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <Drawer>
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <DrawerTrigger className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                aria-hidden="true"
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Toggle sidebar</span>
            </DrawerTrigger>
            <Link href="/" className="flex items-center justify-between mr-4">
              {/* <img className="mr-3 h-8" alt="Boards Logo" /> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Boards
              </span>
            </Link>
          </div>
          <div
            className="items-center justify-between hidden w-full lg:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/"
                  className={`${
                    isActive("/") ? "text-blue-700" : "text-gray-900"
                  } flex gap-1 py-2 px-3 bg-blue-700 rounded md:bg-transparent md:p-0 md:dark:text-blue-500`}
                  aria-current="page"
                >
                  <LayoutDashboard />
                  Dashboards
                </Link>
              </li>
              <li>
                <Link
                  href="/data-source"
                  className={`${
                    isActive("/data-source") ? "text-blue-700" : "text-gray-900"
                  } flex gap-1 py-2 px-3 bg-blue-700 rounded md:bg-transparent md:p-0 md:dark:text-blue-500`}
                >
                  <PlugZap />
                  Data Source
                </Link>
              </li>
              <li>
                <Link
                  href="/canvas"
                  className={`${
                    isActive("/canvas") ? "text-blue-700" : "text-gray-900"
                  } flex gap-1 py-2 px-3 bg-blue-700 rounded md:bg-transparent md:p-0 md:dark:text-blue-500`}
                >
                  <Presentation />
                  Canvas
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center lg:order-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img
                  className="w-8 h-8 rounded-full"
                  src={user?.avatar ?? ""}
                  alt="User photo"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-2">
                <div className="py-3 px-4">
                  <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                    {user?.name}
                  </span>
                  <span className="block text-sm text-gray-900 truncate dark:text-white">
                    {user?.email}
                  </span>
                </div>
                <DropdownMenuSeparator />
                <ul
                  className="py-1 text-gray-700 dark:text-gray-300"
                  aria-labelledby="dropdown"
                >
                  <li>
                    <Link
                      href="/profile"
                      className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      My profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/account-settings"
                      className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      Account settings
                    </Link>
                  </li>
                </ul>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="py-1 text-gray-700 dark:text-gray-300">
                  <button
                    onClick={logout}
                    className="w-full py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <DrawerContent className="h-full p-4">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
            <DrawerClose className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </DrawerClose>
          </DrawerHeader>

          <Link
            href="/"
            className={`${
              isActive("/") ? "text-blue-700" : "text-gray-900"
            } flex py-2 my-2 px-3 bg-light rounded`}
            aria-current="page"
          >
            <LayoutDashboard />
            Dashboards
          </Link>
          <Link
            href="/data-source"
            className={`${
              isActive("/data-source") ? "text-blue-700" : "text-gray-900"
            } flex py-2 my-2 px-3 bg-light rounded`}
          >
            <PlugZap />
            Data Source
          </Link>
          <Link
            href="/canvas"
            className={`${
              isActive("/canvas") ? "text-blue-700" : "text-gray-900"
            } flex py-2 my-2 px-3 bg-light rounded`}
          >
            <Presentation />
            Canvas
          </Link>
        </DrawerContent>
      </Drawer>
    </nav>
  );
}
