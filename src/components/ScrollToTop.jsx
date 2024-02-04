import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export const ScrollToTop = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const scrollToNode = searchParams.get("scrollTo");

  useEffect(() => {
    const scrollValue =
      document.querySelector(`#${scrollToNode}`)?.getBoundingClientRect()?.y ||
      0;
    // console.log(scrollValue, " scrollValue");
    // window.scrollTo(0, scrollValue);
  }, [scrollToNode, location]);

  return null;
};
