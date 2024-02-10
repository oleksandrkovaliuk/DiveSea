import React from "react";
import { cardInfo } from "../../shared/cardInfo";
import { creators } from "../../shared/creators";
import c from "./creatorsIndividual.module.scss";
import { useSearchParams } from "react-router-dom";
import { Verified } from "../../icons/verified";
import { Globe } from "../../icons/globe";
import { Twitter } from "../../icons/twitter";
import { OpenSea } from "../../icons/openSea";
import { BigCard } from "../../components/card/BigCard";
import { Footer } from "../../components/footer";

export const CreatorIndividualPage = () => {
  const [searchParams] = useSearchParams();
  const getCreatorName = searchParams.get("name");
  const filteredUserAndCardInfo = cardInfo.filter(
    (item) => item.creatorName === getCreatorName
  );
  const filteredCreatorsInfo = creators.filter(
    (item) => item.name === getCreatorName
  );
  return (
    <>
      <div className={c.creatorPage}>
        <div className={c.creatorMainInfo}>
          {filteredCreatorsInfo.map((item) => (
            <div className={c.creatorInfoBlock}>
              <div className={c.creatorLeftSideInfo}>
                <span className={c.creatorName}>
                  {item.name} <Verified />
                </span>
                <ul className={c.social}>
                  <li>
                    <Globe />
                  </li>
                  <li>
                    <Twitter />
                  </li>
                  <li>
                    <OpenSea />
                  </li>
                </ul>
              </div>
              <ul className={c.creatorRightSideInfo}>
                <li className={c.creatorsInfoBlock}>
                  <span>{item.volume} ETH</span>
                  <span>Total Volume</span>
                </li>
                <li className={c.creatorsInfoBlock}>
                  <span>{item.floorPrice} ETH</span>
                  <span>Floor Price</span>
                </li>
                <li className={c.creatorsInfoBlock}>
                  <span>{item.bestOffer} WETH</span>
                  <span>Best Offer</span>
                </li>
                <li className={c.creatorsInfoBlock}>
                  <span>{item.listed}%</span>
                  <span>Listed</span>
                </li>
                <li className={c.creatorsInfoBlock}>
                  <span>
                    {item.Owners} {item.OwnersProcent}
                  </span>
                  <span>Owners</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className={c.cretorProducts}>
          {filteredUserAndCardInfo.map((item) => (
            <BigCard card={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
