import React from "react";
import s from "./card.module.scss";
import { Button } from "../button";
import { EthValue } from "../value";
import { Card } from "./card";

export const BigCardChild = ({ cardInfo}) => {
  return cardInfo.map((card) => (
    <Card key={card.card} big img={card.img}>
      <div className={s.card_disc}>
        <h2 className={s.title}>{card.title}</h2>
        <div className={s.currentBid_placeBid}>
          <div className={s.currentBid}>
            <h3 className={s.currentBid_text}>Current bid</h3>
            <EthValue value={card.value} />
          </div>
          <Button filled>PLACE BID</Button>
        </div>
      </div>
    </Card>
  ));
};
