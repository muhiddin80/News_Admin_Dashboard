"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import NewsCard from "@/components/newCard";
import { useDeleteNew, useGetAllNews } from "@/hooks";

const AdminPage = () => {
  const router = useRouter();
  const { data: allNews, isLoading, isError } = useGetAllNews();
  const deleteNew = useDeleteNew();
  const [newsList, setNewsList] = useState(allNews || []);

  useEffect(() => {
    if (allNews) setNewsList(allNews);
  }, [allNews]);

  const handleDelete = (id: string | number) => {
    if (!confirm("Yangilikni o‘chirmoqchimisiz?")) return;

    deleteNew.mutate(id, {
      onSuccess: () => {
        setNewsList((prev) => prev.filter((n) => n.id !== id));
        // toast.success("Yangilik muvaffaqiyatli o‘chirildi!");
      },
      onError: () => {
        toast.error("Yangilikni o‘chirishda xatolik yuz berdi!");
      },
    });
  };

  if (isLoading) return <div>Yuklanmoqda...</div>;
  if (isError) return <div>Xatolik yuz berdi!</div>;

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => router.push("/admin/create")}
        className="self-end bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        + Yangilik qo‘shish
      </button>

      {newsList.map((news) => (
        <NewsCard
          key={news.id}
          id={news.id}
          time={news.createdAt}
          title={news.title}
          description={news.content}
          onEdit={() => router.push(`/admin/create?id=${news.id}`)}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default AdminPage;
