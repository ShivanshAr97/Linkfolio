"use client";

import { ReactSortable } from "react-sortablejs";
import { useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "../Buttons/Submit";
import { savePageButtons } from "@/actions/action";

export const allButtons = [
  {
    key: "email",
    label: "e-mail",
    icon: "faEnvelope",
    placeholder: "test@example.com",
  },
  {
    key: "mobile",
    label: "mobile",
    icon: "faMobile",
    placeholder: "+46 123 123 123",
  },
  {
    key: "instagram",
    label: "instagram",
    icon: "faInstagram",
    placeholder: "https://facebook.com/profile/...",
  },
  { key: "facebook", label: "facebook", icon: "faFacebook" },
  { key: "discord", label: "discord", icon: "faDiscord" },
  { key: "tiktok", label: "tiktok", icon: "faTiktok" },
  { key: "youtube", label: "youtube", icon: "faYoutube" },
  { key: "whatsapp", label: "whatsapp", icon: "faWhatsapp" },
  { key: "github", label: "github", icon: "faGithub" },
  { key: "telegram", label: "telegram", icon: "faTelegram" },
];

function upperFirst(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export default function PageButtonsForm({ page, user }) {
  console.log({ page, user });
  // const pageSavedButtonsKeys = Object.keys(page.buttons);
  // const pageSavedButtonsInfo = pageSavedButtonsKeys.map((k) =>
  //   allButtons.find((b) => b.key === k)
  // );
  // const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);

  // function addButtonToProfile(button) {
  //   setActiveButtons((prevButtons) => {
  //     return [...prevButtons, button];
  //   });
  // }

  // async function saveButtons(formData) {
  //   await savePageButtons(formData);
  //   toast.success("Settings saved!");
  // }

  // function removeButton({ key: keyToRemove }) {
  //   setActiveButtons((prevButtons) => {
  //     return prevButtons.filter((button) => button.key !== keyToRemove);
  //   });
  // }

  // const availableButtons = allButtons.filter(
  //   (b1) => !activeButtons.find((b2) => b1.key === b2.key)
  // );

  return (
    <>
      {/* <p>dh</p> */}
      {/* <form action={saveButtons}>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <ReactSortable
          handle=".handle"
          list={activeButtons}
          setList={setActiveButtons}
        >
          {activeButtons.map((b) => (
            <div key={b.key} className="mb-4 md:flex items-center">
              <div className="w-56 flex h-full text-gray-700 p-2 gap-2 items-center">
                <span>{upperFirst(b.label)}:</span>
              </div>
              <div className="grow flex">
                <input
                  placeholder={b.placeholder}
                  name={b.key}
                  defaultValue={page.buttons[b.key]}
                  type="text"
                  style={{ marginBottom: "0" }}
                />
                <button
                  onClick={() => removeButton(b)}
                  type="button"
                  className="py-2 px-4  bg-gray-300 cursor-pointer"
                ></button>
              </div>
            </div>
          ))}
        </ReactSortable>
        <div className="flex flex-wrap gap-2 mt-4 border-y py-4">
          {availableButtons.map((b) => (
            <button
              key={b.key}
              type="button"
              onClick={() => addButtonToProfile(b)}
              className="flex items-center gap-1 p-2 bg-gray-200"
            >
              <span className="">{upperFirst(b.label)}</span>
            </button>
          ))}
        </div>
        <div className="max-w-xs mx-auto mt-8">
          <SubmitButton>
            <span>Save</span>
          </SubmitButton>
        </div>
      </form> */}
    </>
  );
}
