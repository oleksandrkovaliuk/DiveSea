import React, { useCallback, useEffect, useReducer } from "react";
import t from "./table.module.scss";
import { TableHeaders } from "./tableheader";
import { getCryptoList } from "../../service/api";
import { FilterIcon } from "../../icons/filterIcon";
import { DropMenu } from "../dropDownBtnMenu";
import { DownSvg } from "../../icons/downSvg";
import { initialState, reducer } from "./reducer/reducer";
import { formatMarketCap, formateRate } from "../../shared/formatMarketCap";

import {
  setCoins,
  setLoading,
  setSortFilter,
  setFilterSortType,
  showDropDownMenu,
  showDropDownMenuPos,
  showDropDownMenuPosSort,
  showDropDownMenuSort,
  setOrderFilter,
  setCurrentPages,
  setIsFirstRender,
} from "./reducer/actions";
import { Pagination } from "../pagination";
import { LeftArrowLined } from "../../icons/leftArrowLined";
import { RightArrowLined } from "../../icons/rightArrowLined";
import { useNavigate } from "react-router-dom";
import { SearchingApi } from "../searchingApi/searchingApi";

const createHashMapCoins = (coins) => {
  return coins.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.name]: curr.rate,
    };
  }, {});
};
const filterType = ["price", "volume", "rank"];

