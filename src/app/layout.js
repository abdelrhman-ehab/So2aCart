import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/Footer/Footer";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import UserContextProvider from "@/Context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SoCart",
  description: "E-Commerce Site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <UserContextProvider>
            <Navbar />
            <div className="container my-7">
              {children}
              <Toaster />
            </div>
            <Footer />
          </UserContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
