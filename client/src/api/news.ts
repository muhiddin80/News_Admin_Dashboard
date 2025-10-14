import { News } from "@/types/news";
import { customAxios } from "./custom";

export const getNews = async (): Promise<News[] | undefined> => {
  try {
    const res = await customAxios.get("/news");
    return res.data.data;
  } catch (error: unknown) {
    console.log(
      "Error while fetching news",
      error instanceof Error ? error.message : error
    );
    throw error;
  }
};

export const getNew = async (
  id: string | number
): Promise<News | undefined> => {
  try {
    const res = await customAxios.get(`/news/${id}`);
    return res.data.data;
  } catch (error: unknown) {
    console.log(
      `Error while fetching news with id ${id}`,
      error instanceof Error ? error.message : error
    );
    throw error;
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

    console.log("News created successfully");
    return res.data.data;
  } catch (error: unknown) {
    console.log(
      "Error while creating news",
      error instanceof Error ? error.message : error
    );
    throw error;
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

    console.log("News updated successfully");
    return res.data.data;
  } catch (error: unknown) {
    console.log(
      `Error while updating news with id ${id}`,
      error instanceof Error ? error.message : error
    );
    throw error;
  }
};

export const deleteNew = async (id: string | number) => {
  try {
    const res = await customAxios.delete(`/news/${id}`);
    console.log("News deleted successfully");
    return res.data.data;
  } catch (error: unknown) {
    console.log(
      `Error while deleting news with id ${id}`,
      error instanceof Error ? error.message : error
    );
    throw error;
  }
};
