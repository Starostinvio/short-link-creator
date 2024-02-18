import "./style.css";
import { useState, useRef, memo, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface LongSortListProps {
  headlines: { [key: string]: string };
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
  const headlinesRef = useRef(Object.values(headlines));

  const handleSelectTitle = (selectTitle: string) => {
    setMainTitle(selectTitle);

    let resultSortValue: string = "";
    for (let key in headlines) {
      if (
        headlines[key as keyof typeof headlines] === selectTitle &&
        key !== "default"
      ) {
        resultSortValue = key;
      }
    }
    id === 0 && dispatch({ type: "COLUMN", payload: resultSortValue });
    id === 1 && dispatch({ type: "ORDER", payload: resultSortValue });

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
