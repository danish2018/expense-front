"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserDropdown from "../../section/UserDropdown";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    window?.localStorage.setItem("auth-app", session?.user?.token);
  }, [!!session]);

  const handleUserLogout = async () => {
    try {
      // Sign out from the app
      await signOut({ redirect: false });

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error(error);

      // If you want to display an error message using a toast service:
      // toastService.error((error as Error).message);
    }
  };

  return (
    <header className="bg-green-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="md:ms-10">
          <Link href="/">
            <Image
              src="/images/1724052368614.png"
              width={130}
              height={50}
              alt=""
            />
          </Link>
        </div>

        <nav className="flex space-x-6 md:me-10">
          <UserDropdown handleUserLogout={handleUserLogout} />
          {/* <Link href="/">
            <div className="text-gray-700 hover:text-gray-900">Home</div>
          </Link>
          <Link href="/about">
            <div className="text-gray-700 hover:text-gray-900">About</div>
          </Link>
          <Link href="/services">
            <div className="text-gray-700 hover:text-gray-900">Services</div>
          </Link>
          <Link href="/contact">
            <div className="text-gray-700 hover:text-gray-900">Contact</div>
          </Link> */}
        </nav>
        {/* <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div> */}
      </div>
      {/* {isOpen && (
        <div className="md:hidden">
          <nav className="px-2 pt-2 pb-4 space-y-1">
            <Link href="/">
              <div className="block text-gray-700 hover:text-gray-900">Home</div>
            </Link>
            <Link href="/about">
              <div className="block text-gray-700 hover:text-gray-900">About</div>
            </Link>
            <Link href="/services">
              <div className="block text-gray-700 hover:text-gray-900">
                Services
              </div>
            </Link>
            <Link href="/contact">
              <div className="block text-gray-700 hover:text-gray-900">Contact</div>
            </Link>
          </nav>
        </div>
      )} */}
    </header>
  );
}
