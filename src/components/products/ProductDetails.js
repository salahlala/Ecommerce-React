import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { useEffect, useState, useContext, memo, useCallback } from "react";
import { ProductContext } from "../../store/ProductContext";
import ProductSlide from "./ProductSlide";
import ProdutContent from "./ProductContent";
import classes from "./ProductDetails.module.css";
const ProductDetails = () => {
  const { productId } = useParams();
  const { sendRequest: fetchData, isLoading, error } = useHttp();
  const [products, setProducts] = useState(null);
  const { handleCloseModal, handleCloseCart } = useContext(ProductContext);
  const handleFetchProducts = useCallback(async () => {
    const sendRequest = (product) => {
      setProducts(product);
    };
    fetchData(
      {
        url: `https://dummyjson.com/products/${productId}`,
      },
      sendRequest
    );
  }, [fetchData, productId]);
  useEffect(() => {
    handleFetchProducts().then(() => {
      handleCloseModal();
      handleCloseCart();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleFetchProducts]);

  return (
    <>
      {!isLoading && products && (
        <div className={`container mt-5 pt-5 ${classes["details-container"]}`}>
          <div className="row gap-lg-4">
            <div className="col-lg-6 mb-5">
              <ProductSlide products={products} />
            </div>
            <div className="col-lg-5">
              <ProdutContent product={products} show={false} />
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div
          className={`${classes.spinner} d-flex justify-content-center align-items-center flex-column`}
        >
          <div className={`spinner-grow `} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!isLoading && error && (
        <p className="py-5 my-5 fw-semibold text-center fs-3 text-danger text-capitalize">
          {error}
          <button
            onClick={handleFetchProducts}
            className="btn btn-info text-capitalize"
          >
            try again
          </button>
        </p>
      )}
    </>
  );
};

export default memo(ProductDetails);
