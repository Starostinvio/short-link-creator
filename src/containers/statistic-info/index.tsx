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

type SortReducerAction =
  | { type: "LIMIT"; payload: number }
  | { type: "OFFSET"; payload: number }
  | { type: "COLUMN"; payload: string }
  | { type: "ORDER"; payload: string };

type StatisticInfoProps = {
  token: string;
  links: DataLinksInfo;
};

const initialState: SortReducer = {
  limit: 5,
  offset: 0,
  column: "По умолчанию",
  order: "По умолчанию",
};

const headlines1 = [
  "По умолчанию",
  "По короткой ссылке",
  "По исходной ссылке",
  "По переходам",
];

const headlines2 = ["По умолчанию", "По убыванию", "По возрастанию"];
const headlines3 = [1, 2, 3, 4, 5];

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
    let order;
    if (state.order === "По умолчанию") {
      order = "";
    } else if (state.order === "По убыванию") {
      order = "desc_";
    } else if (state.order === "По возрастанию") {
      order = "asc_";
    }
    let column;
    if (state.column === "По умолчанию") {
      column = "";
    } else if (state.column === "По короткой ссылке") {
      column = "short";
    } else if (state.column === "По исходной ссылке") {
      column = "target";
    } else if (state.column === "По переходам") {
      column = "counter";
    }

    let resultOrder;
    if (column !== "" && order === "") {
      resultOrder = "desc_" + column;
    } else if (column === "" && order !== "") {
      resultOrder = order + "counter";
    } else if (order && column) {
      resultOrder = order + column;
    } else {
      resultOrder = "";
    }

    const data = {
      limit: state.limit,
      offset: state.offset * state.limit,
      order: resultOrder,
      token: token,
    };

    if (token) {
      storeDispatch(getSortList(data));
    }
  }, [state]);

  const handleCurrentId = useCallback((id: number) => {
    setCurrentId(id);
  }, []);

  return (
    <Table links={links}>
      <LongSortList
        headlines={headlines1}
        defaultTitle="По умолчанию"
        sendId={handleCurrentId}
        currentId={currentId}
        id={0}
        dispatch={dispatch}
      />
      <LongSortList
        headlines={headlines2}
        defaultTitle="По умолчанию"
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
      <Pagination
        sendId={handleCurrentId}
        currentId={currentId}
        id={3}
        dispatch={dispatch}
        totalCount={links.totalCount}
        limit={state.limit}
      />
    </Table>
  );
}

export default StatisticInfo;
