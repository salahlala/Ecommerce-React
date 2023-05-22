import classes from "./Modal.module.css";
import ProductSlide from "../products/ProductSlide";
import useHttp from "../../hooks/use-http";
import { ProductContext } from "../../store/ProductContext";
import { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import ProdutContent from "../products/ProductContent";
import { AiOutlineClose } from "react-icons/ai";

export const ModalOveraly = () => {
  const { handleCloseModal, handleCloseCart } = useContext(ProductContext);

  return (
    <div
      className="overlay"
      onClick={() => {
        handleCloseModal();
        handleCloseCart();
      }}
    ></div>
  );
};
const Modal = () => {
  const { productData, handleCloseModal } = useContext(ProductContext);
  let overlayContainer = document.getElementById("overlay");
  const { sendRequest: fetchData, isLoading } = useHttp();
  const [productItems, setProductItems] = useState();
  useEffect(() => {
    const sendRequest = (data) => {
      setProductItems(data);
    };
    fetchData(
      {
        url: `https://dummyjson.com/products/${productData.id}`,
      },
      sendRequest
    );
  }, [fetchData, productData]);
  return (
    <>
      <div className={`${classes.modal} p-4 position-fixed`}>
        {productItems && (
          <div className={`row `}>
            {ReactDOM.createPortal(<ModalOveraly />, overlayContainer)}
            <div className="col-lg-6 mb-5 ">
              <ProductSlide products={productItems} />
            </div>
            <AiOutlineClose
              className={`position-absolute end-0 ${classes.close}`}
              onClick={handleCloseModal}
            />
            <div className="col-lg-6 position-relative">
              <ProdutContent product={productItems} show={true} />
            </div>
          </div>
        )}
        {isLoading && (
          <div
            className={`${classes.spinner} d-flex justify-content-center align-items-center flex-column`}
          >
            <div className={`spinner-border `} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;
