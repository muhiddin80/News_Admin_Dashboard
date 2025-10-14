"use client";

import React, { useState } from "react";
import { useLoginUser } from "@/hooks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { User } from "@/types/user";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const login = useLoginUser();

  const [formData, setFormData] = useState({
    email: "john@example.com",
    password: "1234",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    login.mutate(formData, {
      onSuccess: (data: User) => {
        toast.success("Tizimga muvaffaqiyatli kirildi!");
        localStorage.setItem("user", JSON.stringify(data));
        router.push("/admin");
      },
      onError: (error: unknown) => {
        let message = "Email yoki parol noto‘g‘ri!";
        if (error instanceof AxiosError) {
          message = error.response?.data?.message || message;
        }
        toast.error(message);
        console.error("Login error:", error);
      },
    });
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-[400px] mx-auto text-center py-10 px-7 bg-white rounded-xl shadow-2xl">
        <h1 className="text-2xl font-semibold mb-7">Admin Login</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-start gap-5"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              className="p-2 outline-none rounded-xl shadow-sm px-3 border border-gray-200 focus:border-black transition"
              type="email"
              name="email"
              id="email"
              placeholder="email..."
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-medium">
              Parol
            </label>
            <input
              className="p-2 outline-none rounded-xl shadow-sm px-3 border border-gray-200 focus:border-black transition"
              type="password"
              name="password"
              id="password"
              placeholder="parol..."
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-black w-full py-2 rounded-xl mt-4 hover:bg-gray-800 transition"
          >
            {login.isPending ? "Yuklanmoqda..." : "Kirish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
