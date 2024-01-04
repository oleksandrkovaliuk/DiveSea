import React from "react";
import u from "./userInfo.module.scss";
import { EthValue } from "../value";
import classNames from "classnames";
export const UserInfo = ({ data, cropped , children , bestSeller}) => {
  const classes = classNames(u.user_wrap, {
    [u.cropped]: cropped,
    [u.bestSeller]:bestSeller
  });
  return data.map((user) => (
    <div className={classes} key={user.id}>
      <div className={u.user_info}>
        <div className={u.img}>
          <img src={user.img} alt="avatar2"></img>
        </div>
        <div className={u.text}>
          <h2 className={u.name}>{user.userName}</h2>
          <h3 className={u.nick}>{user.userNick}</h3>
        </div>
      </div>
      <div className={u.user_accomplish}>
        <EthValue value={user.volume}  bold/>
        <span
          className={
            parseInt(user.profit.replace(/[^0-9.-]+/g, "")) >= 0
              ? `${u.positive}`
              : `${u.negative}`
          }
        >
          {user.profit}
        </span>
      </div>
      {children}
    </div>
  ));
};
