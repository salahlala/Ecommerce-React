import classes from "./ProductItem2.module.css";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineLink,
  AiOutlineEye,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../store/ProductContext";
const ProductItem2 = ({ product }) => {
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
          className={`m-0  col-lg-12 col-md-6  align-items-center justify-content-between mb-5 position-relative overflow-hidden ${classes.box}`}
        >
          <div className="row align-items-center border ms-0 me-0 h-100">
            <div className="col-lg-4 m-0 p-0">
              <Link
                to={`/productDetails/${product.id}`}
                aria-label="product-details"
              >
                <img
                  className={`${classes.img} m-img`}
                  src={product.thumbnail}
                  alt=""
                  loading="lazy"
                />
              </Link>
            </div>
            <div className="col-lg-8">
              <Link
                className={`${classes.title} mb-2 d-block text-uppercase fw-semibold mt-2`}
                to={`/productDetails/${product.id}`}
                aria-label="product-details"
              >
                {product.title}
              </Link>

              <span className="fw-semibold text-secondary">
                ${product.price}
              </span>
              <p className="text-black-50 lh-base mt-3">
                {product.description}
              </p>
              <div className="d-flex mb-lg-0 mb-4 align-items-center gap-3">
                {!click && (
                  <div
                    className={`${classes.btn} text-black border text-center px-lg-4 px-2 py-2 fw-semibold d-flex align-items-center justify-content-center gap-3 `}
                    onClick={handleAddProduct.bind(null, product)}
                  >
                    <AiOutlineShoppingCart />
                    Add to cart
                  </div>
                )}
                {click && (
                  <Link
                    className={`${classes.btn} border text-black text-center px-4 py-2 fw-semibold d-flex align-items-center justify-content-center gap-3 `}
                    to={"/cart"}
                  >
                    <AiOutlineShoppingCart />
                    View Cart
                  </Link>
                )}
                <div
                  className={`d-flex align-items-center  gap-2 ${classes.icons} `}
                >
                  <div
                    className={`${classes.icon}  border ${
                      active && classes.active
                    }`}
                  >
                    <Tooltip
                      className={classes.tooltips}
                      title="Add To Favourite"
                      placement="top"
                      arrow
                    >
                      <Button
                        className={classes.tooltip}
                        onClick={() => handleFaveProducts(product)}
                      >
                        <AiOutlineHeart />
                      </Button>
                    </Tooltip>
                  </div>

                  <div className={`${classes.icon} border `}>
                    <Tooltip title="Quick View" placement="top" arrow>
                      <Button
                        className={classes.tooltip}
                        onClick={() => handlePreviewProduct(product)}
                      >
                        <AiOutlineEye />
                      </Button>
                    </Tooltip>
                  </div>

                  <div className={`${classes.icon} border `}>
                    <Tooltip title="Product Details" placement="top" arrow>
                      <Button className={classes.tooltip}>
                        <Link
                          to={`/productDetails/${product.id}`}
                          aria-label="product-details"
                        >
                          <AiOutlineLink />
                        </Link>
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItem2;
