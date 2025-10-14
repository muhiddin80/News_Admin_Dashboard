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
    if (!confirm("Are you sure you want to delete this news?")) return;

    deleteNew.mutate(id, {
      onSuccess: () => {
        toast.success("News deleted successfully!");
        setNewsList((prev) => prev.filter((n) => n.id !== id));
      },
      onError: () => {
        toast.error("Failed to delete news!");
      },
    });
  };

  if (isLoading) return <div>Loading news...</div>;
  if (isError) return <div>Error loading news</div>;

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => router.push("/admin/create")}
        className="self-end bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        + Add News
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
