import { useNavigate } from "react-router-dom";

export const NavigationBack = () => {
  const navigation = useNavigate();

  return () => navigation(-1);
};
