import { useState, useEffect } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });
  const [isMedium, setIsMedium] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const baseFontSize = parseInt(
      getComputedStyle(document.body).getPropertyValue("font-size")
    );
    const mediumSize =
      parseInt(
        getComputedStyle(document.body).getPropertyValue("--breakpoint-medium")
      ) * baseFontSize;
    const smallSize =
      parseInt(
        getComputedStyle(document.body).getPropertyValue("--breakpoint-small")
      ) * baseFontSize;

    function onResize() {
      setWindowSize({
        x: window.innerWidth,
        y: window.innerHeight,
      });
      setIsMedium(window.innerWidth >= mediumSize);
      setIsSmall(window.innerWidth >= smallSize);
    }

    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { windowSize, isMedium, isSmall };
}
