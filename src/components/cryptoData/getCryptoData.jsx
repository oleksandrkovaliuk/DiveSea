import React, { Fragment, useEffect, useState } from "react";
export const CryptoData = ({ coins, rate, coin }) => {
  const [coinInfo, onCoinInfoChange] = useState({ coin: "", rate: "" });
  useEffect(() => {
    const apiUrl = "https://api.livecoinwatch.com/coins/single";
    const accessKey = "fcb4bb0c-76c7-4d5c-bd66-591451975a29";
    const requestData = {
      currency: "USD",
      code: coins,
      meta: true,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": accessKey,
      },
      body: JSON.stringify(requestData),
    };
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, requestOptions);
        const result = await response.json();
        const newVolume = result;
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
