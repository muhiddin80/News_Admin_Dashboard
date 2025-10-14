import { login } from "@/api";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (payload: Partial<User>) => login(payload),
  });
};
