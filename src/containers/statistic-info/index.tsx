import LongSortList from "../../components/long-sort-list";
import Pagination from "../../components/pagination";
import ShortSortList from "../../components/short-sort-list";
import Table from "../../components/table";
import { useAppDispatch } from "../../store/redux-hook";
import "./style.css";
import { useState, useReducer, useEffect, useCallback } from "react";
import { getSortList } from "../../store/statistics/statistics-actions";
import { DataLinksInfo } from "../../types";

type SortReducer = {
  limit: number;
  offset: number;
  column: string;
  order: string;
};

type StatisticInfoProps = {
  token: string;
  links: DataLinksInfo;
};

const initialState: SortReducer = {
  limit: 5,
  offset: 0,
  column: "",
  order: "",
};

const headlines1 = {
  default: "По умолчанию",
  short: "По короткой ссылке",
  target: "По исходной ссылке",
  counter: "По переходам",
};
const headlines2 = {
  default: "По умолчанию",
  desc_: "По убыванию",
  asc_: "По возрастанию",
};

const headlines3 = [3, 5, 7];

function handlerSort(state: SortReducer, action: any) {
  switch (action.type) {
    case "LIMIT": {
      return { ...state, limit: action.payload };
    }
    case "OFFSET": {
      return { ...state, offset: action.payload };
    }
    case "COLUMN": {
      return { ...state, column: action.payload };
    }
    case "ORDER": {
      return { ...state, order: action.payload };
    }
    default:
      return state;
  }
}

function StatisticInfo({ token, links }: StatisticInfoProps) {
  const [currentId, setCurrentId] = useState(0);
  const [state, dispatch] = useReducer(handlerSort, initialState);

  const storeDispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      let resultOrder;
      if (state.column !== "" && state.order === "") {
        resultOrder = "desc_" + state.column;
      } else if (state.column === "" && state.order !== "") {
        resultOrder = state.order + "counter";
      } else if (state.order && state.column) {
        resultOrder = state.order + state.column;
      } else {
        resultOrder = "";
      }

      const data = {
        limit: state.limit,
        offset: state.offset * state.limit,
        order: resultOrder,
        token: token,
      };

      storeDispatch(getSortList(data));
    }
  }, [state, token, storeDispatch]);

  useEffect(() => {});
  const handleCurrentId = useCallback((id: number) => {
    setCurrentId(id);
  }, []);

  return (
    <div className="Statistic-info">
      <Table links={links}>
        <LongSortList
          headlines={headlines1}
          defaultTitle={headlines1.default}
          sendId={handleCurrentId}
          currentId={currentId}
          id={0}
          dispatch={dispatch}
        />
        <LongSortList
          headlines={headlines2}
          defaultTitle={headlines2.default}
          sendId={handleCurrentId}
          currentId={currentId}
          id={1}
          dispatch={dispatch}
        />
        <ShortSortList
          headlines={headlines3}
          defaultTitle={initialState.limit}
          sendId={handleCurrentId}
          currentId={currentId}
          id={2}
          title="Показать на странице"
          dispatch={dispatch}
        />
      </Table>
      <Pagination
        sendId={handleCurrentId}
        currentId={currentId}
        id={3}
        dispatch={dispatch}
        totalCount={links.totalCount}
        limit={state.limit}
      />
    </div>
  );
}

export default StatisticInfo;
