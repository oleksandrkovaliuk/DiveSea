import React, { Fragment, useEffect, useState } from "react";
import { getCrypto } from "../../service/api";

export const CryptoData = ({ coins, rate, coin }) => {
  const [coinInfo, onCoinInfoChange] = useState({ coin: "", rate: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newVolume = await getCrypto({ coins: 'BTC' });
        let formattedNumber = coinInfo.rate
          .toLocaleString("en-US", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2,
          })
          .replace(/,/g, ".")
          .substring(0, 8);
        onCoinInfoChange({
          coin: newVolume.name,
          rate: formattedNumber,
        });
        if (coinInfo.rate !== formattedNumber) {
          if (parseFloat(coinInfo.rate) > parseFloat(formattedNumber)) {
            onCoinInfoChange({
              coin: newVolume.name,
              rate: formattedNumber,
            });
          } else if (parseFloat(coinInfo.rate) < parseFloat(formattedNumber)) {
            onCoinInfoChange({
              coin: newVolume.name,
              rate: formattedNumber,
            });
          }
        }
      } catch (error) {
        console.error("Fetching data failed", error);
      }
    };
    // if (coins !== '') {
    //   const setIntervalId = setInterval(fetchData, 1000);

    //   return () => {
    //     clearInterval(setIntervalId);
    //   };
    // }
  }, [coinInfo, coins]);
  return (
    <Fragment>
      <span style={{ display: rate ? "none" : "" }}>{coinInfo.coin}</span>
      <span style={{ display: coin ? "none" : "" }}>{coinInfo.rate}</span>
    </Fragment>
  );
};
