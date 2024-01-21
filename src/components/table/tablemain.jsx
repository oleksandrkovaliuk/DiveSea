import React, { useCallback, useEffect, useState } from "react";
import t from "./table.module.scss";
import { TableHeaders } from "./tableheader";
import { getCryptoList } from "../../service/api";
import { FilterIcon } from "../../icons/filterIcon";
import { DropMenu } from "../dropDownBtnMenu";
import { DownSvg } from "../../icons/downSvg";
export const Table = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropMenu, showDropMenu] = useState(false);
  const [dropMenuSort, showDropMenuSort] = useState(false);
  const [dropMenuPos, setDropMenuPosition] = useState(null);
  const [dropMenuPosSort, setDropMenuPositionSort] = useState(null);
  const [sortFilter, setSortFilter] = useState("rank");
  const [orderFilter, setOrderFilter] = useState("ascending");
  const [filterSortType , setFilterSortType] = useState([])
  const filterType = ["price", "volume", "rank"];
  const handleDropMenuClick = (event) => {
    setTimeout(() => {
      const btn = event.target.getBoundingClientRect();
      const top = btn.top;
      const left = btn.left;
      const width = btn.width * 2;
      const height = btn.height;
      setDropMenuPosition({ top, left, width, height });
      showDropMenu(!dropMenu);
    });
  };
  const handleDropMenuClickSort = (event) => {
    const btn = event.target.getBoundingClientRect();
    const top = btn.top;
    const left = btn.left;
    const width = btn.width;
    const height = btn.height;
    setDropMenuPositionSort({ top, left, width, height });
    showDropMenuSort(!dropMenuSort);
  };
  const handleCloseDropDownMenu = () => {
    showDropMenu(false);
    showDropMenuSort(false);
  };
  const formatMarketCap = (cap) => {
    if (cap >= 1e12) {
      return (
        (cap / 1e12).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 4,
          maximumFractionDigits: 3,
        }) + " T"
      );
    } else if (cap >= 1e9) {
      return (
        (cap / 1e9).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        }) + " B"
      );
    } else if (cap >= 1e6) {
      return (
        (cap / 1e6).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 3,
        }) + "M"
      );
    } else if (cap >= 1e3) {
      return (
        (cap / 1e3).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 1,
          maximumFractionDigits: 3,
        }) + "K"
      );
    } else {
      return cap.toFixed().toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 1,
        maximumFractionDigits: 5,
      });
    }
  };
  const handleFilter = (filterItem) => {
    if (filterItem === "volume") {
      setSortFilter("volume");
      getCurrentData();
      setFilterSortType(["ascending","descending"])
    } else if (filterItem === "rank") {
      setOrderFilter("ascending");
      setSortFilter("rank");
      getCurrentData();
      setFilterSortType(["ascending"])
    } else if (filterItem === "price") {
      setSortFilter("price");
      getCurrentData();
      setFilterSortType(["ascending","descending"])
    }
    showDropMenu(false);
  };
  const handleOrderFilter = (orderFilter) => {
    if (orderFilter === "ascending") {
      setOrderFilter("ascending");
      getCurrentData();
    } else if (orderFilter === "descending") {
      setOrderFilter("descending");
      getCurrentData();
    }
    showDropMenuSort(false);
  };
  const getCurrentData = useCallback(async () => {
    try {
      const oldInfo = JSON.parse(localStorage.getItem("cryptoHistory"));
      const res = await getCryptoList(sortFilter, orderFilter);
      if (oldInfo) {
        const updatedInfo = res.map((newItem) => {
          const oldItem = oldInfo.find((item) => item.name === newItem.name);
          const checkRateChange = oldItem && newItem.rate > oldItem.rate;
          return {
            ...newItem,
            up: checkRateChange,
            formatedRate: newItem.rate.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 1,
              maximumFractionDigits: 2,
            }),
            formatedCap:
              newItem.cap !== null ? formatMarketCap(newItem.cap) : "-",
            formatedVolume:
              newItem.volume !== null ? formatMarketCap(newItem.volume) : "-",
          };
        });
        setCoins(updatedInfo);
      }
      localStorage.setItem("cryptoHistory", JSON.stringify(res));
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    } finally {
      setLoading(false);
    }
  }, [sortFilter, orderFilter]);
  useEffect(() => {
    getCurrentData();
    const apiCall = setInterval(() => {
      getCurrentData();
    }, 1000);
    return () => {
      clearInterval(apiCall);
    };
  }, [getCurrentData]);
  return (
    <div add={dropMenu ? true : false} className={t.table_container}>
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
          ></DropMenu>
        )}
        <div className={t.filterIcon}>
          <FilterIcon
            style={dropMenu ? { width: "calc(45px * 2)" } : null}
            className={t.filter_icon}
            onClick={(event) => handleDropMenuClick(event)}
          ></FilterIcon>
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
          ></DropMenu>
        ) : null}
        <button
          onClick={(event) => handleDropMenuClickSort(event)}
          className={t.sortByButton}
        >
          <span>sort by</span>
          <DownSvg />
        </button>
      </div>
      {loading ? (
        <div className={t.loading_screen}></div>
      ) : (
        <table id="table" className={t.table}>
          <TableHeaders />
          <tbody>
            {coins?.map((item) => (
              <tr key={item.id} className={t.coin_field}>
                <td className={t.coins}>
                  <img src={item.webp64} alt="coinAvatar"></img>
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
                <td>
                  <span className={t.otherInfo}>{item.formatedCap}</span>
                </td>
                <td>
                  <span className={t.otherInfo}>{item.formatedVolume}</span>
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
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
