import "./style.css";

import { useState, useRef, memo, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface ShortSortListProps {
  headlines: (string | number)[];
  defaultTitle: string | number;
  sendId: (id: number) => void;
  currentId: number;
  id: number;
  title: string;
  dispatch: ({ type, payload }: { type: string; payload: number }) => void;
}

function ShortSortList({
  headlines,
  defaultTitle,
  sendId,
  currentId,
  id,
  title,
  dispatch,
}: ShortSortListProps) {
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(5);

  const [mainTitle, setMainTitle] = useState<string | number>(defaultTitle);
  const headlinesRef = useRef(headlines);

  useEffect(() => {
    dispatch({ type: "LIMIT", payload: limit });
  }, [limit]);

  const handleSelectTitle = (selectTitle: string | number) => {
    if (typeof selectTitle === "number") {
      setLimit(selectTitle);
    }
    setMainTitle(selectTitle);
    sendId(id);
  };

  const handleOpenList = () => {
    sendId(id);
    setOpen((state) => !state);
  };

  useEffect(() => {
    if (currentId !== id) {
      setOpen(false);
    }
  }, [currentId]);

  return (
    <div className="ShortSortList">
      <div>{title}</div>
      <div
        className={open ? "ShortSortList-box active" : "ShortSortList-box"}
        onClick={() => handleOpenList()}
      >
        {mainTitle}
        <IoIosArrowDown className="ShortSortList-icon" />
        {open && (
          <ul className="ShortSortList-panel">
            {headlinesRef.current.map((item) => {
              return <li onClick={(e) => handleSelectTitle(item)}>{item}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default memo(ShortSortList);
