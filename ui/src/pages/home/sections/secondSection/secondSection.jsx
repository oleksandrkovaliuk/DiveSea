import React from "react";

import s from "./secondSection.module.scss";
import { Viewed } from "../../../../components/recentViewed";

import { SimpleSLider } from "../../../../components/simpleSlider";

export const SecondSectione = () => {
  return (
    <div className={s.weakly_top}>
      <h2 className={s.main_text}>Weekly - Top NFT</h2>
      <SimpleSLider />
      <Viewed pos />
    </div>
  );
};
