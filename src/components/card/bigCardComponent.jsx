import React  from "react"
import { BigCardChild } from "./biggerCardDisc";
import { cardInfo } from "./cardInfo";
export const BigCard = ({ limit , filter}) => {
  let sliced = cardInfo;
  if(limit && filter === 'all'){
    sliced = cardInfo.slice(0,8);
  }
  const filteredData = sliced.filter((item) => {
    if (filter === "all") {
      return true;
    }
    if (filter === "collection") {
      return item.inCollection;
    }
    if (filter === "category") {
      return item.category;
    }
    return false;
  });
  return <BigCardChild cardInfo={filter ? filteredData : sliced} />;
};
