import classes from "./ProductContent.module.css";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../store/ProductContext";
import ProductQuantitiy from "./ProductQuantity";

import { toast } from "react-toastify";

import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineLink,
} from "react-icons/ai";
const ProdutContent = (props) => {
  const { product, show } = props;
  const [quantity, setQuantity] = useState(1);
  const [active, setActive] = useState(false);

  const { items, handleFavProducts, handleAddToCart, cartItems } =
    useContext(ProductContext);

  useEffect(() => {
    if (items.find((item) => item.id === product.id)) {
      setActive(true);
    }
  }, [items, product]);
  // const handleIncrease = () => {
  //   setCounter((count) => count + 1);
  // };
  // const handleDecrease = () => {
  //   if (counter < 1) return;
  //   setCounter((count) => count - 1);
  // };
  const addCartToast = () => {
    toast.success(`${quantity} ${product.title} added to cart`, {
      position: "top-right",
      autoClose: 2500,
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
      autoClose: 2500,
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
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const quantityMesageToast = () => {
    toast.error(`No more quantity available for this product!`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleFavouiteProducts = async (products) => {
    handleFavProducts(products);
    setActive((actives) => !actives);
    if (!active) {
      addWishlistToast();
    } else {
      removeWishListToast();
    }
  };
  const handleGetQuantity = (quantity) => {
    setQuantity(quantity);
  };
  const handleForm = () => {
    const getProduct = { ...product, quantity: quantity };
    const currentProduct = cartItems.find((item) => item.id === getProduct.id);
    if (quantity > getProduct.stock) {
      quantityMesageToast();
      return;
    }

    if (currentProduct) {
      if (
        currentProduct.quantity > currentProduct.stock ||
        currentProduct.quantity + quantity > currentProduct.stock
      ) {
        quantityMesageToast();

        return;
      }
    }
    handleAddToCart(getProduct);

    addCartToast();
  };
  return (
    <>
      <p
        className={`py-1 px-2 rounded-1 border text-capitalize fw-semibold ${classes.stock}`}
      >
        {product.stock} in stock
      </p>
      <h1 className="fw-semibold">{product.title}</h1>
      <p className="text-black-50 fw-semibold">{product.description}</p>
      <span className="fw-semibold fs-4">${product.price}</span>

      <ProductQuantitiy getQuantity={handleGetQuantity} />
      <div className={classes.actions}>
        <button className={classes.cart} onClick={handleForm}>
          <AiOutlineShoppingCart />
          Add to cart
        </button>

        <Tooltip title="Add To Favourite" placement="top" arrow>
          <Button
            className={`${classes.tooltip} ${active && classes.active}`}
            onClick={() => handleFavouiteProducts(product)}
          >
            <AiOutlineHeart />
          </Button>
        </Tooltip>
        {show && (
          <Tooltip title="Product Details" placement="top" arrow>
            <Link to={`/productDetails/${product.id}`}>
              <Button className={classes.tooltip}>
                <AiOutlineLink />
              </Button>
            </Link>
          </Tooltip>
        )}
      </div>
    </>
  );
};

export default ProdutContent;
