import classes from "./Header.module.css";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductContext } from "../../store/ProductContext";
const Header = () => {
  const { items, handleOpenCart, totalQuantity } = useContext(ProductContext);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim().length === 0) return;
    navigate(`/search/${inputValue}`);
    setInputValue("");
  };
  const handleInputChange = (e) => {
    setInputValue(e.currentTarget.value);
  };
  return (
    <div
      className={`${classes["main-header"]} position-fixed top-0 w-100  border-bottom d-flex align-items-center`}
    >
      <div className="container">
        <div className="row">
          <div className={`${classes.head} col-md-6 col-8`}>
            <Link
              to={"/"}
              className={`d-flex align-items-center ${classes.logo}`}
            >
              <h1 className={`text-uppercase mb-0 `}>economya</h1>
            </Link>
            <ul className={classes.links}>
              <li className={`fw-semibold ${classes.size}`}>
                <Link to={"/"} className={classes.link}>
                  Home
                </Link>
              </li>
              <li className={`fw-semibold ${classes.size}`}>
                <Link to={`/shop`} className={classes.link}>
                  Shop
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-4">
            <div className="d-flex justify-content-end gap-lg-3 gap-4 align-items-center h-100">
              <form
                onSubmit={handleSearchSubmit}
                className="w-50 d-lg-flex align-items-center position-relative d-none"
              >
                <input
                  placeholder="Search for products"
                  className="w-100 py-2 px-4 rounded-pill border"
                  onChange={handleInputChange}
                  value={inputValue}
                />
                <button
                  type="submit"
                  className={`position-absolute border-0 bg-transparent ${classes.search}`}
                >
                  <AiOutlineSearch className="fs-4" />
                </button>
              </form>
              <div className="position-relative">
                <Link to="/wishlist" className="text-black">
                  <AiOutlineHeart className={` fw-semibold ${classes.size}`} />
                  <span
                    className={`${classes.count} rounded-pill position-absolute d-flex align-items-center justify-content-center`}
                  >
                    {items.length}
                  </span>
                </Link>
              </div>
              <div
                className={`position-relative ${classes["cart-btn"]}`}
                onClick={handleOpenCart}
              >
                <AiOutlineShoppingCart
                  className={`fw-semibold ${classes.size}`}
                />
                <span
                  className={`${classes.count} rounded-pill position-absolute d-flex align-items-center justify-content-center`}
                >
                  {totalQuantity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
