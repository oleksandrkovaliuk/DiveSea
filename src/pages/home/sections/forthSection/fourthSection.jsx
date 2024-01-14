import React, { useState } from "react";
import { Button } from "../../../../components/button";
import { Category } from "../../../../icons/category";
import { Collection } from "../../../../icons/collection";
import { Price } from "../../../../icons/price";
import f from "./fourthSection.module.scss";
import { BigCard } from "../../../../components/card/BigCard";
import { DropMenu } from "../../../../components/dropDownBtnMenu";
import { cardInfo } from "../../../../shared/cardInfo";
import {
  ButtonColors,
  ButtonSizes,
  ButtonVariants,
} from "../../../../shared/enums";

export const FourthSectione = () => {
  const [filteredData, setFilteredData] = useState(cardInfo);
  const [dropMenuPosition, setDropMenudPosition] = useState(null);
  const [dropdownContent, setDropDownContent] = useState(null);
  const [focusBtn, setFocusBtn] = useState(false);
  const price = ["> to <", "< to >", "all"];
  const handleOpenDropdownFilter = (event, categoryKind) => {
    if (categoryKind === "categoryName") {
      setDropDownContent(
        Array.from(new Set(cardInfo.map((item) => item[categoryKind])))
      );

      setFocusBtn(categoryKind);
    }

    if (categoryKind === "collectionType") {
      setDropDownContent(
        Array.from(new Set(cardInfo.map((item) => item[categoryKind])))
      );
      setFocusBtn(categoryKind);
    }
    if (categoryKind === "priceType") {
      setDropDownContent(price);
      setFocusBtn(categoryKind);
    }
    const btn = event.target.getBoundingClientRect();
    const left = btn.left;
    const top = btn.top;
    const width = btn.width;
    const height = btn.height;

    setDropMenudPosition({ left, top, width, height });
  };

  const handleSelectSubFilterItem = (filterItem) => {
    const arr = [...cardInfo];
    const data = cardInfo.filter((item) =>
      item.title === filterItem ? item : item.collectionType === filterItem
    );
    if (filterItem === "all") {
      setFilteredData(arr);
    } else if (filterItem === "> to <") {
      arr.sort((a, b) => a.value - b.value);
      setFilteredData(arr);
    } else if (filterItem === "< to >") {
      arr.sort((a, b) => b.value - a.value);
      setFilteredData(arr);
    } else {
      setFilteredData(data);
    }
    setDropMenudPosition(null);
  };
  const handleCloseDropDownMenu = () => {
    setDropMenudPosition(null);
    setFocusBtn(null);
  };
  const handleClickForAll = () => {
    setFilteredData(cardInfo);
    setDropMenudPosition(null);
    setFocusBtn("all");
  };
  return (
    <div className={f.marketplace}>
      <h2 className={f.main_text}>Explore Marketplace</h2>
      {dropMenuPosition?.left && dropdownContent?.length && (
        <DropMenu
          data={dropdownContent}
          top={dropMenuPosition.top}
          left={dropMenuPosition.left}
          width={dropMenuPosition.width}
          height={dropMenuPosition.height}
          selectFilter={handleSelectSubFilterItem}
          closeDropDownMenu={handleCloseDropDownMenu}
        />
      )}
      <div className={f.markeplace_nav}>
        <Button
          onClick={handleClickForAll}
          size={ButtonSizes.small}
          variants={ButtonVariants.outlined}
          colors={
            focusBtn === "all"
              ? `${ButtonColors.focused}`
              : `${ButtonColors.secondary}`
          }
        >
          All
        </Button>
        <Button
          focus={focusBtn === "categoryName"}
          onClick={(event) => {
            handleOpenDropdownFilter(event, "categoryName");
          }}
          size={ButtonSizes.small}
          variants={ButtonVariants.outlined}
          colors={
            focusBtn === "categoryName"
              ? `${ButtonColors.focused}`
              : `${ButtonColors.secondary}`
          }
        >
          <Category />
          Category
        </Button>
        <Button
          onClick={(event) => {
            handleOpenDropdownFilter(event, "collectionType");
          }}
          size={ButtonSizes.small}
          variants={ButtonVariants.outlined}
          colors={
            focusBtn === "collectionType"
              ? `${ButtonColors.focused}`
              : `${ButtonColors.secondary}`
          }
        >
          <Collection />
          Collection
        </Button>
        <Button
          onClick={(event) => handleOpenDropdownFilter(event, "priceType")}
          size={ButtonSizes.small}
          variants={ButtonVariants.outlined}
          colors={
            focusBtn === "priceType"
              ? `${ButtonColors.focused}`
              : `${ButtonColors.secondary}`
          }
        >
          <Price />
          Price
        </Button>
      </div>
      <div className={f.productWrap}>
        {filteredData.length > 8
          ? filteredData
              .slice(0, 8)
              .map((card) => <BigCard key={card.id} card={card} />)
          : filteredData?.map((card) => <BigCard key={card.id} card={card} />)}
      </div>
    </div>
  );
};
