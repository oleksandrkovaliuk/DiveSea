import React from "react";
import { Card } from "./card";
import { EthValue } from "../value";
import { Button } from "../button";
import s from "./card.module.scss";
import { ButtonColors, ButtonSizes, ButtonVariants } from "../../shared/enums";

export const BigCard = ({ card }) => {
  return (
    <Card id={card.id} big img={card.img}>
      <div className={s.card_disc}>
        <h2 className={s.title}>{card.title}</h2>
        <div className={s.currentBid_placeBid}>
          <div className={s.currentBid}>
            <h3 className={s.currentBid_text}>Current bid</h3>
            <EthValue value={card.value} />
          </div>
          <Button
            size={ButtonSizes.small}
            colors={ButtonColors.primary}
            variants={ButtonVariants.contained}
          >
            PLACE BID
          </Button>
        </div>
      </div>
    </Card>
  );
};
