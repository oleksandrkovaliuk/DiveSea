import React from "react";
import t from "./table.module.scss"

export const TableHeaders = () => {
    return (<tr className={t.titles}>
        <th>Collection</th>
        <th>Volume</th>
        <th>24h %</th>
        <th>Floor Price</th>
        <th>Owners</th>
        <th>Items</th>
      </tr>);
}