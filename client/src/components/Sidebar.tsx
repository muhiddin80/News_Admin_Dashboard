"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Newspaper, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const Sidebar = ({ links }: { links: object[] }) => {
  const pathname = usePathname();
  const router = useRouter();

  const LinkStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
      isActive
        ? "bg-black text-white shadow-sm"
        : "text-black hover:bg-black hover:text-white"
    }`;

  return (
    <div className="bg-white h-screen w-64 sticky top-0 border-r border-gray-300 shadow-sm flex flex-col">
      <div className="px-5 bg-gray-100 py-5 border-b border-gray-300">
        <h1 className="text-2xl font-semibold text-black tracking-tight">
          Admin Panel
        </h1>
      </div>

      <div className="flex p-5 bg-gray-100 border-b border-b-gray-300 gap-4 items-center">
        <div className="bg-black text-white w-10 h-10 text-xl rounded-full flex items-center justify-center">
          A
        </div>
        <div>
          <p className="font-medium text-black">admin</p>
          <p className="text-gray-400 text-sm">Administrator</p>
        </div>
      </div>

      <nav className="px-5 bg-gray-100 py-5">
        <ul className="space-y-2">
          {links.map((e, index) => {
            const key = Object.keys(e)[0];
            const href = Object.values(e)[0];
            const isActive = pathname === href;

            return (
              <li key={index}>
                <Link href={href} className={LinkStyle({ isActive })}>
                  {index === 0 && <Newspaper size={18} />}
                  {index === 1 && <Plus size={18} />}
                  {key}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-5 bg-gray-100 border-t border-gray-300 flex items-center justify-center py-5">
        <button
          onClick={() => router.push("/login")}
          className="flex items-center gap-2 text-red-600 font-medium hover:bg-red-100 transition-all duration-200 px-4 py-3 rounded-lg w-full"
        >
          <LogOut size={18} />
          Chiqish
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
