import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { Event } from "@/models/Event";
import mongoose from "mongoose";
import { btoa } from "next/dist/compiled/@edge-runtime/primitives";
import Image from "next/image";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import { CiLink } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { FaShareAlt } from "react-icons/fa";

function buttonLink(key, value) {
  if (key === "mobile") {
    return "tel:" + value;
  }
  if (key === "email") {
    return "mailto:" + value;
  }
  return value;
}
export default async function UserPage({ params }) {
  const uri = params.uri;
  await mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ uri });
  // console.log(page);

  if (!page) {
    return (
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <h1 className="text-3xl">Page Not Found</h1>
      </div>
    );
  }

  // Find the user by email
  const user = await User.findOne({ email: page.owner });

  // Handle case where the user is not found
  if (!user) {
    return (
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <h1 className="text-3xl">User Not Found</h1>
      </div>
    );
  }

  await Event.create({ uri: uri, page: uri, type: "view" });

  return (
    <div className="bg-white text-black min-h-screen">
      <Link href={`${process.env.URL}`}><button className="fixed bottom-4 left-1/2 transform -translate-x-1/2 border border-black bg-blue-400 rounded-lg items-center justify-center z-10 p-2">
        Try LinkFolio now!
      </button></Link>
      <button className="border flex gap-2  bg-blue-400 absolute top-60 left-[90%] rounded-lg items-center justify-center z-10 p-2">
        <span>Share</span>
        <FaShareAlt />
      </button>
      <div
        className="h-60 bg-gray-400 bg-cover bg-center -z-10 opacity-80"
        style={
          page.bgType === "color"
            ? { backgroundColor: page.bgColor }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      ></div>
      <div className="w-36 h-36 mx-auto relative -top-20 -mb-16">
        <Image
          className="rounded-full w-full h-full object-cover"
          src={user.image}
          alt="avatar"
          width={256}
          height={256}
        />
      </div>
      {/* <QRCodeCanvas value="https://reactjs.org/" /> */}
      <h2 className="text-2xl text-center mb-1">{page.displayName}</h2>
      <h3 className="text-md flex gap-2 justify-center items-center ">
        <span>{page.location}</span>
      </h3>
      <div className="max-w-xs mx-auto text-center my-2">{page.bio}</div>
      <div className="flex gap-2 justify-center mt-4 pb-4">
        {Object.keys(page.buttons).map((buttonKey) => (
          <Link
            key={buttonKey}
            href={buttonLink(buttonKey, page.buttons[buttonKey])}
            className="rounded-full bg-white text-blue-950 p-2 flex items-center justify-center"
          ></Link>
        ))}
      </div>
      <div className="max-w-2xl mx-auto text-white p-2 px-8">
        {page.links.map((link) => (
          <Link
            ping={
              process.env.URL +
              "api/click?url=" +
              btoa(link.url) +
              "&page=" +
              page.uri
            }
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
        ))}
      </div>
    </div>
  );
}
