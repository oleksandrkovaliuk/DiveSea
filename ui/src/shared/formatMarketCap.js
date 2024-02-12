export const formatMarketCap = (cap) => {
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
        minimumFractionDigits: 1,
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
      maximumFractionDigits: 3,
    });
  }
};
export const formateRate = (coin) => {
  return coin.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
};