export const Signature = () => (
  <a
    href="https://jaideepghosh.github.io/boards/"
    target="_blank"
    rel="noopener"
    className="fixed flex px-3 py-1 space-x-2 text-sm font-semibold text-foreground bg-white border border-gray-300 rounded shadow-sm place-items-center right-5 bottom-5"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
      />
    </svg>
    <span>Powered by Boards</span>
  </a>
);

export default Signature;
