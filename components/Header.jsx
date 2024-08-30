import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Logout from "./Buttons/Logout";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold text-gray-800">
          <Link href={"/"}>LinkFolio</Link>
        </div>
        <nav className="flex  items-center align-middle space-x-6 text-gray-600">
          <Link href={"/about"} className="hover:text-gray-900 transition duration-300">About</Link>
          <Link href={"/contact"} className="hover:text-gray-900 transition duration-300">Contact</Link>
          {!session ? (
            <>
              <Link href={"/login"} className="hover:text-gray-900 transition duration-300">Sign In</Link>
              <Link href={"/register"} className="hover:text-gray-900 transition duration-300">Create account</Link>
            </>
          ) : (
            <>
              <Link href={"/account"} className="hover:text-gray-900 transition duration-300">
                Hello, <span className="font-bold"> {session?.user?.name}</span>
              </Link>
              <Logout />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
