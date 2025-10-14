import { User } from "@/types/user";
import { customAxios } from "./custom";

export const login = async (payload: Partial<User>): Promise<User> => {
  try {
    const res = await customAxios.post("/users/login", payload);
    return res.data?.data;
  } catch (err) {
    const error = err as { response?: { data?: { message?: string } } };
    const message =
      error?.response?.data?.message || "Email yoki parol noto‘g‘ri!";
    return Promise.reject(new Error(message));
  }
};
