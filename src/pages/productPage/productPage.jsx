import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { formatMarketCap, formateRate } from "../../shared/formatMarketCap";
import p from "./productPage.module.scss";
import { BackArrow } from "../../icons/backArrow";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { Footer } from "../../components/footer";
export const ProductPage = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
    Legend
  );
  const [coin, setCoin] = useState([]);
  const [searchParams] = useSearchParams();
  const [timeArray, setTimeArray] = useState([]);
  const checkCoin = searchParams.get("coin");
  const checkCurrentTime = () => {
    const current_time = new Date();
    const newTimeArray = Array.from({ length: 16 }, (_, index) => {
      const previousHour = new Date(
        current_time.getTime() - (index + 1) * 60 * 60 * 1000
      );
      return `${previousHour
        .getHours()
        .toString()
        .padStart(2, "0")}:${previousHour
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    });
    if (
      current_time.getHours() * 60 + current_time.getMinutes() >
      parseInt(newTimeArray[0].replace(":", ""), 10)
    ) {
      newTimeArray[0] = `${current_time
        .getHours()
        .toString()
        .padStart(2, "0")}:${current_time
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    }
    setTimeArray(newTimeArray.reverse().sort((a,b) => a - b));
  };
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
    checkCurrentTime();
    const checkApi = setInterval(() => {
      getCurrentCoin();
      checkCurrentTime();
    }, 10000);
    return () => clearInterval(checkApi);
  }, []);
  const labels = timeArray;
  const coinRate = coin.map((item) => parseInt(item.rate)).slice(0.6);
  const mapValue = labels.map(() => faker.number.int({max: coinRate }));
  const data = {
    labels,
    datasets: [
      {
        fill: false,
        label: 0,
        data: mapValue,
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <>
      <div className={p.productPage_container}>
        <Link className={p.back_to_table} to="/">
          <BackArrow />
          Back To Table
        </Link>
        <div className={p.coin_info_conrainer}>
          {coin.map((item) => {
            return (
              <div key={item.name} className={p.coin_info_wrap}>
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
          <Line options={options} data={data} />
        </div>
      </div>
      <Footer />
    </>
  );
};
