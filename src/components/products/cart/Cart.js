import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import classes from "./cart.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import { ProductContext } from "../../../store/ProductContext";
import { ModalOveraly } from "../../modal/Modal";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";

const Cart = () => {
  const { cartOpen, handleCloseCart, cartItems, totalAmount } =
    useContext(ProductContext);
  const overlayContainer = document.getElementById("overlay");
  const classCart = `${classes.cart} ${cartOpen && classes.active}`;
  // {`${classes.cart} ${cartOpen && classes.active}`}
  return (
    <div className={classCart}>
      {ReactDOM.createPortal(<ModalOveraly />, overlayContainer)}
      <div className="d-flex p-3 justify-content-between align-items-center border-bottom">
        <h5 className="text-uppercase mb-0">shopping cart</h5>
        <AiOutlineClose onClick={handleCloseCart} className={classes.close} />
      </div>
      <div className="d-flex align-items-cetner flex-column ">
        {cartItems.length < 1 && <EmptyCart />}
        {cartItems.map((item) => (
          <CartItem product={item} key={item.id} />
        ))}
      </div>

      <div className="p-3">
        <div className="d-flex align-items-center justify-content-between ">
          <p className="fw-semibold fs-4">Subtotal:</p>
          <h4 className={classes.price}>${totalAmount.toFixed(2)}</h4>
        </div>
        <Link to={"/cart"} className={classes.btn}>
          View Cart
        </Link>
      </div>
    </div>
  );
};

export default Cart;
