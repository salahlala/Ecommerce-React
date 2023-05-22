import classes from "./FavouriteProduct.module.css";
import { useContext } from "react";
import { ProductContext } from "../../store/ProductContext";
import { AiOutlineClose } from "react-icons/ai";
import { IoReturnUpBack } from "react-icons/io5";
import ProductQuantitiy from "./ProductQuantity";
import EmptyCart from "./cart/EmptyCart";
import { Link } from "react-router-dom";
const FavouriteProduct = () => {
  const {
    handleFavProducts,

    items,
    cartItems,
  } = useContext(ProductContext);
  const handleDeleteProduct = (product) => {
    handleFavProducts(product);
  };
  const handleGetQuantity = (product, counter) => {
    if (counter < 1) return;

    // handleFaveQuantity({ ...product, quantity: counter });
    // handleAddToCart(editProduct);
  };
  const filtered = cartItems.filter((item) =>
    items.some((ele) => item.id === ele.id)
  );

  let unMatching = items.filter(
    (ele) => !filtered.some((item) => ele.id === item.id)
  );
  const wishlist = filtered.concat(unMatching);
  return (
    <>
      <div
        className={`${classes.title} mt-5 pt-5 d-flex align-items-center justify-content-center`}
      >
        My Wishlist
      </div>
      {wishlist.length > 0 && (
        <div className="container mt-5 pt-5 mb-5">
          <div className={`p-3 mb-3 ${classes.shopping}`}>
            <Link
              to={`/shop`}
              className="text-black d-flex gap-2 align-items-center"
            >
              Continue Shopping
              <IoReturnUpBack className="fs-5" />
            </Link>
          </div>
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
                {wishlist.map((fav, ix) => (
                  <tr key={fav.id}>
                    <th>
                      <Link to={`/productDetails/${fav.id}`}>
                        <img
                          src={fav.thumbnail}
                          className={classes.img}
                          alt={fav.title}
                        />
                      </Link>
                    </th>
                    <th>
                      <Link
                        to={`/productDetails/${fav.id}`}
                        className={`text-dark ${classes.link}`}
                      >
                        {fav.title}
                      </Link>
                    </th>
                    <th>${fav.price}</th>
                    <th>
                      <ProductQuantitiy
                        product={fav}
                        getQuantity={handleGetQuantity.bind(null, fav)}
                        quantity={!fav.quantity ? 0 : fav.quantity}
                      />
                    </th>
                    <th>
                      $
                      {fav.quantity ? (fav.price * fav.quantity).toFixed(2) : 0}
                    </th>
                    <th>
                      <AiOutlineClose
                        className={classes.close}
                        onClick={() => handleDeleteProduct(fav)}
                      />
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to={"/cart"} className={classes.btn}>
            Go To Cart
          </Link>
        </div>
      )}
      {items.length < 1 && <EmptyCart />}
    </>
  );
};

export default FavouriteProduct;
