"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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

  const [errors, setErrors] = useState({
    title: "",
    content: "",
    contentUrl: "",
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

  const validate = () => {
    const newErrors = { title: "", content: "", contentUrl: "" };
    if (!formData.title) newErrors.title = "Sarlavha kiritilishi shart!";
    if (!formData.content) newErrors.content = "Tavsif kiritilishi shart!";
    else if (formData.content.length < 10)
      newErrors.content = "Tavsif 10 ta harfdan qisqa bo‘lmasligi kerak!";
    if (!formData.contentUrl)
      newErrors.contentUrl = "Sayt URL manzili kiritilishi shart!";
    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e);
  };

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
    if (!validate()) return;

    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    const authorId = parsedUser?.id;

    if (!authorId) return;

    const payload = { ...formData, authorId };

    if (id) {
      updateNews.mutate(
        { id, payload },
        {
          onSuccess: () => {},
          onError: () => {},
        }
      );
    } else {
      createNews.mutate(payload, {
        onSuccess: () => {
          setFormData({ title: "", content: "", contentUrl: "", img: null });
        },
        onError: () => {},
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-[80%]">
      <div className="flex flex-col bg-white p-6 rounded-2xl shadow-lg gap-2">
        <label className="text-xl font-semibold" htmlFor="title">
          Sarlavha*
        </label>
        <input
          className={`outline-none border ${
            errors.title ? "border-red-500" : "border-gray-400"
          } shadow-md rounded-xl p-2 px-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
          type="text"
          name="title"
          id="title"
          placeholder="sarlavha..."
          value={formData.title || ""}
          onChange={handleChange}
        />
        <p className="text-gray-500 text-sm">
          Sarlavha qisqa, ammo mazmunli bo‘lishi kerak.
        </p>
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div className="flex flex-col bg-white p-6 rounded-2xl shadow-lg gap-2">
        <label className="text-lg font-medium" htmlFor="content">
          Tavsif*
        </label>
        <textarea
          className={`outline-none border ${
            errors.content ? "border-red-500" : "border-gray-400"
          } shadow-md rounded-xl p-2 px-3 h-32 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
          name="content"
          id="content"
          placeholder="tavsif..."
          value={formData.content || ""}
          onChange={handleChange}
        />
        <p className="text-gray-500 text-sm">
          Tavsif 10 ta harfdan qisqa bo‘lmasligi kerak.
        </p>
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content}</p>
        )}
      </div>

      <div className="flex flex-col bg-white p-6 rounded-2xl shadow-lg gap-2">
        <label className="text-lg font-medium" htmlFor="contentUrl">
          Sayt URL*
        </label>
        <input
          className={`outline-none border ${
            errors.contentUrl ? "border-red-500" : "border-gray-400"
          } shadow-md rounded-xl p-2 px-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
          type="text"
          name="contentUrl"
          id="contentUrl"
          placeholder="https://example.com"
          value={formData.contentUrl || ""}
          onChange={handleChange}
        />
        <p className="text-gray-500 text-sm">
          Bu yangilik manbasi uchun to‘liq havola bo‘lishi kerak.
        </p>
        {errors.contentUrl && (
          <p className="text-red-500 text-sm">{errors.contentUrl}</p>
        )}
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
                ? typeof formData.img === "string"
                  ? formData.img
                  : (formData.img as File).name
                : "Yuklash uchun bosing"}
            </span>
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          Rasm sifatli va mavzuga mos bo‘lishi kerak.
        </p>
      </div>

      <div className="w-full flex justify-end gap-5 items-center mt-4">
        <button
          type="button"
          disabled={createNews.isPending || updateNews.isPending}
          onClick={() =>
            setFormData({ title: "", content: "", contentUrl: "", img: null })
          }
          className="shadow bg-white p-3 rounded-2xl hover:bg-gray-100 transition disabled:opacity-60"
        >
          Bekor qilish
        </button>
        <button
          type="submit"
          disabled={createNews.isPending || updateNews.isPending}
          className="shadow bg-black text-white p-3 rounded-2xl hover:bg-gray-800 transition disabled:opacity-60"
        >
          {createNews.isPending || updateNews.isPending
            ? "Saqlanmoqda..."
            : id
            ? "Yangilash"
            : "Yaratish"}
        </button>
      </div>
    </form>
  );
};

export default NewsForm;