export const Table = () => {
  const [
    {
      coins,
      loading,
      dropMenu,
      dropMenuSort,
      dropMenuPos,
      dropMenuPosSort,
      sortFilter,
      orderFilter,
      filterSortType,
      postPerPage,
      currentPage,
      isFirstRender,
    },
    dispatchAction,
  ] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const handleDropMenuClick = (event) => {
    setTimeout(() => {
      const btn = event.target.getBoundingClientRect();
      const top = btn.top;
      const left = btn.left;
      const width = btn.width * 2;
      const height = btn.height;
      dispatchAction(showDropDownMenuPos({ top, left, width, height }));
      dispatchAction(showDropDownMenu(!dropMenu));
    });
  };
  const handleDropMenuClickSort = (event) => {
    const btn = event.target.getBoundingClientRect();
    const top = btn.top;
    const left = btn.left;
    const width = btn.width;
    const height = btn.height;
    dispatchAction(showDropDownMenuPosSort({ top, left, width, height }));
    dispatchAction(showDropDownMenuSort(!dropMenuSort));
  };
  const handleCloseDropDownMenu = () => {
    if (dropMenu && dropMenuSort) {
      dispatchAction(showDropDownMenu(!dropMenu));
      dispatchAction(showDropDownMenuSort(!dropMenuSort));
    } else if (dropMenuSort) {
      dispatchAction(showDropDownMenuSort(!dropMenuSort));
    } else if (dropMenu) {
      dispatchAction(showDropDownMenu(!dropMenu));
    }
  };
  const handleFilter = (filterItem) => {
    if (filterItem === "volume") {
      dispatchAction(setSortFilter("volume"));
      dispatchAction(setFilterSortType(["ascending", "descending"]));
    } else if (filterItem === "rank") {
      dispatchAction(setOrderFilter("ascending"));
      dispatchAction(setSortFilter("rank"));

      dispatchAction(setFilterSortType(["ascending"]));
    } else if (filterItem === "price") {
      dispatchAction(setSortFilter("price"));
      dispatchAction(setFilterSortType(["ascending", "descending"]));
    }
    dispatchAction(showDropDownMenu(dropMenu));
  };
  const handleOrderFilter = (orderFilter) => {
    if (orderFilter === "ascending") {
      dispatchAction(setOrderFilter("ascending"));
    } else if (orderFilter === "descending") {
      dispatchAction(setOrderFilter("descending"));
    }
    dispatchAction(showDropDownMenuSort(dropMenuSort));
  };
  const getCurrentData = useCallback(
    async ({ sortFilter, orderFilter, signal, withLoading = true }) => {
      try {
        dispatchAction(setLoading(withLoading));
        const savedCoins = JSON.parse(localStorage.getItem("cryptoHistory"));
        const res = await getCryptoList(sortFilter, orderFilter, signal);

        if (savedCoins && Object.keys(savedCoins)?.length) {
          const updatedInfo = res.map((newItem) => {
            const oldItem = savedCoins[newItem.name];

            return {
              ...newItem,
              up: newItem.rate > oldItem,
              formatedRate: formateRate(newItem.rate),
              formatedCap:
                newItem.cap !== null ? formatMarketCap(newItem.cap) : "-",
              formatedVolume:
                newItem.volume !== null ? formatMarketCap(newItem.volume) : "-",
            };
          });
          dispatchAction(setCoins(updatedInfo));
        }
        localStorage.setItem(
          "cryptoHistory",
          JSON.stringify(createHashMapCoins(res))
        );
        localStorage.setItem("cryptoHistoryFull", JSON.stringify(res));
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      } finally {
        console.log(" finally - withLoading");
        dispatchAction(setLoading(false));
      }
    },
    []
  );

  const handleOpenCoinPage = (link) => navigate(link);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getCurrentData({ sortFilter, orderFilter, signal });

    const apiCall = setInterval(() => {
      getCurrentData({ sortFilter, orderFilter, signal, withLoading: false });
    }, 15000);

    return () => {
      controller.abort();
      clearInterval(apiCall);
    };
  }, [getCurrentData, sortFilter, orderFilter, isFirstRender]);
  return (
    <div className={t.table_container}>
      <div className={t.cryptocurrency_nav}>
        {dropMenuPos?.top && dropMenu && (
          <DropMenu
            data={filterType}
            left={dropMenuPos.left}
            width={dropMenuPos.width}
            top={dropMenuPos.top}
            height={dropMenuPos.height}
            closeDropDownMenu={handleCloseDropDownMenu}
            selectFilter={handleFilter}
            typeWhite
          />
        )}
        <div className={t.filter_icon_n_search}>
          <div className={t.filterIcon}>
            <FilterIcon
              style={dropMenu ? { width: "calc(45px * 2)" } : null}
              className={t.filter_icon}
              onClick={(event) => handleDropMenuClick(event)}
            />
          </div>
          <SearchingApi />
        </div>
        {dropMenuPosSort?.top && dropMenuSort ? (
          <DropMenu
            data={filterSortType}
            left={dropMenuPosSort.left}
            width={dropMenuPosSort.width}
            top={dropMenuPosSort.top}
            height={dropMenuPosSort.height}
            closeDropDownMenu={handleCloseDropDownMenu}
            selectFilter={handleOrderFilter}
            typeWhite
          />
        ) : null}
        <button
          onClick={(event) => handleDropMenuClickSort(event)}
          className={t.sortByButton}
        >
          <span>sort by</span>
          <DownSvg />
        </button>
      </div>
      {loading || !coins?.length ? (
        <div className={t.loading_screen}></div>
      ) : (
        <>
          <div className={t.table_wrap}>
            <table className={t.table}>
              <TableHeaders />
              <tbody>
                {coins.slice(firstPostIndex, lastPostIndex)?.map((item) => {
                  return (
                    <tr
                      onClick={() =>
                        handleOpenCoinPage(`/product?coin=${item.name}`)
                      }
                      key={item.name}
                      className={t.coin_field}
                    >
                      <td className={t.coins}>
                        <img src={item.webp64} alt="coinAvatar" />
                        <div className={t.coin_info}>
                          <h2 className={t.coin_code}>{item.code}</h2>
                          <h3 className={t.coin_name}>{item.name}</h3>
                        </div>
                      </td>
                      <td>
                        <span className={item.up ? t.price_up : t.price_down}>
                          {item.formatedRate}
                        </span>
                      </td>
                      <td id={t.marketCupVolume}>
                        <span className={t.otherInfo}>{item.formatedCap}</span>
                      </td>
                      <td>
                        <span className={t.otherInfo}>
                          {item.formatedVolume}
                        </span>
                      </td>
                      <td>
                        <span className={t.otherInfo}>
                          {"$" +
                            item.allTimeHighUSD.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            allPost={coins.length}
            postPerPage={postPerPage}
            currentPage={currentPage}
            setPage={(item) => dispatchAction(setCurrentPages(item))}
          >
            <button
              className={t.rightPaginationButton}
              onClick={() => dispatchAction(setCurrentPages(currentPage - 1))}
              style={
                currentPage === 1 ? { display: "none" } : { display: "flex" }
              }
            >
              <LeftArrowLined />
            </button>
            <button
              className={t.leftPaginationButton}
              onClick={() => dispatchAction(setCurrentPages(currentPage + 1))}
              style={
                currentPage > coins.length / 10 - 1
                  ? { display: "none" }
                  : { display: "flex" }
              }
            >
              <RightArrowLined />
            </button>
          </Pagination>
        </>
      )}
    </div>
  );
};
