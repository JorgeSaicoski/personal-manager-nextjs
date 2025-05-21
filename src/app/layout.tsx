import type { Metadata } from "next";
import "./globals.scss";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";


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
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}