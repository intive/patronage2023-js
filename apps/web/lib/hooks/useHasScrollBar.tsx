import { useEffect, useState } from "react";

export const useHasScrollBar = () => {
  const [hasScrollbar, setHasScrollbar] = useState(false);

  useEffect(() => {
    const element = document.documentElement;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      const { scrollHeight, clientHeight } = element;
      setHasScrollbar(scrollHeight > clientHeight);
    });

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  return { hasScrollbar };
};
