import classes from "./EmptyCart.module.css";
import empty from "../../../images/empty.webp";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div
      className={`pt-5 mt-5 mb-5  d-flex flex-column align-items-center justify-content-center gap-2 `}
    >
      <img src={empty} alt="..." />
      <p className="text-capitalize mb-0">your cart is empty</p>
      <Link
        to="/shop"
        className={`text-capitalize ${classes.shopBtn} fw-semibold px-4 py-2`}
      >
        go to shop
      </Link>
    </div>
  );
};

export default EmptyCart;
