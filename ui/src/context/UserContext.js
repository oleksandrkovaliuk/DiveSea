import { createContext } from "react";

export const UserContext = createContext({
  userInfo: null,
  setDataForUser: (values) => {},
});
