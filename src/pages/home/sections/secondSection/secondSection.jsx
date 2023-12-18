import React from "react";
import { Card } from "../../../../components/card/card";
import { BiggerCard } from "../../../../components/card/biggerCardDisc";
import { Switcher } from "../../../../components/leftRightSwitcher";
import s from "./secondSection.module.scss";
import { Viewed } from "../../../../components/recentViewed/recentview";

export const SecondSection = () => {
  return (
    <>
      <div className={s.weakly_top}>
        <h2 className={s.main_text}>Weekly - Top NFT</h2>
          <div className={s.nft_wrap}>
            <Card big img={process.env.PUBLIC_URL + "/images/product1.png"}>
              <BiggerCard />
            </Card>
            <Card big img={process.env.PUBLIC_URL + "/images/product2.png"}>
              <BiggerCard />
            </Card>
            <Card big img={process.env.PUBLIC_URL + "/images/product3.png"}>
              <BiggerCard />
            </Card>
            <Card big img={process.env.PUBLIC_URL + "/images/product4.png"}>
              <BiggerCard />
            </Card>
            <Card big img={process.env.PUBLIC_URL + "/images/product5.png"}>
              <BiggerCard />
            </Card>
          </div>
        <Switcher />
        <Viewed pos lose/>
      </div>
    </>
  );
};
