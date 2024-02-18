import { ReactComponentElement, ReactNode, useEffect, useState } from "react";
import "./style.css";
import { ShortLinkInfo } from "../../types";
import { DataLinksInfo } from "../../types";

interface TableProps {
  children: ReactNode;
  links: DataLinksInfo;
  pagination: () => ReactNode;
}

function Table({ children, links, pagination }: TableProps) {
  const [listLinks, setListLinks] = useState<ShortLinkInfo[]>([]);

  useEffect(() => {
    setListLinks(links.list);
  }, [links]);
  return (
    <div className="Table">
      <div className="Table-panel">
        <div className="Table-panel-sort">{children}</div>
        <ul className="Table-panel-caption">
          <li className="Table-panel-rows-title short">Краткая ссылка</li>
          <li className="Table-panel-rows-title">Исходная ссылка</li>
          <li className="Table-panel-rows-title count">Переходы</li>
        </ul>
        <div className="Table-panel-rows-box">
          {listLinks.length > 0 &&
            listLinks.map((item) => {
              return (
                <ul className="Table-panel-rows" key={item.id}>
                  <li className="Table-panel-rows-item short">{item.short}</li>
                  <li className="Table-panel-rows-item">{item.target}</li>
                  <li className="Table-panel-rows-item count">
                    {item.counter}
                  </li>
                </ul>
              );
            })}
        </div>
        {/* <div className="Table-panel-pagination-mob">{pagination()}</div> */}
      </div>
    </div>
  );
}

export default Table;
