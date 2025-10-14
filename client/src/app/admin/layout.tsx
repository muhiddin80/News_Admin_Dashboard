"use client";

import Navbar from "@/components/Navbar";
import PrivateRoute from "@/components/PrivateRoute";
import Sidebar from "@/components/Sidebar";
import useAutoLogoutOnLeave from "@/components/userAuto";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarLinks = [
    { "Yangiliklar ro'yhati": "/admin" },
    { "Yangilik Yaratish": "/admin/create" },
  ];

  useAutoLogoutOnLeave();

  return (
    <PrivateRoute>
      <div className="bg-gray-50 flex min-h-screen">
        <Sidebar links={sidebarLinks} />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </PrivateRoute>
  );
}
