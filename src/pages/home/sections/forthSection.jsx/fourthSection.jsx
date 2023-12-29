import React, { useState } from "react";
import { Button } from "../../../../components/button";
import { Category } from "../../../../icons/category";
import { Collection } from "../../../../icons/collection";
import { Price } from "../../../../icons/price";
import f from "./fourthSection.module.scss";
import { BigCard } from "../../../../components/card/bigCardComponent";
import { DropMenu } from "../../../../components/dropDownBtnMenu";
import { cardInfo } from "../../../../components/card/cardInfo";

export const FourthSection = () => {
  const [filter, setFilter] = useState("all");
  const [categoryMenuOpen, setCategoryMenu] = useState(false);
  const [collectionMenuOpen, setCollectionMenu] = useState(false);
    const handleFilter = (filter) => {
    if (filter === "category") {
      setCategoryMenu(!categoryMenuOpen);
      setCollectionMenu(false)
    }else if(filter === 'collection'){
      setCollectionMenu(!collectionMenuOpen)
      setCategoryMenu(false)
    }else{
      setCollectionMenu(false)
      setCategoryMenu(false)
    }
    setFilter(filter);
  };
  return (
    <div className={f.marketplace}>
      <h2 className={f.main_text}>Explore Marketplace</h2>
      <div className={f.markeplace_nav}>
        <Button onClick={() => handleFilter("all")} category>
          All
        </Button>
        <Button
          onClick={() => {
            handleFilter("category");
          }}
          category
        >
          {categoryMenuOpen && (
            <DropMenu
              data={cardInfo}
              categoryKind={"categoryName"}
            />
          )}
          <Category />
          Category
        </Button>
        <Button
          onClick={() => {
            handleFilter("collection");
          }}
          category
        >
          {collectionMenuOpen && (
            <DropMenu
              data={cardInfo}
              categoryKind={"categoryName"}
            />
          )}
          <Collection />
          Collection
        </Button>
        <Button onClick={() => handleFilter("price")} category>
          <Price />
          Price
        </Button>
      </div>
      <div className={f.productWrap}>
        <BigCard limit filter={filter} />
      </div>
    </div>
  );
};
