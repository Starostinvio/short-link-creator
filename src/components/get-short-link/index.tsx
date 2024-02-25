import "./style.css";
import { useAppDispatch } from "../../store/redux-hook";
import { getShortLink } from "../../store/short-link/short-link-actions";
import { ReactNode, useState } from "react";
import { CiLink } from "react-icons/ci";
import { HiOutlineLink } from "react-icons/hi";

interface GetShortLinkProps {
  token: string;
  children?: ReactNode;
}

function GetShortLink({ token, children }: GetShortLinkProps) {
  const [url, setUrl] = useState("");

  const dispatch = useAppDispatch();
  const handleGetShortLink = () => {
    if (token) {
      dispatch(getShortLink({ url, token }));
    }
  };

  const handleGetUrl = (url: string) => {
    setUrl(url);
  };
  return (
    <div className="GetShortLink">
      {/* <input
        className="GetShortLink-field"
        onChange={(e) => handleGetUrl(e.target.value)}
        placeholder="Введите ссылку"
      ></input> */}
      <div className="GetShortLink-field-box">
        <input
          className="GetShortLink-field"
          onChange={(e) => handleGetUrl(e.target.value)}
          placeholder="Введите ссылку"
        ></input>
        <div className="GetShortLink-shorten-box mobile">
          <button
            className="GetShortLink-shorten"
            onClick={() => handleGetShortLink()}
          >
            <HiOutlineLink className="GetShortLink-shorten-icon" />
          </button>
        </div>
      </div>
      <button
        className="GetShortLink-shorten desktop"
        onClick={() => handleGetShortLink()}
      >
        Сократить
      </button>
      <div className="GetShortLink-shortLink">{children}</div>
    </div>
  );
}

export default GetShortLink;
