const apiUrlList = "https://api.livecoinwatch.com/coins/list";
const accessKey = "fcb4bb0c-76c7-4d5c-bd66-591451975a29";
export const getCryptoList = async (setSort , setRank, signal) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": accessKey,
    },
    signal: signal,
    body: JSON.stringify({
      currency: "USD",
      sort: setSort,
      order: setRank,
      offset: 0,
      limit: 11,
      meta: true,
    }),
  };
  return (await fetch(apiUrlList, requestOptions)).json();
};
