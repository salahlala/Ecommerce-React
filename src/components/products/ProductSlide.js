import classes from "./ProductSlide.module.css";
import { useEffect, useState } from "react";
const ProductSlide = ({ products }) => {
  const images = products.images;
  const checkImages = images && images.length > 1 ? images : null;
  const [imgSelect, setImgSelect] = useState(null);
  const handleImgSelect = (event) => {
    let allImgs = document.querySelectorAll("img.slide-img");

    allImgs.forEach((img) => img.classList.remove(classes.active));
    event.currentTarget.classList.add(classes.active);
    setImgSelect(event.currentTarget.src);
  };

  useEffect(() => {
    let allImgs = document.querySelectorAll("img.slide-img");
    allImgs.forEach((img) => img.classList.remove(classes.active));

    const lastImg = allImgs[allImgs.length - 1];
    if (lastImg) {
      if (lastImg.src.includes("thumbnail")) {
        lastImg.classList.add(classes.active);
      } else {
        lastImg.classList.remove(classes.active);
      }
    }
  }, [products]);

  return (
    <>
      <div className="img">
        <img
          src={imgSelect ? imgSelect : products.thumbnail}
          alt=""
          className={`${classes["main-img"]} m-img`}
        />
      </div>
      <div className="row mt-3">
        {checkImages &&
          checkImages.map((img, ix) => {
            return (
              <div
                key={ix}
                className={`col-lg-${
                  checkImages.length > 4 ? 3 : 12 / checkImages.length
                } col-${
                  checkImages.length > 4 ? 4 : 12 / checkImages.length
                } mb-3`}
              >
                <img
                  alt=""
                  src={img}
                  className={`${classes.img} slide-img`}
                  onClick={handleImgSelect}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProductSlide;
