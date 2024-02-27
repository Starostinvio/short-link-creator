import "./style.css";
import { ShortLinkInfo } from "../../types";
import ClipboardJS from "clipboard";
import { useEffect } from "react";
import { BsQrCode } from "react-icons/bs";
import { RiShareForwardFill } from "react-icons/ri";
import { MdContentCopy } from "react-icons/md";
import { IoLink } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface ShortLinkPanelProps {
  shortUrl: ShortLinkInfo;
}
function ShortLinkPanel({ shortUrl }: ShortLinkPanelProps) {
  const navigate = useNavigate();
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

  const handleMovingTheLink = () => {
    window.location.assign(`https://front-test.hex.team/s/${shortUrl.short}`);
  };

  return (
    <div className="ShortLinkPanel">
      <ul className="ShortLinkPanel-icons-list">
        <li className="ShortLinkPanel-icon-box1">
          <RiShareForwardFill className="ShortLinkPanel-icon" />
        </li>
        <li className="ShortLinkPanel-icon-box2" onClick={() => handleClick()}>
          <MdContentCopy className="ShortLinkPanel-icon" />
        </li>
        <li className="ShortLinkPanel-icon-box3">
          <BsQrCode className="ShortLinkPanel-icon" />
        </li>
      </ul>
      <div className="ShortLinkPanel-link-box">
        <button
          className="ShortLinkPanel-title"
          onClick={() => handleMovingTheLink()}
        >
          <IoLink className="ShortLinkPanel-title-icon" />
          {`hex.team/s/${shortUrl.short}`}
        </button>
      </div>
    </div>
  );
}

export default ShortLinkPanel;
