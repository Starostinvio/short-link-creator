import "./style.css";
import { ShortLinkInfo } from "../../types";
import ClipboardJS from "clipboard";
import { useEffect } from "react";
import { BsCopy } from "react-icons/bs";
import { HiMiniArrowUpTray } from "react-icons/hi2";
import { BsQrCode } from "react-icons/bs";
import { RiShareForward2Fill } from "react-icons/ri";
import { RiShareForwardFill } from "react-icons/ri";
import { IoCopy } from "react-icons/io5";
import { IoCopyOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";

interface ShortLinkPanelProps {
  shortUrl: ShortLinkInfo;
}
function ShortLinkPanel({ shortUrl }: ShortLinkPanelProps) {
  const handleClick = () => {
    const textToCopy = `https://front-test.hex.team/s/${shortUrl.short}`;

    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const success = document.execCommand("copy");
      if (success) {
        console.log("Текст скопирован: ", textToCopy);
      } else {
        console.error("Ошибка копирования");
      }
    } catch (err) {
      console.error("Ошибка копирования: ", err);
    } finally {
      document.body.removeChild(textarea);
    }
  };

  useEffect(() => {
    const clipboard = new ClipboardJS(".ShortLinkPanel-title", {
      text: () => `https://front-test.hex.team/s/${shortUrl.short}`,
    });

    return () => clipboard.destroy();
  }, [shortUrl]);

  return (
    <div className="ShortLinkPanel">
      <ul className="ShortLinkPanel-icons-list">
        <li className="ShortLinkPanel-icon-box1">
          <RiShareForwardFill className="ShortLinkPanel-icon" />
        </li>
        <li className="ShortLinkPanel-icon-box2">
          <MdContentCopy className="ShortLinkPanel-icon" />
        </li>
        <li className="ShortLinkPanel-icon-box3">
          <BsQrCode className="ShortLinkPanel-icon" />
        </li>
      </ul>
      <div className="ShortLinkPanel-link-box">
        <button className="ShortLinkPanel-title" onClick={() => handleClick()}>
          {/* {`https://front- test.hex.team/s/${shortUrl.short}`} */}
          {`hex.team/s/${shortUrl.short}`}
        </button>
      </div>
    </div>
  );
}

export default ShortLinkPanel;
