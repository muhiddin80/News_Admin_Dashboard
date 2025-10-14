"use client";

import { useGetAllNews } from "@/hooks";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const data = useGetAllNews();

  return (
    <>
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">News Portal</h1>

        <button
          onClick={() => router.push("/login")}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Admin
        </button>
      </nav>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data?.map((e) => (
          <div
            key={e.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            <div className="relative w-full h-48">
              <Image
                src={`https://news-admin-dashboard-d0va.onrender.com/uploads/${e.ImgUrl}`}
                alt={e.title}
                fill
                className="object-cover rounded-t-xl"
              />
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-500 mb-2">
                {new Date(e.createdAt).toLocaleDateString()}
              </p>
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {e.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{e.content}</p>
              <button
                onClick={() => router.push(`/news/${e.id}`)}
                className="text-blue-600 hover:underline flex items-center"
              >
                <ArrowLeft size={20} /> Ko&apos;proq o&apos;qish
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
