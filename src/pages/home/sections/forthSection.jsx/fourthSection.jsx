import React, { useEffect, useState } from "react";
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
  const [, setCategoryInMenu] = useState();

  const handleFilter = (filter) => {
    setFilter(filter);
  };
  useEffect(() => {
    if (filter === "category") {
      setCategoryInMenu("CategoryName");
    }
    if (filter === "collection") {
      setCategoryInMenu("CollectionName");
    }
  }, [filter]);
  return (
    <div className={f.marketplace}>
      <h2 className={f.main_text}>Explore Marketplace</h2>
      <div className={f.markeplace_nav}>
        <Button onClick={() => handleFilter("all")} category>
          All
        </Button>
        <Button onClick={() => handleFilter("category")} category>
        <DropMenu
            data={cardInfo}
            hide={filter === "collection"}
            categoryKind={() => setCategoryInMenu()}
          />
          <Category />
          Category
        </Button>
        <Button onClick={() => handleFilter("collection")} category>
        <DropMenu
            data={cardInfo}
            hide={filter === "category"}
            categoryKind={() => setCategoryInMenu()}
          />
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
