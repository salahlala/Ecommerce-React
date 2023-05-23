import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const ScrollTop = () => {
  const { pathname } = useLocation();
  const [previousPathname, setPreviousPathname] = useState("");

  useEffect(() => {
    if (pathname !== previousPathname) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setPreviousPathname(pathname);
  }, [pathname, previousPathname]);
  return null;
};
export default ScrollTop;
