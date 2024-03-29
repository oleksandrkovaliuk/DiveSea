import React from "react";
import s from "./bid.module.scss";
import classNames from "classnames";
import { Ethereum } from "../../icons/ethereum";

export const EthValue = ({ value, bold, full, bestSeller}) => {
  const classes = classNames(s.bid, {
    [s.value]: value,
    [s.bold]: bold,
    [s.full]: full,
    [s.bestSeller]: bestSeller
  });
  return (
    <div className={classes}>
      <Ethereum />
        <h4 className={s.value}>{value}</h4>
    </div>
  );
};
