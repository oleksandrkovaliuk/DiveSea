import React from "react";

import { Switcher } from "../../../../components/leftRightSwitcher";
import s from "./secondSection.module.scss";
import { Viewed } from "../../../../components/recentViewed";
import { BigCard } from "../../../../components/card/BigCard";
import { cardInfo } from "../../../../components/card/cardInfo";

export const SecondSection = () => {
  return (
    <div className={s.weakly_top}>
      <h2 className={s.main_text}>Weekly - Top NFT</h2>
      <div className={s.nft_wrap}>
        {cardInfo?.map((card) => (
          <BigCard key={card.id} card={card} />
        ))}
      </div>
      <Switcher />
      <Viewed pos lose />
    </div>
  );
};
