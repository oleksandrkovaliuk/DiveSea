import React from "react";
import { SmallCardChild } from "./smallerCardDisc";
import { cardInfo } from "../../shared/cardInfo";
export const SmallCard = () => {
  return <SmallCardChild cardInfo={cardInfo} />;
};
