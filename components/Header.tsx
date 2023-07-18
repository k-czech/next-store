import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();

  return (
    <header>
      <nav className="bg-gray-200 px-4 py-2 space-x-2">
        <Link
          href="/"
          className={router.pathname === "/" ? "text-blue-400" : ""}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={router.pathname === "/about" ? "text-blue-400" : ""}
        >
          About
        </Link>
      </nav>
    </header>
  );
};
