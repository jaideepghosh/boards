import Link from "next/link";

export default function Footer() {
  return (
    <div className="border-t mt-20">
      <footer>
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between py-10 max-w-screen-lg mx-auto text-sm px-5 text-gray-500">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <Link
              href="https://jaideepghosh.github.io/boards/"
              target="_blank"
              rel="noopener"
            >
              Boards
            </Link>
            . All rights reserved.
          </p>
          <nav className="flex gap-5">
            <Link href="/terms" target="_blank" rel="noopener noreferrer">
              Terms
            </Link>
            <Link href="/license" target="_blank" rel="noopener noreferrer">
              License
            </Link>
            <Link href="/faq" target="_blank" rel="noopener noreferrer">
              FAQ
            </Link>
          </nav>
        </div>

        {/* <Signature /> */}
      </footer>
    </div>
  );
}
