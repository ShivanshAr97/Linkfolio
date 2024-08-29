"use client";
import { savePageSettings } from "@/actions/action";
import { upload } from "@/libs/upload";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import RadioTogglers from "./RadioTogglers";
import SubmitButton from "../Buttons/Submit";

export default function PageSettingsForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [avatar, setAvatar] = useState(user?.image);
  async function saveBaseSettings(formData) {
    const result = await savePageSettings(formData);
    if (result) {
      toast.success("Saved!");
    }
  }

  async function handleCoverImageChange(ev) {
    await upload(ev, (link) => {
      setBgImage(link);
    });
  }
  async function handleAvatarImageChange(ev) {
    await upload(ev, (link) => {
      setAvatar(link);
    });
  }
  return (
    <div className="p-4 max-w-[82rem] mx-auto">
      <form action={saveBaseSettings} className="space-y-3">
        <div
          className="relative min-h-[250px] border flex flex-col justify-center items-center bg-cover bg-center rounded-lg overflow-hidden shadow-lg"
          style={
            bgType === "color"
              ? { backgroundColor: bgColor }
              : { backgroundImage: `url(${bgImage})` }
          }
        >
          <div className="border bg-white opacity-80 m-4 top-0 right-0 rounded-md absolute">
            <div className="px-4 text-gray-700 rounded-lg">
              <RadioTogglers
                defaultValue={page.bgType}
                options={[
                  { value: "color", label: "Color" },
                  { value: "image", label: "Image" },
                ]}
                onChange={(val) => setBgType(val)}
              />
            </div>
            {bgType === "color" && (
              <div className=" text-gray-700 px-4  rounded-lg">
                <div className="flex items-center gap-2">
                  <span>Background color:</span>
                  <input
                    type="color"
                    name="bgColor"
                    onChange={(ev) => setBgColor(ev.target.value)}
                    defaultValue={page.bgColor}
                    className="w-8 h-8 border-none rounded-full cursor-pointer"
                  />
                </div>
              </div>
            )}
            {bgType === "image" && (
              <div className="flex justify-center mt-2">
                <label className=" px-4 flex cursor-pointer">
                  <input type="hidden" name="bgImage" value={bgImage} />
                  <input
                    type="file"
                    onChange={handleCoverImageChange}
                    className="hidden"
                  />
                  <span className="">Change image</span>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            <div className="overflow-hidden h-full rounded-full border-4 border-white shadow-lg">
              <Image
                className="w-full h-full object-cover"
                src={avatar}
                alt="avatar"
                width={128}
                height={128}
              />
            </div>
            <label
              htmlFor="avatarIn"
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer"
            >
              <span className="text-blue-600">Edit</span>
            </label>
            <input
              onChange={handleAvatarImageChange}
              id="avatarIn"
              type="file"
              className="hidden"
            />
            <input type="hidden" name="avatar" value={avatar} />
          </div>
        </div>

        <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
          <div>
            <label
              className="block font-semibold text-gray-700"
              htmlFor="nameIn"
            >
              Display name
            </label>
            <input
              type="text"
              id="nameIn"
              name="displayName"
              defaultValue={page.displayName}
              placeholder="John Doe"
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              className="block font-semibold text-gray-700"
              htmlFor="locationIn"
            >
              Location
            </label>
            <input
              type="text"
              id="locationIn"
              name="location"
              defaultValue={page.location}
              placeholder="Somewhere in the world"
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              className="block font-semibold text-gray-700"
              htmlFor="bioIn"
            >
              Bio
            </label>
            <textarea
              name="bio"
              id="bioIn"
              defaultValue={page.bio}
              placeholder="Your bio goes here..."
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="flex justify-center">
            <SubmitButton className="bg-blue-600 w-fit text-white px-32 py-2 rounded-md shadow-md hover:bg-blue-700 transition">
              <span>Save</span>
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}
