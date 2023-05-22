import classes from "./ProductQuantitiy.module.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../store/ProductContext";

import { toast } from "react-toastify";

const ProductQuantitiy = (props) => {
  const { getQuantity, quantity, product } = props;
  const [counter, setCounter] = useState(quantity || 1);
  const { handleRemoveItem, handleAddToCart } = useContext(ProductContext);
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
  useEffect(() => {
    if (quantity === 0) {
      setCounter(0);
    }
  }, [quantity]);

  const handleIncrease = () => {
    if (product) {
      if (product.quantity > product.stock) {
        // No more quantity available for this product!
        quantityMesageToast();
        return;
      } else {
        handleAddToCart({ ...product, quantity: 1 });
      }
    }
    setCounter((count) => count + 1);
    getQuantity(counter + 1);
  };

  const handleDecrease = () => {
    if (counter < 2) return;
    setCounter((count) => count - 1);
    getQuantity(counter - 1);

    if (product) {
      handleRemoveItem(product);
    }
  };

  return (
    <div className={`mt-3 position-relative ${classes.quantity}`}>
      <span className={classes.btns} onClick={handleDecrease}>
        <AiOutlineMinus />
      </span>
      <input type="text" className={classes.counter} readOnly value={counter} />
      <span className={classes.btns} onClick={handleIncrease}>
        <AiOutlinePlus />
      </span>
    </div>
  );
};

export default ProductQuantitiy;
