import React, { useEffect, useState } from "react";
import t from "./table.module.scss";
import { EthValue } from "../value";
import { TableHeaders } from "./tableheader";
import { CryptoData } from "../cryptoData/getCryptoData";
export const Table = ({ data, limit }) => {
  let sliced = data;
  if (limit) {
    sliced = data.slice(0, 4);
  }
  return (
    <table className={t.table}>
      <TableHeaders />
      <tbody>
        {sliced.map((tr) => (
          <tr key={tr.id} className={t.userField}>
            <td className={t.user_fio}>
              <img src={tr.img} alt="userAvatar"></img>
              <div className={t.fio}>
                <h2 className={t.name}>{tr.userName}</h2>
                <h3 className={t.nick}>{tr.userNick}</h3>
              </div>
            </td>
            <td>
              <EthValue idEditable full value={tr.volume} />
            </td>
            <td>
              {/* <CryptoData rate coins={"ETH"} /> */}
            </td>
            <td>
              <EthValue idEditable full value={tr.floorprice} />
            </td>
            <td>
              <span className={t.profitNumbers}>{tr.owners}</span>
            </td>
            <td>
              <span className={t.profitNumbers}>{tr.items}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
