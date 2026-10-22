
import Link from "next/link";

const menus = [
  { name: "생활비 계산기", href: "/" },
  { name: "청년 혜택", href: "/benefits" },
  { name: "동네 탐색", href: "/neighborhood" },
  { name: "컬처라이프", href: "/culture" },
  { name: "커뮤니티", href: "/community" },
];

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-extrabold text-blue-600">
          🌊 무브산
        </Link>

        <nav className="flex items-center gap-6">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              href={menu.href}
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              {menu.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <button className="text-gray-600">로그인</button>
          <button className="rounded-full bg-blue-600 px-4 py-2 font-semibold text-white">
            회원가입
          </button>
        </div>
      </div>
    </header>
  );
}
