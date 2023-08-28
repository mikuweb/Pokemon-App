import { useCallback, useRef } from "react";

type Props = {
  callback: () => void;
  delay?: number;
};

const useDebounce = ({ callback, delay = 500 }: Props) => {
  const timerRef = useRef<NodeJS.Timer | null>(null);

  const debounce = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      callback();
    }, delay);
  }, [delay, callback]);

  return debounce;
};

export default useDebounce;
