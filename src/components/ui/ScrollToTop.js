import { useEffect, useCallback, useState } from "react";
import { RiArrowUpSLine } from "react-icons/ri";
const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setShowButton(scrollTop > 0);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      onClick={handleClick}
      className={`${
        showButton && "active"
      } scroll-btn shadow position-fixed rounded-pill d-flex align-items-center justify-content-center`}
    >
      <RiArrowUpSLine />
    </div>
  );
};

export default ScrollToTop;
