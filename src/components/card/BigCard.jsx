import React from "react";
import { Card } from "./card";
import { EthValue } from "../value";
import { Button } from "../button";
import s from "./card.module.scss";

export const BigCard = ({ card }) => {
  return (
    <Card big img={card.img}>
      <div className={s.card_disc}>
        <h2 className={s.title}>{card.title}</h2>
        <div className={s.currentBid_placeBid}>
          <div className={s.currentBid}>
            <h3 className={s.currentBid_text}>Current bid</h3>
            <EthValue value={card.value} />
          </div>
          <Button size={"small"} colors={"primary"} variants={"contained"}>PLACE BID</Button>
        </div>
      </div>
    </Card>
  );
};
