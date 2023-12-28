import React from "react";

import { Switcher } from "../../../../components/leftRightSwitcher";
import s from "./secondSection.module.scss";
import { Viewed } from "../../../../components/recentViewed";
import { BigCard } from "../../../../components/card/bigCardComponent";


export const SecondSection = () => {
  return (
    <div className={s.weakly_top}>
      <h2 className={s.main_text}>Weekly - Top NFT</h2>
      <div className={s.nft_wrap}>
        <BigCard />
      </div>
      <Switcher />
      <Viewed pos lose />
    </div>
  );
};
