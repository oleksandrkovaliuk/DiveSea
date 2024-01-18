import React, { useCallback, useEffect, useState } from "react";
import t from "./table.module.scss";
import { TableHeaders } from "./tableheader";
import { getCryptoList } from "../../service/api";
export const Table = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
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
      return cap.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 1,
        maximumFractionDigits: 3,
      });
    }
  };

  const getCurrentData = useCallback(async () => {
    try {
      const res = await getCryptoList();
      const oldInfo = JSON.parse(localStorage.getItem("cryptoHistory"));

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
            formatedCap: formatMarketCap(newItem.cap),
            formatedVolume: formatMarketCap(newItem.volume),
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
  }, []);
  useEffect(() => {
    setInterval(() => {
      getCurrentData();
    }, 2500);
  }, [getCurrentData]);
  return loading ? (
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
              <span className={item.up ? t.price : t.price_up}>
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
  );
};
