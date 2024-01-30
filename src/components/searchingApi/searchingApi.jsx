import React, { useState } from "react";
import s from "./searchingApi.module.scss";
import { useDebouce } from "../../hooks/useDebouce";
import classNames from "classnames";
import { formateRate } from "../../shared/formatMarketCap";
import { useNavigate } from "react-router-dom";

export const SearchingApi = () => {
  const [searchingResult, setSearchingResult] = useState([]);
  const navigateTo = useNavigate();
  const checkSearchingRequest = (value) => {
    const currentData = JSON.parse(localStorage.getItem("cryptoHistoryFull"));
    const filteredSearchingResult = currentData.filter((item) => {
      if (value.target.value?.length) {
        const itemName = item.name.toLowerCase();
        const valueName = value.target.value.toLowerCase();

        return itemName.startsWith(valueName) || itemName === valueName;
      }
    });
    setSearchingResult(filteredSearchingResult);
  };
  const closeDropDownMenu = () => {
    setSearchingResult([]);
  };
  const giveResult = useDebouce(checkSearchingRequest, 300);

  const navigateToCoin = (link) => navigateTo(link);
  return (
    <>
      <div
        style={
          searchingResult.length ? { display: "block" } : { display: "none" }
        }
        className={s.back_block}
        onClick={() => closeDropDownMenu()}
      />
      <div className={s.searching}>
        <input
          placeholder=" "
          type="text"
          id="search"
          name="search"
          className={s.search_input}
          onChange={(event) => {
            giveResult(event);
          }}
        ></input>
        <label htmlFor="search" className={s.search_label}>
          Search coin
        </label>
        {searchingResult && (
          <ul
            style={
              searchingResult.length
                ? { display: "block" }
                : { display: "none" }
            }
            className={s.searchingResultMenu}
          >
            {searchingResult.map((item) => {
              return (
                <li
                  onClick={() => {
                    navigateToCoin(`/product?coin=${item.name}`);
                  }}
                  className={s.resultCoins}
                >
                  <div className={s.coins}>
                    <img src={item.webp64} alt="coinAvatar"></img>
                    <div className={s.coins_info}>
                      <h2 className={s.coin_code}>{item.code}</h2>
                      <h3 className={s.coin_name}>{item.name}</h3>
                    </div>
                  </div>
                  <h2 className={item.up ? s.price_up : s.price_down}>
                    {formateRate(item.rate)}
                  </h2>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};
