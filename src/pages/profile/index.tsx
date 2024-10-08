import Header from "@/components/app/header";
import { useUser } from "@/contexts/UserContext";

export default function ProfilePage() {
  const { user, session } = useUser();

  return (
    <div className="antialiased bg-light dark:bg-gray-900">
      <Header />
      <main className="p-4 h-auto pt-20">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
          <div className="flex flex-col items-center pb-10 pt-4">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={user?.avatar ?? ""}
              alt={user?.name}
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user?.name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user?.email}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {session?.countryName}
            </span>
            <span className="text-sm text-primary dark:text-gray-400">
              Member Since{" "}
              <span className="font-bold">
                {new Date(session?.$createdAt ?? "").toDateString()}
              </span>
            </span>
            {/* <div className="flex mt-4 md:mt-6">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add friend
              </a>
              <a
                href="#"
                className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Message
              </a>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
}
