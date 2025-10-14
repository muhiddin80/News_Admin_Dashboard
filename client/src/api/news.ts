import { News } from "@/types/news";
import { customAxios } from "./custom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const getErrorMessage = (error: unknown, defaultMessage: string) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || defaultMessage;
  }
  if (error instanceof Error) {
    return error.message || defaultMessage;
  }
  return defaultMessage;
};

export const getNews = async (): Promise<News[]> => {
  try {
    const res = await customAxios.get("/news");
    return res.data.data;
  } catch (error: unknown) {
    const message = getErrorMessage(
      error,
      "Yangiliklarni olishda xatolik yuz berdi!"
    );
    toast.error(message);
    console.error("Error while fetching news:", message);
    throw new Error(message);
  }
};

export const getNew = async (id: string | number): Promise<News> => {
  try {
    const res = await customAxios.get(`/news/${id}`);
    return res.data.data;
  } catch (error: unknown) {
    const message = getErrorMessage(
      error,
      `ID ${id} bilan yangilikni olishda xatolik!`
    );
    toast.error(message);
    console.error("Error while fetching news:", message);
    throw new Error(message);
  }
};

export const createNew = async (payload: Partial<News>) => {
  try {
    const formData = new FormData();
    if (payload.title) formData.append("title", payload.title);
    if (payload.content) formData.append("content", payload.content);
    if (payload.contentUrl) formData.append("contentUrl", payload.contentUrl);
    if (payload.img) formData.append("img", payload.img);
    if (payload.authorId) formData.append("authorId", String(payload.authorId));

    const res = await customAxios.post("/news", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Yangilik muvaffaqiyatli qo‘shildi!");
    return res.data.data;
  } catch (error: unknown) {
    const message = getErrorMessage(
      error,
      "Yangilikni qo‘shishda xatolik yuz berdi!"
    );
    toast.error(message);
    console.error("Error while creating news:", message);
    throw new Error(message);
  }
};

export const updateNew = async (
  payload: Partial<News>,
  id: string | number
) => {
  try {
    const formData = new FormData();
    if (payload.title) formData.append("title", payload.title);
    if (payload.content) formData.append("content", payload.content);
    if (payload.contentUrl) formData.append("contentUrl", payload.contentUrl);
    if (payload.img) formData.append("img", payload.img);
    if (payload.authorId) formData.append("authorId", String(payload.authorId));

    const res = await customAxios.patch(`/news/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Yangilik muvaffaqiyatli yangilandi!");
    return res.data.data;
  } catch (error: unknown) {
    const message = getErrorMessage(
      error,
      `ID ${id} bilan yangilikni yangilashda xatolik!`
    );
    toast.error(message);
    console.error("Error while updating news:", message);
    throw new Error(message);
  }
};

export const deleteNew = async (id: string | number) => {
  try {
    const res = await customAxios.delete(`/news/${id}`);
    toast.success("Yangilik muvaffaqiyatli o‘chirildi!");
    return res.data.data;
  } catch (error: unknown) {
    const message = getErrorMessage(
      error,
      `ID ${id} bilan yangilikni o‘chirishda xatolik!`
    );
    toast.error(message);
    console.error("Error while deleting news:", message);
    throw new Error(message);
  }
};
