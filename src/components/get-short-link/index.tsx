import "./style.css";
import { useAppDispatch } from "../../store/redux-hook";
import { getShortLink } from "../../store/short-link/short-link-actions";
import { ReactNode, useState, useEffect } from "react";
import { HiOutlineLink } from "react-icons/hi";
import { VscClose } from "react-icons/vsc";
import { clearShortLink } from "../../store/short-link/short-link-slice";

interface GetShortLinkProps {
  token: string;
  children?: ReactNode;
  targetUrl: String | undefined;
}

function GetShortLink({ token, children, targetUrl }: GetShortLinkProps) {
  const [url, setUrl] = useState<string>("");
  const [toggleIcon, setToggleIcon] = useState(false);

  const dispatch = useAppDispatch();
  const handleGetShortLink = () => {
    if (token) {
      dispatch(getShortLink({ url, token }));
    }
  };

  useEffect(() => {
    if (targetUrl) {
      setUrl(String(targetUrl));
      setToggleIcon(true);
    }
  }, [targetUrl]);

  const handleGetUrl = (url: string) => {
    setUrl(url);
  };

  const handleRemoveUrl = () => {
    setUrl("");
    dispatch(clearShortLink());
    setToggleIcon(false);
  };
  return (
    <div className="GetShortLink">
      <div className="GetShortLink-field-box">
        <input
          className="GetShortLink-field"
          onChange={(e) => handleGetUrl(e.target.value)}
          placeholder="Введите ссылку"
          value={url}
        ></input>
        <div className="GetShortLink-shorten-box mobile">
          {toggleIcon ? (
            <button
              className="GetShortLink-shorten-remove"
              onClick={() => handleRemoveUrl()}
            >
              <VscClose className="GetShortLink-shorten-icon" />
            </button>
          ) : (
            <button
              className="GetShortLink-shorten"
              onClick={() => handleGetShortLink()}
            >
              <HiOutlineLink className="GetShortLink-shorten-icon" />
            </button>
          )}
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
