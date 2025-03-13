import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext(null);

export default function WindowContext({ children }) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function setWindowWidth() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", setWindowWidth);
    return () => {
      window.removeEventListener("resize", setWindowWidth);
    };
  }, []);

  return (
    <WindowSize.Provider value={{ windowSize, setWindowSize }}>
      {children}
    </WindowSize.Provider>
  );
}
