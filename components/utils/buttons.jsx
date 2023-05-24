import { useRouter } from "next/router";

export function Button({ onClick, url }) {
  const router = useRouter();

  return (
    <div
      onClick={url ? () => router.push("/") : onClick}
      className="absolute px-5 max-w-7xl mx-auto w-full left-1/2 -translate-x-1/2 top-[3rem] md:top-20"
    >
      <button className="flex gap-1 text-white hover:text-blue-500">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        Back
      </button>
    </div>
  );
}
