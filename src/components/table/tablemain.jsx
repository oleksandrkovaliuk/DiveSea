import React, { useEffect, useState } from "react";
import t from "./table.module.scss";
import { TableHeaders } from "./tableheader";
import { getCryptoList } from "../../service/api";
export const Table = ({ up }) => {
  const [coins, setCoins] = useState([]);

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
  const getApi = async () => {
    const res = await getCryptoList();
    localStorage.setItem("cryptoHistory", JSON.stringify(res));
    const oldHistory = JSON.parse(localStorage.getItem("cryptoHistory"));
    const newRes = oldHistory.map((item, index) => {
      return {
        ...item,
        rate: item.rate.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 1,
          maximumFractionDigits: 2,
        }),
        cap: formatMarketCap(item.cap),
        volume: formatMarketCap(item.volume),
      };
    });
    setCoins(newRes);
    setTimeout(() => {
      getApi();
    }, 1000);
  };
  useEffect(() => {
    getApi();
  }, []);
  return (
    <table className={t.table}>
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
              <span className={item.up ? t.price_up : t.price}>
                {item.rate}
              </span>
            </td>
            <td>
              <span className={t.otherInfo}>{item.cap}</span>
            </td>
            <td>
              <span className={t.otherInfo}>{item.volume}</span>
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
