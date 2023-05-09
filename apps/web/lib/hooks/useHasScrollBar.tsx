import { useEffect, useState } from "react";

let isMounted = true;
let timeoutId: NodeJS.Timeout;

export const useHasScrollBar = () => {
  const [hasScrollbar, setHasScrollbar] = useState<boolean>(false);

  useEffect(() => {
    if (isMounted) {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        setHasScrollbar(scrollHeight > clientHeight);
      }, 200);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return { hasScrollbar };
};
