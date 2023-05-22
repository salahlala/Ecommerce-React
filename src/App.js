import "./App.css";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import useHttp from "./hooks/use-http";
import { useEffect, useState, useContext, useCallback } from "react";
import FavouriteProduct from "./components/products/FavouriteProduct";
import Main from "./components/ui/Main";
import ProductDetails from "./components/products/ProductDetails";
import { Route, Routes } from "react-router-dom";
import Modal from "./components/modal/Modal";
import Cart from "./components/products/cart/Cart";
import SearchProduct from "./components/products/SearchProduct";
import Shop from "./components/shop/Shop";
import NotFound from "./components/ui/NotFound";
import { ProductContext } from "./store/ProductContext";
import ViewCart from "./components/products/cart/ViewCart";
import { ToastContainer } from "react-toastify";
import { RiArrowUpSLine } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { sendRequest: fetchData, isLoading, error } = useHttp();
  const [products, setProducts] = useState([]);
  const [scrollBtn, setScrollBtn] = useState();
  const { isOpen, cartOpen } = useContext(ProductContext);
  const handleFetchData = useCallback(() => {
    const sendData = (product) => {
      const products = product.products;
      const loadedProducts = [];
      for (let key in products) {
        loadedProducts.push(products[key]);
      }

      setProducts(loadedProducts);
    };
    fetchData(
      {
        url: "https://dummyjson.com/products?limit=16",
      },
      sendData
    );
  }, [fetchData]);

  useEffect(() => {
    handleFetchData();
    const handleScrollBtnVisibilty = () => {
      window.pageYOffset > 300 ? setScrollBtn(true) : setScrollBtn(false);
    };

    window.addEventListener("scroll", handleScrollBtnVisibilty);

    return () => {
      window.removeEventListener("scroll", handleScrollBtnVisibilty);
    };
  }, [handleFetchData]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              products={products}
              onFetch={handleFetchData}
              isLoading={isLoading}
              error={error}
            />
          }
        />
        <Route path="productDetails/:productId" element={<ProductDetails />} />
        <Route path="/wishlist" element={<FavouriteProduct />} />
        <Route path="/cart" element={<ViewCart />} />
        <Route path="search/:searchValue" element={<SearchProduct />} />
        <Route path="shop/:categorys" element={<Shop products={products} />} />
        <Route path="/shop" element={<Shop products={products} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {isOpen && <Modal />}
      {cartOpen && <Cart />}
      <Footer />
      <div
        onClick={handleScrollToTop}
        className={`${
          scrollBtn && "active"
        } scroll-btn shadow position-fixed rounded-pill d-flex align-items-center justify-content-center`}
      >
        <RiArrowUpSLine />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
