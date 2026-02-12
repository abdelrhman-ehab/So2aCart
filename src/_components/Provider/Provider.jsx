"use client"
import "../../app/globals.css";
import Navbar from "@/_components/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/_components/Footer/Footer";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import UserContextProvider from "@/Context/UserContext";
import { SessionProvider } from "next-auth/react";

export default function Provider({ children }) {
    return <>
        <SessionProvider>
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
        </SessionProvider>

    </>
}
