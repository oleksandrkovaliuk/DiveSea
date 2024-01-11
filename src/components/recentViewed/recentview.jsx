import React from "react";
import { ThreeDots } from "../../icons/threedots";
import classNames from "classnames";
import v from "./recentview.module.scss";
import { UserInfo } from "../userInfo";
import { userData } from "../../shared/userData";
export const Viewed = ({ pos, bestSellPos , full }) => {
  const classes = classNames(v.recent_view, {
    [v.pos]: pos,
    [v.bestSell]: bestSellPos,
    [v.full]: full,
  });
  return (
    <div className={classes}>
      <div className={v.title}>
        <h2 className={v.main_text}>Recent Viewed</h2>
        <ThreeDots />
      </div>
      <UserInfo data={userData.slice(0,2)}>
      </UserInfo>
    </div>
  );
};
