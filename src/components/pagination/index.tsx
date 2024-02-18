import "./style.css";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { useState, useEffect, memo } from "react";

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
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState<number[]>([]);

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
  }, [totalCount, limit]);

  function handlePage(limit: number, totalCount: string | null) {
    if (Number(totalCount)) {
      const count = Number(totalCount);
      const result = Math.ceil(count / limit);

      setLastPage(result);
    }
  }

  useEffect(() => {
    console.log("lastPage", lastPage);
    const count = Number(totalCount);
    console.log("count", count);
    if (count) {
      const items: number[] = [];
      const indent = 1;

      console.log("count, lastPage", count, lastPage);

      let left = Math.max(currentPage - indent, 1);
      let right = Math.min(left + indent * 2, lastPage);

      left = Math.max(right - indent * 2, 1);

      console.log("left, right", left, right);

      if (left > 1) items.push(1);

      for (let i = left; i <= right; i++) {
        items.push(i);
      }

      if (right < lastPage) items.push(lastPage);

      setPages(items);
    }
  }, [currentPage, totalCount, lastPage]);

  const handleOffset = (page: number) => {
    setOffset(page - 1);
    setCurrentPage(page);
  };

  return (
    <div className="Pagination">
      {/* <button
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
      </button> */}

      <ul className="Pagination-list">
        {pages.length !== 0 &&
          pages.map((item) => {
            return (
              <li
                className={currentPage === item ? "Pagination-item-focus" : ""}
                onClick={() => handleOffset(item)}
              >
                {item}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default memo(Pagination);
