import "./style.css";
import { useState, useRef, memo, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import React from "react";
interface LongSortListProps {
  headlines: string[];
  defaultTitle: string;
  sendId: (id: number) => void;
  currentId: number;
  id: number;
  dispatch: ({}) => void;
}

function LongSortList({
  headlines,
  defaultTitle,
  sendId,
  currentId,
  id,
  dispatch,
}: LongSortListProps) {
  const [open, setOpen] = useState(false);
  const [mainTitle, setMainTitle] = useState(defaultTitle);
  const headlinesRef = useRef(headlines);

  useEffect(() => {
    id === 0 && dispatch({ type: "COLUMN", payload: mainTitle });
    id === 1 && dispatch({ type: "ORDER", payload: mainTitle });
  }, [mainTitle]);

  const handleSelectTitle = (selectTitle: string) => {
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
    <div
      className={open ? "SortList active" : "SortList"}
      onClick={() => handleOpenList()}
    >
      {mainTitle}
      <IoIosArrowDown className="SortList-icon" />
      {open && (
        <ul className="SortList-panel">
          {headlinesRef.current.map((item) => {
            return <li onClick={(e) => handleSelectTitle(item)}>{item}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

export default memo(LongSortList);
