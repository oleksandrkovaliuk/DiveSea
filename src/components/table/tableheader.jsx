import React from "react";
import t from "./table.module.scss";

export const TableHeaders = () => {
  return (
    <thead>
      <tr className={t.titles}>
        <th>Coin</th>
        <th>Price</th>
        <th>Market Cap</th>
        <th>Volume 24h</th>
        <th>All-time High</th>
      </tr>
    </thead>
  );
};
