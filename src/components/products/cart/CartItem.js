import classes from "./CartItem.module.css";
import { useContext } from "react";
import { ProductContext } from "../../../store/ProductContext";
import { AiOutlineClose } from "react-icons/ai";

import { Link } from "react-router-dom";
const CartItem = ({ product }) => {
  const { handleRemoveCart } = useContext(ProductContext);
  return (
    <div
      className={`d-flex align-items-center gap-3 border-bottom mb-4 p-3 position-relative`}
    >
      <div>
        <Link to={`/productDetails/${product.id}`}>
          <img src={product.thumbnail} alt="" className={classes.img} />
        </Link>
      </div>

      <div>
        <Link
          className={`fw-bold mb-0 ${classes.title} d-block text-black`}
          to={`/productDetails/${product.id}`}
        >
          {product.title}
        </Link>
        <span className={classes.price}>
          ${product.price}
          <span className="text-black-50">x{product.quantity}</span>
        </span>
      </div>

      <div className={classes.close}>
        <AiOutlineClose onClick={handleRemoveCart.bind(null, product)} />
      </div>
    </div>
  );
};

export default CartItem;
