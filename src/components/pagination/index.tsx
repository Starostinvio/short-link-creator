import "./style.css";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { useState, useEffect } from "react";

type PaginationProps = {
  sendId: (id: number) => void;
  currentId: number;
  id: number;
  dispatch: ({ type, payload }: { type: string; payload: number }) => void;
  totalCount: string | null;
  limit: number;
};

function Pagination({
  sendId,
  currentId,
  id,
  dispatch,
  totalCount,
  limit,
}: PaginationProps) {
  const [offset, setOffset] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    if (totalCount) {
      handlePage(limit, totalCount);
    }
    dispatch({ type: "OFFSET", payload: offset });
  }, [offset]);

  useEffect(() => {
    if (totalCount) {
      handlePage(limit, totalCount);
    }
  }, [totalCount]);

  function handlePage(limit: number, totalCount: string | null) {
    if (Number(totalCount)) {
      const count = Number(totalCount);
      const result = Math.ceil(count / limit);

      setTotalPage(result);
    }
  }

  const handleOffsetPlus = () => {
    sendId(id);

    if (offset + 1 < totalPage) {
      setOffset((state) => state + 1);
    }
  };

  const handleOffsetMinus = () => {
    sendId(id);
    if (offset > 0) {
      setOffset((state) => state - 1);
    }
  };

  return (
    <div className="Pagination">
      <button
        className="Pagination-item-one"
        onClick={() => handleOffsetMinus()}
      >
        <SlArrowLeft />
      </button>
      <div className="Pagination-page">{offset + 1}</div>
      <button
        className="Pagination-item-two"
        onClick={() => handleOffsetPlus()}
      >
        <SlArrowRight />
      </button>
    </div>
  );
}

export default Pagination;
