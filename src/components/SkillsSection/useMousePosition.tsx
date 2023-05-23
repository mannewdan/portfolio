import { useState, useEffect } from "react";

export default function useMousePosition() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  });

  return [mousePos];
}
