import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { formatMarketCap, formateRate } from "../../shared/formatMarketCap";
import p from "./productPage.module.scss";
import { BackArrow } from "../../icons/backArrow";
export const ProductPage = () => {
  const [coin, setCoin] = useState([]);
  const [searchParams] = useSearchParams();
  const checkCoin = searchParams.get("coin");

  const getCurrentCoin = () => {
    const allCoins = JSON.parse(
      localStorage.getItem("cryptoHistoryFull")
    ).filter((item) => item.name === checkCoin);
    const currentCoin = allCoins.find((item) => item.name === checkCoin);
    const updatedCoin = allCoins.map((newCoin) => {
      return {
        ...currentCoin,
        up: newCoin.rate > currentCoin.rate,
        formatedRate: formateRate(newCoin.rate),
        formatedCap: newCoin.cap !== null ? formatMarketCap(newCoin.cap) : "-",
        formatedVolume:
          newCoin.volume !== null ? formatMarketCap(newCoin.volume) : "-",
      };
    });
    setCoin(updatedCoin);
  };
  useEffect(() => {
    getCurrentCoin();
    const checkApi = setInterval(() => {
      getCurrentCoin();
    }, 10000);
    return () => clearInterval(checkApi);
  }, []);
  return (
    <div className={p.productPage_container}>
      <Link className={p.back_to_table} to="/">
        <BackArrow />
        Back To Table
      </Link>
      {coin.map((item) => {
        return (
          <div className={p.coin_info_container}>
            <div className={p.main_info}>
              <div className={p.coins}>
                <img src={item.webp64} alt="coinAvatar"></img>
                <div className={p.coins_info}>
                  <h2 className={p.coin_code}>{item.code}</h2>
                  <h3 className={p.coin_name}>{item.name}</h3>
                </div>
              </div>
              <div className={p.price_per_coin}>
                <h2 className={item.up ? p.price_up : p.price_down}>
                  {item.formatedRate}
                </h2>
                <h3 className={p.perPieace}>1 {item.code}</h3>
              </div>
            </div>
            <div className={p.restInfo}>
              <div className={p.restInfoBlocks}>
                <span className={p.title}>Market Cap</span>
                <span className={p.value}>{item.formatedCap}</span>
              </div>
              <div className={p.restInfoBlocks}>
                <span className={p.title}>Volume</span>
                <span className={p.value}>{item.formatedVolume}</span>
              </div>
              <div className={p.restInfoBlocks}>
                <span className={p.title}>All time heigh</span>
                <span className={p.value}>
                  {"$" +
                    item.allTimeHighUSD.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
