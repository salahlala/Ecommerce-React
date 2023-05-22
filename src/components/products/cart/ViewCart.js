import classes from "./ViewCart.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../../store/ProductContext";
import { AiOutlineClose } from "react-icons/ai";
import ProductQuantitiy from "../ProductQuantity";
import EmptyCart from "./EmptyCart";
const ViewCart = () => {
  const { cartItems, handleRemoveCart, totalAmount } =
    useContext(ProductContext);

  // const handleDelete = (product) => {
  //   console.log(product);
  //   handleRemoveItem(product);
  // };
  return (
    <>
      <div
        className={`${classes.title} mt-5 pt-5 d-flex align-items-center justify-content-center`}
      >
        My Cart
      </div>
      {cartItems.length > 0 && (
        <div className="container mt-5 pt-5 mb-5">
          <div className="table-responsive">
            <table className="w-100 table text-center table-bordered align-middle">
              <thead>
                <tr>
                  <th scope="col">Images</th>
                  <th scope="col">Product</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col" className={classes["table-size"]}>
                    Quantity
                  </th>
                  <th scope="col">Total</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, ix) => (
                  <tr key={item.id}>
                    <th>
                      <Link to={`/productDetails/${item.id}`}>
                        <img
                          src={item.thumbnail}
                          className={classes.img}
                          alt={item.title}
                        />
                      </Link>
                    </th>
                    <th>
                      <Link
                        to={`/productDetails/${item.id}`}
                        className={`text-dark ${classes.link}`}
                      >
                        {item.title}
                      </Link>
                    </th>

                    <th>${item.price}</th>
                    <th>
                      <ProductQuantitiy
                        product={item}
                        quantity={item.quantity}
                        getQuantity={() => {}}
                      />
                    </th>
                    <th>${(item.price * item.quantity).toFixed(2)}</th>
                    <th>
                      <AiOutlineClose
                        className={classes.close}
                        onClick={() => handleRemoveCart(item)}
                      />
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row justify-content-end mt-5">
            <div className={`col-md-4 ${classes.checkout}`}>
              <h4 className="text-black fw-bold">Cart Totals</h4>
              <p className="border fw-bold p-3 d-flex justify-content-between">
                Total{" "}
                <span className="text-black-50">${totalAmount.toFixed(2)}</span>
              </p>
              <button className="border-0 p-3 ">Proceed to checkout</button>
            </div>
          </div>
        </div>
      )}
      {cartItems.length < 1 && <EmptyCart />}
    </>
  );
};

export default ViewCart;
