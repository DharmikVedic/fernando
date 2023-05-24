import { useEffect, useState } from "react";

export default function useMediaSIze() {
  const [state, setState] = useState(true);
  const handler = () => {
    const list = window.matchMedia("(max-width: 768px)");
    let check = list.matches && state ? true : false;
    setState(check);
  };
  useEffect(() => {
    handler(); // invoke once when mounting
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [state]);

  return { state };
}
