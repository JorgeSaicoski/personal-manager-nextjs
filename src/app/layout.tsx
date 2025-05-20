import type { Metadata } from "next";
import "./globals.scss";
import { AuthProvider } from "@/context/AuthContext";


export const metadata: Metadata = {
  title: "Personal Task Manager",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}