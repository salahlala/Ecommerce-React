import useHttp from "../../hooks/use-http";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import classes from "./SearchProduct.module.css";
import { TfiReload } from "react-icons/tfi";
import empty from "../../images/empty.webp";
const SearchProduct = (props) => {
  const { sendRequest, isLoading } = useHttp();
  const [products, setProducts] = useState([]);
  const [initialLimit, setInitalLimit] = useState(8);
  const [filterValue, setFilterValue] = useState();
  const [lowPriceActive, setLowPriceActive] = useState(false);
  const [highPriceActive, setHighPriceActive] = useState(false);
  const { searchValue } = useParams();
  const handleFetchData = useCallback(() => {
    const sendData = (product) => {
      const products = product.products;
      const loadedProducts = [];
      for (let key in products) {
        loadedProducts.push(products[key]);
      }
      setProducts(loadedProducts);
      setInitalLimit(8);
    };
    sendRequest(
      {
        // url: `https://dummyjson.com/products/search?q=${searchValue}&limit=${initialLimit}`,
        url: `https://dummyjson.com/products/search?q=${searchValue}`,
      },
      sendData
    );
  }, [searchValue, sendRequest]);
  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  const increaseLimit = () => {
    setInitalLimit((prev) => prev + 4);
  };

  useEffect(() => {
    if (filterValue === "low") {
      setLowPriceActive(true);
      setHighPriceActive(false);
    }
    if (filterValue === "high") {
      setLowPriceActive(false);
      setHighPriceActive(true);
    }
    if (filterValue === "none") {
      setLowPriceActive(false);
      setHighPriceActive(false);
    }
  }, [filterValue]);

  const handleChange = (e) => {
    setFilterValue(e.target.value);
  };

  const sortProductPriceLow = products
    .toSorted((a, b) => {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;

      return 0;
    })
    .slice(0, initialLimit);
  const sortProductPriceHigh = products
    .toSorted((a, b) => {
      if (a.price < b.price) return 1;
      if (a.price > b.price) return -1;

      return 0;
    })
    .slice(0, initialLimit);
  const initialProducts = products && products.slice(0, initialLimit);

  const productResult = () => {
    if (lowPriceActive & !highPriceActive) {
      return sortProductPriceLow;
    }
    if (!lowPriceActive & highPriceActive) {
      return sortProductPriceHigh;
    }

    if (!lowPriceActive & !highPriceActive) {
      return initialProducts;
    }
  };

  return (
    <>
      {!isLoading && products.length > 0 && (
        <div
          className={`container pt-5 mt-5 position-relative ${classes["main-container"]}`}
        >
          <>
            <div className="border p-3 d-flex mb-4 align-items-center justify-content-between">
              <p className="m-0">
                Showing 1-{productResult().length} results of {products.length}
              </p>

              <select
                className={`px-3 py-2 border rounded-1 ${classes.select}`}
                onChange={handleChange}
              >
                <option value="none">None</option>
                <option value="low">Price low to high</option>
                <option value="high">Price high to low</option>
              </select>
            </div>
            <div className="row">
              {productResult().map((product) => (
                <ProductItem product={product} key={product.id} />
              ))}
            </div>
            {products.length > initialLimit && (
              <div className="d-flex align-items-center justify-content-center">
                <button
                  onClick={increaseLimit}
                  className={`text-center d-flex align-items-center gap-2 border text-black fs-5 m-5 px-5 py-2 ${classes["load-btn"]}`}
                >
                  <TfiReload />
                  Load More
                </button>
              </div>
            )}
          </>
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
      {!isLoading && products.length < 1 && (
        <div
          className={`text-center mt-5 pt-5 d-flex flex-column align-items-center justify-content-center ${classes.notfound}`}
        >
          <img src={empty} alt="..." />
          <p className={`fw-bold fs-3 pt-2`}>
            Sorry, we can not find this product
          </p>
        </div>
      )}
    </>
  );
};

export default SearchProduct;
