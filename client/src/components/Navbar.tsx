"use client";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const getPageTitle = () => {
    switch (pathname) {
      case "/admin":
        return "Xabarlar ro’yhati";
      case "/admin/create":
        return "Xabar yaratish";
    }
  };

  return (
    <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-300 shadow-sm flex items-center justify-between">
      <div className="text-xl font-semibold text-gray-800">
        {getPageTitle()}
      </div>

      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-all duration-200"
      >
        <ArrowLeft size={20} />
        Menyuga
      </button>
    </div>
  );
};

export default Navbar;
