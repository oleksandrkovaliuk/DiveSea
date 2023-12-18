import React from "react";
import s from "./card.module.scss";
import { Button } from "../button/button";
import { EthValue } from "../value/ethereum";

export const BiggerCard = () => {
    return (<div className={s.card_disc}>
        <h2 className={s.title}>Sun-Glass</h2>
        <div className={s.currentBid_placeBid}>
            <div className={s.currentBid}>
                <h3 className={s.currentBid_text}>Current bid</h3>
              <EthValue value={1.75}/>
            </div>
            <Button filled>PLACE BID</Button>
        </div>
    </div>);
}