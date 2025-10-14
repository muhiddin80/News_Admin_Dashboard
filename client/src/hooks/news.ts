import { createNew, deleteNew, getNew, getNews, updateNew } from "@/api";
import { News } from "@/types/news";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllNews = () => {
  return useQuery({
    queryFn: getNews,
    queryKey: ["News"],
  });
};

export const useGetNew = (id: string | number) => {
  return useQuery({
    queryFn: () => getNew(id),
    queryKey: ["New"],
  });
};

export const useCreateNew = () => {
  return useMutation({
    mutationFn: (payload: Partial<News>) => createNew(payload),
  });
};

export const useUpdateNew = () => {
  return useMutation({
    mutationFn: ({
      payload,
      id,
    }: {
      payload: Partial<News>;
      id: string | number;
    }) => updateNew(payload, id),
  });
};

export const useDeleteNew = () => {
  return useMutation({
    mutationFn: (id: string | number) => deleteNew(id),
  });
};
