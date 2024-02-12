import { useRef, useMemo, useEffect } from "react";

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export const useDebouce = (callBeck, time) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = callBeck;
  }, [callBeck]);

  const debounceCallBeck = useMemo(() => {
    const func = (event) => {
      ref.current?.(event);
    };
    return debounce(func, time);
  }, [time]);
  return debounceCallBeck;
};
