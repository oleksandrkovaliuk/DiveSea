const MAIN_URL = process.env.REACT_APP_SERVER_PORT;

async function handleErrors(response) {
  if (!response.ok) {
    const parsedError = await response?.json();
    throw Error(parsedError?.errorText || response.statusText);
  }
  return response;
}

const headers = {
  "Content-Type": "application/json",
};
// post function
export const postRequest = async (url, data = {}) =>
  await fetch(`${MAIN_URL}/${url}`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(err);
    });
// get function
export const getRequest = async (url) =>
  fetch(`${MAIN_URL}/${url}`, {
    method: "GET",
  })
    .then(handleErrors)
    .then((res) => res.json())
    .catch((err) => {
      throw Error(err);
    });

// Function for each autorization step
export const loginUser = async ({ sendEmail, email }) =>
  postRequest("loginUser", { sendEmail, email });
export const signInUser = async ({ email, userName }) =>
  postRequest("signInUser", { email, userName });
export const changeUserValue = async ({ email, userName, url, id }) =>
  postRequest("updateUserValue", { email, userName, url, id });
export const checkCodeFromUser = async ({ codeFromUser, email }) =>
  postRequest("checkCodeFromUser", { codeFromUser, email });
export const getItems = async ({ param1, param2 }) => {
  const searchParams = new URLSearchParams();

  if (param1) {
    searchParams.append("param1", param1);
  }

  if (param2) {
    searchParams.append("param2", param2);
  }

  return getRequest(`getitems?${searchParams.toString()}`);
};

// export const workWithAutorization = async ({
//   reqType,
//   emailValue,
//   userName,
//   codeFromUser,
//   id,
//   sendEmail,
// }) =>
//   fetch(`${MAIN_URL}${reqType}`, {
//     method: "POST",
//     headers: {
//       ...headers,
//     },
//     body: JSON.stringify({
//       id: id,
//       email: emailValue,
//       userName: userName,
//       codeFromUser: codeFromUser,
//       sendEmail: sendEmail,
//     }),
//   })
//     .then(handleErrors)
//     .then((res) => res.json())
//     .catch((err) => {
//       throw Error(err);
//     });
