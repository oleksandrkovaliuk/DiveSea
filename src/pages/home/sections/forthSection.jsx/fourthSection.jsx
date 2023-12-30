import React, { useState } from "react";
import { Button } from "../../../../components/button";
import { Category } from "../../../../icons/category";
import { Collection } from "../../../../icons/collection";
import { Price } from "../../../../icons/price";
import f from "./fourthSection.module.scss";
import { BigCard } from "../../../../components/card/BigCard";
import { DropMenu } from "../../../../components/dropDownBtnMenu";
import { cardInfo } from "../../../../components/card/cardInfo";

export const FourthSection = () => {
  const [filteredData, setFilteredData] = useState(cardInfo);

  const [dropMenuPosition, setDropMenudPosition] = useState(null);
  const [dropdownContent, setDropDownContent] = useState(null);

  const handleOpenDropdownFilter = (event, categoryKind) => {
    if (categoryKind === "categoryName") {
      setDropDownContent(
        Array.from(new Set(cardInfo.map((item) => item[categoryKind])))
      );
    }

    if (categoryKind === "collectionName") {
      console.log("collectionName");
    }

    if (categoryKind === "priceType") {
      console.log("priceType");
    }

    const btn = event.target.getBoundingClientRect();
    const left = btn.left;
    const top = btn.top;

    setDropMenudPosition({ left, top });
  };

  const handleSelectSubFilterItem = (filterItem) => {
    const data = cardInfo.filter((item) => item.title === filterItem);
    setFilteredData(data);
    setDropMenudPosition(null);
  };

  const handleCloseDropDownMenu = () => setDropMenudPosition(null);

  return (
    <div className={f.marketplace}>
      <h2 className={f.main_text}>Explore Marketplace</h2>
      {dropMenuPosition?.left && dropdownContent?.length && (
        <DropMenu
          data={dropdownContent}
          top={dropMenuPosition.top}
          left={dropMenuPosition.left}
          selectFilter={handleSelectSubFilterItem}
          closeDropDownMenu={handleCloseDropDownMenu}
        />
      )}
      <div className={f.markeplace_nav}>
        <Button onClick={() => setFilteredData(cardInfo)} category>
          All
        </Button>
        <Button
          onClick={(event) => {
            handleOpenDropdownFilter(event, "categoryName");
          }}
          category
        >
          <Category />
          Category
        </Button>
        <Button
          onClick={(event) => {
            handleOpenDropdownFilter(event, "collectionName");
          }}
          category
        >
          <Collection />
          Collection
        </Button>
        <Button
          onClick={(event) => handleOpenDropdownFilter(event, "priceType")}
          category
        >
          <Price />
          Price
        </Button>
      </div>
      <div className={f.productWrap}>
        {filteredData?.map((card) => (
          <BigCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};
