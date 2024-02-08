import { useAppDispatch } from "../../store/redux-hook";
import { getShortLink } from "../../store/short-link/short-link-actions";
import "./style.css";
import { useState } from "react";

interface GetShortLinkProps {
  token: string;
}

function GetShortLink({ token }: GetShortLinkProps) {
  const [url, setUrl] = useState("");

  const dispatch = useAppDispatch();
  const handleGetShortLink = () => {
    console.log("token get-short-link", token);
    if (token) {
      dispatch(getShortLink({ url, token }));
    }
  };

  const handleGetUrl = (url: string) => {
    setUrl(url);
  };
  return (
    <div className="GetShortLink">
      <input
        className="GetShortLink-field"
        onChange={(e) => handleGetUrl(e.target.value)}
        placeholder="Введите ссылку, которую нужно сократить"
      ></input>
      <button
        className="GetShortLink-shorten"
        onClick={() => handleGetShortLink()}
      >
        Сократить
      </button>
    </div>
  );
}

export default GetShortLink;
