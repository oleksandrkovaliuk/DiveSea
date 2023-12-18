import React from "react";
import { EthValue } from "../value/ethereum";
import { ThreeDots } from "../../icons/threedots";
import classNames from "classnames";
import v from "./recentview.module.scss"

export const Viewed = ({pos , lose}) => {
    const classes = classNames(v.recent_view , {
        [v.pos]: pos,
        [v.lose]: lose
    })
    return(
        <div className={classes}>
            <div className={v.title}>
                <h2 className={v.main_text}>Recent Viewed</h2>
                <ThreeDots />
            </div>
            <div className={v.user_wrap}>
                <div className={v.user_info}>
                        <img src={process.env.PUBLIC_URL + "/images/avatar1.jpeg"} alt='avatar1'></img>
                    <div className={v.text}>
                        <h2 className={v.name}>Alex Ca.</h2>
                        <h3 className={v.nick}>Alexy</h3>
                    </div>

                </div>
                <div className={v.user_accomplish}>
                    <EthValue value={8.456}  bold/>
                    <span className={v.win}>+23,00%</span>
                </div>
            </div>
            <div className={v.user_wrap}>
                <div className={v.user_info}>
                    <div className={v.img}>
                        <img src={process.env.PUBLIC_URL + "/images/avatar2.jpeg"} alt='avatar2'></img>
                    </div>
                    <div className={v.text}>
                        <h2 className={v.name}>Juliya S.</h2>
                        <h3 className={v.nick}>JuliyaS</h3>
                    </div>

                </div>
                <div className={v.user_accomplish}>
                    <EthValue value={5.327} bold/>
                    <span>-32,01   %</span>
                </div>
            </div>
        </div>
    );
}