import classes from "./Shop.module.css";
import FilterProduct from "./FilterProduct";
import ShopProduct from "./ShopProduct";
import { BsGrid, BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { useState, useContext } from "react";
import { ProductContext } from "../../store/ProductContext";
const Shop = (products) => {
  const [changeStyle, setChangeStyle] = useState(false);
  const [changeGrid, setChangeGrid] = useState("grid-3");
  const [limit, setLimit] = useState(8);
  const { handleProductCategory, productCategory, initialProductCategory } =
    useContext(ProductContext);

  const sortProductPriceLow =
    productCategory &&
    productCategory.toSorted((a, b) => {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;

      return 0;
    });
  const sortProductPriceHigh =
    productCategory &&
    productCategory.toSorted((a, b) => {
      if (a.price < b.price) return 1;
      if (a.price > b.price) return -1;

      return 0;
    });

  const handleChange = (e) => {
    if (e.target.value === "low") {
      handleProductCategory(sortProductPriceLow);
    }

    if (e.target.value === "high") {
      handleProductCategory(sortProductPriceHigh);
    }
    if (e.target.value === "none") {
      handleProductCategory(initialProductCategory);
    }
  };
  const handleGetLimit = (limit) => {
    setLimit(limit + 4);
  };
  return (
    <div className="container mt-5 pt-5">
      <div className="border p-3 d-flex mb-4 align-items-center justify-content-between">
        <p className="m-0">
          Showing 1-
          <span className="me-2">
            {productCategory && productCategory.length < limit
              ? productCategory.length
              : limit}
          </span>
          results of
          <span className="ms-2">
            {productCategory ? productCategory.length : 0}
          </span>
        </p>

        <div className="d-flex  gap-md-3 gap-2 align-items-center">
          <div className="d-none d-lg-flex gap-2">
            <BsGrid
              className={`${classes.icon} ${
                changeGrid === "grid-6" && classes.active
              }`}
              // onClick={() => setChangeStyle(false)}
              onClick={() => {
                setChangeGrid("grid-6");
                setChangeStyle(false);
              }}
            />
            <BsFillGrid3X3GapFill
              className={`${classes.icon} ${
                changeGrid === "grid-4" && classes.active
              }`}
              onClick={() => {
                setChangeGrid("grid-4");
                setChangeStyle(false);
              }}
            />
            <TfiLayoutGrid4Alt
              className={`${classes.icon} ${
                changeGrid === "grid-3" && classes.active
              }`}
              onClick={() => {
                setChangeGrid("grid-3");
                setChangeStyle(false);
              }}
            />

            <FaBars
              className={`${classes.icon} ${changeStyle && classes.active}`}
              onClick={() => {
                setChangeGrid("");
                setChangeStyle(true);
              }}
            />
          </div>

          <select
            className={`px-3 py-2  border rounded-1 ${classes.select}`}
            onChange={handleChange}
          >
            <option value="none">None</option>
            <option value="low">Price low to high</option>
            <option value="high">Price high to low</option>
          </select>
        </div>
      </div>
      <div className="row flex-lg-row flex-column-reverse ">
        <div className="col-lg-3 mb-5">
          <FilterProduct />
        </div>
        <div className="col-lg-9 row p-0 m-0 position-relative ">
          <ShopProduct
            changeMode={changeStyle}
            changeGrid={changeGrid}
            getLimit={handleGetLimit}
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;
