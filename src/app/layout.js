import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Import the AuthProvider from your context folder
import { AuthProvider } from "@/context/AuthContext"; 
import ApiProvider from "@/context/ApiContext";
import { ToastProvider } from "@/context/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const myName = process.env.NEXT_PUBLIC_NAME;

export const metadata = {
  title: `${myName} Portfolio`,
  description: "This is my portfolio website",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* 2. Wrap children with AuthProvider to share auth state globally */}
        <AuthProvider>
          <ToastProvider>
            <ApiProvider>
              {children}
            </ApiProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}