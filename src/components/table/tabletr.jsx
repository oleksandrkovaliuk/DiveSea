import React from "react";
import t from "./table.module.scss";
import { TableUserInfo } from "./tableUserInfo";
import { EthValue } from "../value";
export const Tr = () => {
  return TableUserInfo.map((tr) => (
    <tr className={t.userField}>
      <td className={t.user_fio}>
        <img src={tr.img} alt="userAvatar"></img>
        <div className={t.fio}>
          <h2 className={t.name}>{tr.userName}</h2>
          <h3 className={t.nick}>{tr.userNick}</h3>
        </div>
      </td>
      <td>
        <EthValue full value={tr.volume} />
      </td>
      <td>
        <span className={t.profitNumbers_profit}>{tr.profit}</span>
      </td>
      <td>
        <EthValue full value={tr.floorprice} />
      </td>
      <td>
        <span className={t.profitNumbers}>{tr.owners}</span>
      </td>
      <td>
        <span className={t.profitNumbers}>{tr.items}</span>
      </td>
    </tr>
  ));
};
