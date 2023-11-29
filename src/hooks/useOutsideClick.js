import { useEffect } from "react";
import { useRef } from "react";

export function useOutsideClick(handler, eventCapture = true) {
  const ref = useRef();

  useEffect(
    function () {
      const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      };

      document.addEventListener("click", handleClick, eventCapture);
      return () =>
        document.removeEventListener("click", handleClick, eventCapture);
    },
    [handler, eventCapture]
  );
  return ref;
}
