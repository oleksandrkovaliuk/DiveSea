import React from "react";
import s from "./card.module.scss";
import { Verified } from "../../icons/verified";
import { Like } from "../../icons/like";
import { EthValue } from "../value";
import { Card } from "./card";
export const SmallCardChild = ({ cardInfo }) => {
  return cardInfo.map((card) => (
    <Card key={card.card} small img={card.img}>
      <div className={s.card_disc}>
        <span className={s.sub_title}>
          {card.subtitle}
          <Verified />
        </span>
        <h2 className={s.title}>{card.title}</h2>
        <div className={s.currentBid_placeBid}>
          <div className={s.currentBid}>
            <EthValue value={card.value} />
          </div>
          <div className={s.likes}>
            <Like />
            <span>{card.like}</span>
          </div>
        </div>
      </div>
    </Card>
  ));
};
