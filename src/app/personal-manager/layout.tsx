"use client";

import Navbar from "@/components/Navbar";
import PersonalManagerSidebar from "@/components/personal-manager/Sidebar";
import { AuthProvider } from "@/context/AuthContext";

export default function PersonalManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      style={{
        paddingTop: "var(--nav-h)",
        minHeight: "100vh",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <AuthProvider>
        <Navbar />

        <PersonalManagerSidebar>{children}</PersonalManagerSidebar>
      </AuthProvider>
    </main>
  );
}
