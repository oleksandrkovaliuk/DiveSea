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
import { ExploreMore } from "../../../../components/exploreMore";
import { SearchIcon } from "../../../../icons/search";
import { useDebouce } from "../../../../hooks/useDebouce";
import { EthValue } from "../../../../components/value";
import { useNavigate } from "react-router-dom";

export const FourthSectione = ({ full }) => {
  const [filteredData, setFilteredData] = useState(cardInfo);
  const [dropMenuPosition, setDropMenudPosition] = useState(null);
  const [dropdownContent, setDropDownContent] = useState(null);
  const [searchingInput, showSearchingInput] = useState(false);
  const [searchingResult, setSearchingResult] = useState([]);
  const [resultValue, setResultValue] = useState("");
  const [focusBtn, setFocusBtn] = useState(false);
  const navigation = useNavigate();
  const price = ["> to <", "< to >", "all"];
  const handleOpenDropdownFilter = (event, categoryKind) => {
    if (categoryKind === "creatorName") {
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
      item.creatorName === filterItem
        ? item
        : item.collectionType === filterItem
    );
    if (filterItem === "all") {
      setFilteredData(cardInfo);
    } else if (filterItem === "> to <") {
      filteredData.sort((a, b) => a.value - b.value);
      setFilteredData(filteredData);
    } else if (filterItem === "< to >") {
      filteredData.sort((a, b) => b.value - a.value);
      setFilteredData(filteredData);
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
  const handleOpenSearchingInput = () => {
    showSearchingInput(!searchingInput);
  };
  const checkValueAndSetResult = () => {
    const filteredCardForSearching = cardInfo.filter((item) => {
      if (resultValue?.length) {
        const productName = item.title.toLowerCase();
        const value = resultValue.toLocaleLowerCase();
        return productName.startsWith(value) || productName === value;
      }
    });
    setSearchingResult(filteredCardForSearching);
  };
  const getResult = useDebouce(checkValueAndSetResult, 300);

  const setFinallResult = (event) => {
    getResult();
    setResultValue(event.target.value);
  };
  const navigateToProduct = (link) => navigation(link);
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
          onClick={(event) => {
            handleOpenDropdownFilter(event, "creatorName");
          }}
          size={ButtonSizes.small}
          variants={ButtonVariants.outlined}
          colors={
            focusBtn === "creatorName"
              ? `${ButtonColors.focused}`
              : `${ButtonColors.secondary}`
          }
        >
          <Category />
          Creators
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
        {full && (
          <div className={f.seraching_wrap}>
            <Button
              size={ButtonSizes.small}
              colors={
                searchingInput
                  ? `${ButtonColors.focusStroke}`
                  : `${ButtonColors.secondary}`
              }
              className={f.searching}
              onClick={() => handleOpenSearchingInput()}
            >
              <SearchIcon />
            </Button>
            <input
              placeholder=" "
              type="text"
              name="nftSearchingInput"
              className={f.searching_input}
              onChange={setFinallResult}
              style={
                searchingInput
                  ? {
                      width: window.innerWidth > 1080 ? "200px" : "130px",
                      left: window.innerWidth > 1080 ? "35px" : "20px",
                      paddingLeft: "20px",
                      backgroundColor: "#000",
                      color: "white",
                    }
                  : { width: "0%" }
              }
            ></input>
            {searchingResult && (
              <ul
                className={f.nftProductResult}
                style={
                  searchingResult?.length && searchingInput
                    ? {
                        width: window.innerWidth > 1080 ? "200px" : "130px",
                        left: window.innerWidth > 1080 ? "35px" : "20px",
                        display: "block",
                      }
                    : { display: "none" }
                }
              >
                {searchingResult?.map((item) => {
                  return (
                    <li
                      className={f.resultWithProduct}
                      onClick={() =>
                        navigateToProduct(`/nftproductIndividual?id=${item.id}`)
                      }
                    >
                      <img src={item.img} alt="productImg" />
                      <div className={f.discription_aboutProduct}>
                        <span className={f.cardName}>{item.title}</span>
                        <EthValue value={item.value} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
      <div className={f.productWrap}>
        {full
          ? filteredData?.map((card) => <BigCard key={card.id} card={card} />)
          : filteredData
              .slice(0, 8)
              .map((card) => <BigCard key={card.id} card={card} />)}
      </div>
      {!full && <ExploreMore directTo={"/nftproductfull"} />}
    </div>
  );
};
