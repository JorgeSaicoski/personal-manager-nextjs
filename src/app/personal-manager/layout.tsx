"use client";

import PersonalManagerSidebar from "@/components/personal-manager/Sidebar";
import AuthRoutes from "@/components/protected-routes/AuthRoutes";

export default function PersonalManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthRoutes>
      <PersonalManagerSidebar>
        {children}
      </PersonalManagerSidebar>
    </AuthRoutes>
  );
}