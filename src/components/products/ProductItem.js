import { Link } from "react-router-dom";
import classes from "./ProductItem.module.css";
import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../store/ProductContext";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import { toast } from "react-toastify";

import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineLink,
  AiOutlineEye,
} from "react-icons/ai";
const ProductItem = ({ product, chmode }) => {
  const {
    handleOpenModal,
    handleGetProduct,
    handleFavProducts,
    handleAddToCart,
    cartItems,
    items,
  } = useContext(ProductContext);
  const [active, setActive] = useState(false);
  const [click, setClick] = useState(false);
  const handlePreviewProduct = (product) => {
    handleGetProduct(product);
    handleOpenModal();
  };
  const addCartToast = () => {
    toast.success(`${product.title} added to cart`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const addWishlistToast = () => {
    toast.success(`${product.title} added to wishlist`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const removeWishListToast = () => {
    toast.error(`${product.title} removed from wishlist`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    let checkWishList = items.find((item) => item.id === product.id);
    let checkItem = cartItems.find((item) => item.id === product.id);
    if (checkItem) {
      setClick(true);
    } else {
      setClick(false);
    }
    if (checkWishList) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [items, product, cartItems]);

  const handleFaveProducts = (product) => {
    handleFavProducts(product);
    setActive((active) => !active);
    if (!active) {
      addWishlistToast();
    } else {
      removeWishListToast();
    }
  };
  const handleAddProduct = (product) => {
    const getProduct = { ...product, quantity: 1 };
    handleAddToCart(getProduct);
    setClick(true);
    addCartToast();
  };
  return (
    <>
      {product && (
        <div
          className={`${chmode === "grid-4" && "col-lg-4"} ${
            chmode === "grid-3" && "col-lg-3"
          } ${chmode ? "col-md-4" : "col-md-6"} ${
            chmode === "grid-6" && "col-lg-6"
          } ${!chmode && "col-lg-3"} 
            
            mb-5 position-relative overflow-hidden ${classes.box}`}
        >
          <div className={`position-relative overflow-hidden`}>
            <Link
              to={`/productDetails/${product.id}`}
              aria-label={`product-${product.id}`}
            >
              <img
                className={`${classes.img} m-img`}
                src={product.thumbnail}
                loading="lazy"
                alt=""
              />
            </Link>
            {!click && (
              <div
                className={`${classes.btn} text-center w-100 px-5 px-md-3 py-2 fw-semibold d-flex align-items-center justify-content-center gap-3 `}
                onClick={handleAddProduct.bind(null, product)}
              >
                <AiOutlineShoppingCart />
                Add to cart
              </div>
            )}
            {click && (
              <Link
                className={`${classes.btn} text-center w-100 px-5 px-md-3 py-2 fw-semibold d-flex align-items-center justify-content-center gap-3 `}
                to={"/cart"}
              >
                <AiOutlineShoppingCart />
                View Cart
              </Link>
            )}
          </div>
          <div>
            <Link
              className={`${classes.title} text-uppercase fw-semibold mt-2`}
              to={`/productDetails/${product.id}`}
              aria-label={`product-${product.id}`}
            >
              {product.title}
            </Link>
          </div>
          <div className="price">
            <p className="text-secondary-emphasis">${product.price}</p>
          </div>
          <div className={classes.icons}>
            <div className={`${classes.icon} ${active && classes.active}`}>
              <Tooltip title="Add To Favourite" placement="left-end" arrow>
                <Button
                  className={classes.tooltip}
                  onClick={() => handleFaveProducts(product)}
                >
                  <AiOutlineHeart />
                </Button>
              </Tooltip>
            </div>

            <div className={classes.icon}>
              <Tooltip title="Quick View" placement="left-end" arrow>
                <Button
                  className={classes.tooltip}
                  onClick={() => handlePreviewProduct(product)}
                >
                  <AiOutlineEye />
                </Button>
              </Tooltip>
            </div>

            <div className={classes.icon}>
              <Tooltip title="Product Details" placement="left-end" arrow>
                <Button className={classes.tooltip}>
                  <Link
                    to={`/productDetails/${product.id}`}
                    aria-label={`product-details`}
                  >
                    <AiOutlineLink />
                  </Link>
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItem;
