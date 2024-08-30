"use client";

import { useState } from "react";
import {
  WhatsappShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CiCircleCheck } from "react-icons/ci";
import { QRCodeCanvas } from "qrcode.react";
import { FaShareAlt } from "react-icons/fa";

const Share = ({ user }) => {
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  return (
    <>
      <div>
        <div className="flex items-center align-middle gap-2 mx-auto cursor-pointer" onClick={() => setShowShareOptions(!showShareOptions)}>
          Share <FaShareAlt />
        </div>
        {showShareOptions && (
          <div className="my-2 w-[10rem]">
            <QRCodeCanvas value={`https://linkfolio-teal.vercel.app/${user}`} />

            <CopyToClipboard
              text={`https://linkfolio-teal.vercel.app/${user}`}
              onCopy={() => setCopied(true)}
            >
              <button className="mt-2 font-semibold">Copy to clipboard</button>
            </CopyToClipboard>

            {copied ? <span style={{ display:"flex", gap:4, textAlign:"center",color: "black" }}>Copied<CiCircleCheck size="20"/></span> : null}
<div className="gap-4 flex my-2">

            <TwitterShareButton
              url={`https://linkfolio-teal.vercel.app/${user}`}
              title="Found out an amazing profile on LinkFolio"
              >
              <TwitterIcon size={40} />
            </TwitterShareButton>
            <WhatsappShareButton
              url={`https://linkfolio-teal.vercel.app/${user}`}
              title="Found out an amazing profile on LinkFolio"
              >
              <WhatsappIcon size={40} />
            </WhatsappShareButton>
          </div>
              </div>
        )}
      </div>
    </>
  );
};

export default Share;
