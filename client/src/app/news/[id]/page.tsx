"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetNew } from "@/hooks";
import React from "react";
import { ArrowLeft } from "lucide-react";

const NewsDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined;

  const { data: news, isLoading, isError } = useGetNew(id ?? "");

  if (!id) return <div className="text-center py-10">Invalid news ID</div>;
  if (isLoading) return <div className="text-center py-10">Yuklanmoqda...</div>;
  if (isError || !news)
    return (
      <div className="text-center py-10 text-red-500">Xatolik yuz berdi!</div>
    );

  const imageUrl = news.ImgUrl
    ? `http://localhost:4000/uploads/${news.ImgUrl}`
    : null;

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white my-10 rounded-2xl shadow-md">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 font-medium"
      >
        <ArrowLeft size={20} /> Ortga
      </button>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={news.title}
          className="w-full rounded-lg mb-6 shadow-md"
        />
      )}

      <h1 className="text-3xl font-bold mb-3">{news.title}</h1>
      <p className="text-gray-500 mb-6">
        {new Date(news.createdAt).toLocaleString()}
      </p>

      <p className="text-lg leading-relaxed text-gray-800 mb-8">
        {news.content}
      </p>

      {news.contentUrl && (
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500">
            Manba:{" "}
            <a
              href={news.contentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline italic"
            >
              {news.contentUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsDetailPage;
