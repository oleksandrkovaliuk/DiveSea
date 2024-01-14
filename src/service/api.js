const apiUrlList = "https://api.livecoinwatch.com/coins/list";
const apiUrl = "https://api.livecoinwatch.com/coins/single";
const accessKey = "fcb4bb0c-76c7-4d5c-bd66-591451975a29";

export const getCrypto = async ({ coins }) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": accessKey,
      },
      body: JSON.stringify({
        currency: "USD",
        code: coins,
        meta: true,
      }),
    };

    const response = await fetch(apiUrl, requestOptions);
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const getCryptoList = async () => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": accessKey,
    },
    body: JSON.stringify({
      currency: "USD",
      sort: "rank",
      order: "ascending",
      offset: 0,
      limit: 11,
      meta: true,
    }),
  };
  return await fetch(apiUrlList, requestOptions);
};
