"use client";

import Image from "next/image";
import Link from "next/link";
import { CiCirclePlus, CiLink } from "react-icons/ci";

const LinkClick = ({ link, page }) => {
  console.log(link);

  const funct = async () => {
    const a = await fetch(`/api/clicks?url=${link.key}&page=${page.uri}`, {
      method: "GET",
    });
    console.log(a);
  };

  return (
    <>
      <Link
        onClick={funct}
        key={link.url}
        target="_blank"
        className="bg-indigo-800 rounded-md m-4 flex"
        href={link.url}
      >
        <div className="relative -left-4 overflow-hidden w-16">
          <div className="w-12 h-12 bottom-2 right-2 p-2 bg-white rounded-full shadow-md cursor-pointer">
            {/* <div className="w-12 h-12 rounded-full border bg-blue-700 relative flex items-center justify-center"> */}
            {link.icon && (
              <Image
                className="w-full h-full object-cover"
                src={link.icon}
                alt={"icon"}
                width={32}
                height={32}
              />
            )}
            {!link.icon && (
              <div>
                <CiLink color="black" size="32px" />
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full items-center justify-between mx-4 shrink grow-0 overflow-hidden">
          <h3 className="text-xl">{link.title}</h3>
          <button>
            <CiCirclePlus size="20px" />
          </button>
        </div>
      </Link>
    </>
  );
};

export default LinkClick;
