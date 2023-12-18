import React from "react";
import s from "./card.module.scss";
import { Verified } from "../../icons/verified";
import { Like } from "../../icons/like";
import { EthValue } from "../value/ethereum";

export const SmallerCard = () => {
    return (<div className={s.card_disc}>
        <span className={s.sub_title}>Perperzon<Verified /></span>
        <h2 className={s.title}>Sun-Glass</h2>
        <div className={s.currentBid_placeBid}>
            <div className={s.currentBid}>
               <EthValue value={16.4}/>
            </div>
            <div className={s.likes}>
                <Like />
                <span>200</span>
            </div>
        </div>
    </div>);
}