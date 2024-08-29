"use client";
import { savePageLinks } from "@/actions/action";
import { upload } from "@/libs/upload";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import SubmitButton from "../Buttons/Submit";
import { MdOutlineDragIndicator } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import { CiLink } from "react-icons/ci";

export default function PageLinksForm({ page, user }) {
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoSelect = (logo) => {
    setSelectedLogo(logo);
    setIsModalOpen(false);
    updateLinkIcon(logo, l.key); // Function to update the icon in your list
  };
  const [links, setLinks] = useState(page.links || []);
  async function save() {
    await savePageLinks(links);
    toast.success("Saved!");
  }
  function addNewLink() {
    setLinks((prev) => {
      return [
        ...prev,
        {
          key: Date.now().toString(),
          title: "",
          icon: "",
          url: "",
        },
      ];
    });
  }
  function handleUpload(ev, linkKeyForUpload) {
    upload(ev, (uploadedImageUrl) => {
      setLinks((prevLinks) => {
        const newLinks = [...prevLinks];
        newLinks.forEach((link, index) => {
          if (link.key === linkKeyForUpload) {
            link.icon = uploadedImageUrl;
          }
        });
        return newLinks;
      });
    });
  }
  function handleLinkChange(keyOfLinkToChange, prop, ev) {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[prop] = ev.target.value;
        }
      });
      return [...prev];
    });
  }
  function removeLink(linkKeyToRemove) {
    setLinks((prevLinks) =>
      [...prevLinks].filter((l) => l.key !== linkKeyToRemove)
    );
  }
  return (
    <form action={save} className="mx-auto max-w-[80rem]">
      <h2 className="text-3xl mt-6 font-bold">Links</h2>
      <h1 className="mt-4 mb-2 italic">
        Mostly added Links are YouTube, Instagram, GitHub, Linkedin, Facebook,
        Spotify, Medium and personal portfolios.
      </h1>
      <button
        onClick={addNewLink}
        type="button"
        className="text-blue-500 border rounded-lg border-blue-500 px-4 py-1 text-lg flex gap-2 items-center cursor-pointer"
      >
        <span>Add new</span>
      </button>

      <div>
        <ReactSortable handle={".handle"} list={links} setList={setLinks}>
          {links.map((l) => (
            <div
              key={l.key}
              className="mt-8 md:flex gap-6 items-center bg-white p-4 rounded-lg shadow-sm border"
            >
              <div className="handle cursor-move text-gray-400 mr-4">
                <span className="">
                  <MdOutlineDragIndicator size="20px" />
                </span>
              </div>
              <div className="text-center">
                <div className="bg-gray-300 relative aspect-square overflow-hidden w-16 h-16 inline-flex justify-center items-center rounded-lg shadow">
                  {l.icon ? (
                    <Image
                      className="w-full h-full object-cover"
                      src={l.icon}
                      alt="icon"
                      width={64}
                      height={64}
                    />
                  ) : (
                    <CiLink size="32px"/>
                  )}
                </div>
                <div className="mt-2 flex gap-2">
                  <input
                    onChange={(ev) => handleUpload(ev, l.key)}
                    id={"icon" + l.key}
                    type="file"
                    className="hidden"
                  />
                  <label
                    htmlFor={"icon" + l.key}
                    className="border p-2 flex items-center gap-1 text-gray-600 cursor-pointer rounded-md bg-gray-100 hover:bg-gray-200 transition mt-2 justify-center"
                  >
                    <span>
                      <FaExchangeAlt />
                    </span>
                  </label>
                  <button
                    onClick={() => removeLink(l.key)}
                    type="button"
                    className="w-full bg-red-100 text-red-600 py-2 px-3 mt-2 rounded-md shadow-sm flex gap-2 items-center justify-center hover:bg-red-200 transition"
                  >
                    <span>
                      <MdDeleteOutline />
                    </span>
                  </button>
                </div>
              </div>
              <div className="grow space-y-2">
                <label className="block text-gray-700 font-semibold">
                  Title:
                </label>
                <input
                  value={l.title}
                  onChange={(ev) => handleLinkChange(l.key, "title", ev)}
                  type="text"
                  placeholder="Title"
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <label className="block text-gray-700 font-semibold">
                  URL:
                </label>
                <input
                  value={l.url}
                  onChange={(ev) => handleLinkChange(l.key, "url", ev)}
                  type="text"
                  placeholder="URL"
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </ReactSortable>
      </div>

      <div className="border-t pt-4 mt-4">
        <SubmitButton className="bg-blue-600 text-white px-6 mb-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition max-w-xs mx-auto">
          <span>Save</span>
        </SubmitButton>
      </div>
    </form>
  );
}
