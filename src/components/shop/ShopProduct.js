import useHttp from "../../hooks/use-http";
import { useEffect, useCallback, useState } from "react";
import ProductItem from "../products/ProductItem";
import ProductItem2 from "../products/ProductItem2";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../store/ProductContext";
import { Fragment } from "react";
import { v4 as uuid } from "uuid";
import { TfiReload } from "react-icons/tfi";
import classes from "./Shop.module.css";
const ShopProduct = ({ changeMode, changeGrid, getLimit }) => {
  const {
    handleProductCategory,
    productCategory,
    handleInitialProductCategory,
  } = useContext(ProductContext);
  const { sendRequest: fetchData, isLoading } = useHttp();
  const [initialLimit, setInitialLimit] = useState(8);
  const { categorys } = useParams();

  const handleGetData = useCallback(() => {
    const sendData = (product) => {
      const products = product.products;
      const loadedProducts = [];
      for (let key in products) {
        loadedProducts.push({ ...products[key], id2: uuid() });
      }
      handleProductCategory(loadedProducts);
      handleInitialProductCategory(loadedProducts);
      // setProducts(loadedProducts);
    };
    fetchData(
      {
        url: `${
          categorys
            ? `https://dummyjson.com/products/category/${categorys}`
            : "https://dummyjson.com/products"
        }`,
      },
      sendData
    );
  }, [
    categorys,
    handleProductCategory,
    fetchData,
    handleInitialProductCategory,
  ]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const productLimit =
    productCategory && productCategory.slice(0, initialLimit);

  const handleIncreaseLimit = () => {
    setInitialLimit((prev) => prev + 4);
    getLimit(initialLimit);
  };

  return (
    <>
      {productLimit && !isLoading && (
        <>
          {productLimit.map((product, ix) => (
            <Fragment key={product.id2.slice(0, 6)}>
              {changeMode && (
                <ProductItem2 product={product} key={product.id2} />
              )}
              {!changeMode && (
                <ProductItem
                  product={product}
                  key={product.id}
                  chmode={changeGrid}
                />
              )}
              {/* {<ProductItem3 product={product} chmode={changeGrid} />} */}
              {/* )} */}
            </Fragment>
          ))}

          {productCategory.length > initialLimit && (
            <div className="d-flex align-items-center justify-content-center">
              <button
                onClick={handleIncreaseLimit}
                className={`text-center d-flex align-items-center gap-2 border text-black fs-5 m-5 px-5 py-2 ${classes["load-btn"]}`}
              >
                <TfiReload />
                Load More
              </button>
            </div>
          )}
        </>
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
    </>
  );
};

export default ShopProduct;
