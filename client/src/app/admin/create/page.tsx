"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useCreateNew, useUpdateNew, useGetAllNews } from "@/hooks";
import { News } from "@/types/news";

const NewsForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const createNews = useCreateNew();
  const updateNews = useUpdateNew();
  const { data: allNews } = useGetAllNews();

  const editingNews = id
    ? allNews?.find((n: News) => n.id.toString() === id)
    : null;

  const [formData, setFormData] = useState<Partial<News>>({
    title: "",
    content: "",
    contentUrl: "",
    img: null,
  });

  useEffect(() => {
    if (editingNews) {
      setFormData({
        title: editingNews.title,
        content: editingNews.content,
        contentUrl: editingNews.contentUrl,
        img: editingNews.img,
      });
    }
  }, [editingNews]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "img" && (e.target as HTMLInputElement).files) {
      setFormData((prev) => ({
        ...prev,
        img: (e.target as HTMLInputElement).files![0],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.content ||
      !formData.contentUrl ||
      !formData.img
    ) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    const authorId = parsedUser?.id;

    if (!authorId) {
      toast.error("Foydalanuvchi topilmadi! Iltimos, qayta kiring.");
      return;
    }

    const payload = {
      ...formData,
      authorId,
    };

    if (id) {
      updateNews.mutate(
        { id, payload },
        {
          onSuccess: () => toast.success("Yangilik yangilandi!"),
          onError: () => toast.error("Yangilashda xatolik yuz berdi!"),
        }
      );
    } else {
      createNews.mutate(payload, {
        onSuccess: () => {
          toast.success("Yangilik yaratildi!");
          setFormData({ title: "", content: "", contentUrl: "", img: null });
        },
        onError: () => toast.error("Yaratishda xatolik yuz berdi!"),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-[80%]">
      <div className="flex flex-col bg-white p-6 rounded-2xl shadow-lg gap-4">
        <label className="text-xl font-semibold" htmlFor="title">
          Sarlavha*
        </label>
        <input
          className="outline-none border border-gray-400 shadow-md rounded-xl p-2 px-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          type="text"
          name="title"
          id="title"
          placeholder="sarlavha..."
          value={formData.title || ""}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col bg-white p-6 rounded-2xl shadow-lg gap-4">
        <label className="text-lg font-medium" htmlFor="content">
          Tavsif*
        </label>
        <textarea
          className="outline-none border border-gray-400 shadow-md rounded-xl p-2 px-3 h-32 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          name="content"
          id="content"
          placeholder="tavsif..."
          value={formData.content || ""}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col bg-white p-6 rounded-2xl shadow-lg gap-4">
        <label className="text-lg font-medium" htmlFor="contentUrl">
          Sayt URL*
        </label>
        <input
          className="outline-none border border-gray-400 shadow-md rounded-xl p-2 px-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          type="text"
          name="contentUrl"
          id="contentUrl"
          placeholder="https://example.com"
          value={formData.contentUrl || ""}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col bg-white p-5 rounded-2xl shadow gap-4">
        <label
          htmlFor="img"
          className="text-gray-700 font-semibold text-lg mb-1"
        >
          Rasm<span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="file"
            name="img"
            id="img"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleChange}
          />
          <div className="flex items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
            <span className="text-gray-600 font-medium">
              {formData.img
                ? (formData.img as File).name
                : "Yuklash uchun bosing"}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end gap-5 items-center mt-4">
        <button
          type="button"
          onClick={() =>
            setFormData({ title: "", content: "", contentUrl: "", img: null })
          }
          className="shadow bg-white p-3 rounded-2xl hover:bg-gray-100 transition"
        >
          Bekor qilish
        </button>
        <button
          type="submit"
          className="shadow bg-black text-white p-3 rounded-2xl hover:bg-gray-800 transition"
        >
          {id ? "Yangilash" : "Yaratish"}
        </button>
      </div>
    </form>
  );
};

export default NewsForm;
