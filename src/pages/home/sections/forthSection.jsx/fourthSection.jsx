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
      setCollectionMenu(false);
    } else if (filter === "collection") {
      setCollectionMenu(!collectionMenuOpen);
      setCategoryMenu(false);
    } else {
      setCollectionMenu(false);
      setCategoryMenu(false);
    }
    setFilter(filter);
  };
  const MenuListSetter = () => {
    if (filter === "category") {
      return "categoryName";
    } else if (filter === "collection") {
      return "categoryName";
    } else {
      return;
    }
  };
  return (
    <div className={f.marketplace}>
      <h2 className={f.main_text}>Explore Marketplace</h2>
      <div className={f.markeplace_nav}>
        <Button onClick={() => handleFilter("all")} category>
          All
        </Button>
        <Button
          focus={categoryMenuOpen ? true : undefined}
          onClick={() => {
            handleFilter("category");
          }}
          category
        >
          {categoryMenuOpen && (
            <DropMenu anim data={cardInfo} categoryKind={MenuListSetter()} />
          )}
          <Category />
          Category
        </Button>
        <Button
          focus={collectionMenuOpen ? true : undefined}
          onClick={() => {
            handleFilter("collection");
          }}
          category
        >
          {collectionMenuOpen && (
            <DropMenu anim data={cardInfo} categoryKind={MenuListSetter()} />
          )}
          <Collection />
          Collection
        </Button>
        <Button onClick={() => handleFilter("sun")} category>
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
