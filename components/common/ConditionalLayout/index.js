"use client"; // Ensure this is a client component

import { usePathname } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const noHeaderFooterRoutes = ["/login", "/signup"];

  return (
    <>
      <ToastContainer />
      {!noHeaderFooterRoutes.includes(pathname) && <Header />}
      {children}
      {!noHeaderFooterRoutes.includes(pathname) && <Footer />}
    </>
  );
}
