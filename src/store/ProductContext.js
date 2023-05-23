import {
  createContext,
  useState,
  useReducer,
  useCallback,
  useEffect,
} from "react";
const ProductContext = createContext();
const defaultItems = {
  items: [],
  productQuantity: [],
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD_FAV") {
    const checkProduct = state.items.find(
      (item) => item.id === action.product.id
    );

    let updateItems;
    if (checkProduct) {
      updateItems = state.items.filter(
        (product) => product.id !== checkProduct.id
      );
    } else {
      updateItems = state.items.concat(action.product);
    }

    return {
      items: updateItems,
      productQuantity: state.productQuantity,
      cartItems: state.cartItems,
      totalAmount: state.totalAmount,
      totalQuantity: state.totalQuantity,
    };
  }

  if (action.type === "ADD_CART") {
    const updateTotalAmount =
      state.totalAmount +
      action.productItem.price * action.productItem.quantity;
    const totalQuantity = state.totalQuantity + action.productItem.quantity;
    const existIndex = state.cartItems.findIndex(
      (item) => item.id === action.productItem.id
    );

    const existItem = state.cartItems[existIndex];
    let updateItems;
    if (existItem) {
      const updateItem = {
        ...existItem,
        quantity: existItem.quantity + action.productItem.quantity,
      };
      updateItems = [...state.cartItems];
      updateItems[existIndex] = updateItem;
    } else {
      updateItems = state.cartItems.concat(action.productItem);
    }
    return {
      items: state.items,
      productQuantity: state.productQuantity,
      cartItems: updateItems,
      totalAmount: updateTotalAmount,
      totalQuantity: totalQuantity,
    };
  }

  if (action.type === "REMOVE_CART") {
    const existIndex = state.cartItems.findIndex(
      (item) => item.id === action.productItem.id
    );
    const updateTotalAmount =
      state.totalAmount -
      action.productItem.price * action.productItem.quantity;
    const totalQuantity = state.totalQuantity - action.productItem.quantity;

    const existItem = state.cartItems[existIndex];
    let updateItems;
    if (existItem) {
      updateItems = state.cartItems.filter(
        (item) => item.id !== action.productItem.id
      );
    }

    return {
      items: state.items,
      productQuantity: state.productQuantity,
      cartItems: updateItems,
      totalAmount: updateTotalAmount,
      totalQuantity: totalQuantity,
    };
  }

  if (action.type === "QUANTITY") {
    const existIndex = state.productQuantity.findIndex(
      (item) => item.id === action.product.id
    );

    const existItem = state.productQuantity[existIndex];
    let updateItems;
    if (existItem) {
      const updateItem = { ...existItem, quantity: action.product.quantity };

      updateItems = [...state.productQuantity];
      updateItems[existIndex] = updateItem;
    } else {
      updateItems = state.productQuantity.concat(action.product);
    }
    return {
      items: state.items,
      productQuantity: updateItems,
      cartItems: state.cartItems,
      totalAmount: state.totalAmount,
      totalQuantity: state.totalQuantity,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const existIndex = state.cartItems.findIndex(
      (item) => item.id === action.product.id
    );
    const existItem = state.cartItems[existIndex];
    const updateTotalAmount = state.totalAmount - action.product.price;
    const updateTotalQuantity = state.totalQuantity - 1;
    let updateItems;
    if (existItem) {
      if (existItem.quantity < 1) return;
      const updateItem = { ...existItem, quantity: existItem.quantity - 1 };
      updateItems = [...state.cartItems];
      updateItems[existIndex] = updateItem;
    }

    return {
      items: state.items,
      productQuantity: state.productQuantity,
      cartItems: updateItems,
      totalAmount: updateTotalAmount,
      totalQuantity: updateTotalQuantity,
    };
  }

  if (action.type === "LOAD_DATA") {
    const updateProducts = state.cartItems.concat(action.products);
    const updateTotalAmount = updateProducts
      .map((product) => product.price * product.quantity)
      .reduce((acc, curr) => acc + curr, 0);
    const updateTotalQuantity = updateProducts
      .map((product) => product.quantity)
      .reduce((acc, curr) => acc + curr, 0);

    return {
      items: state.items,
      productQuantity: state.productQuantity,
      cartItems: updateProducts,
      totalAmount: updateTotalAmount,
      totalQuantity: updateTotalQuantity,
    };
  }

  if (action.type === "LOAD_WISHLIST") {
    const updateWishlist = state.items.concat(action.wishlist);
    return {
      items: updateWishlist,
      productQuantity: state.productQuantity,
      cartItems: state.cartItems,
      totalAmount: state.totalAmount,
      totalQuantity: state.totalQuantity,
    };
  }

  return defaultItems;
};

const ProductState = ({ children }) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultItems);
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [productData, setProductData] = useState();
  const [productCategory, setProductCategory] = useState();
  const [initialProductCategory, setInitialProductCategory] = useState();

  useEffect(() => {
    const productItems = JSON.parse(localStorage.getItem("productData"));
    const wishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (wishlist) {
      dispatchCart({ type: "LOAD_WISHLIST", wishlist: wishlist });
    }
    if (productItems) {
      dispatchCart({ type: "LOAD_DATA", products: productItems });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("productData", JSON.stringify(cartState.cartItems));
    localStorage.setItem("wishlist", JSON.stringify(cartState.items));
  }, [cartState.cartItems, cartState.items]);

  const mainBody = document.querySelector("body");
  const handleCloseModal = () => {
    setIsOpen(false);
    mainBody.classList.remove("hidden");
  };
  const handleOpenModal = () => {
    mainBody.classList.add("hidden");
    setIsOpen(true);
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };
  const handleOpenCart = () => {
    setCartOpen(true);
  };

  const handleGetProduct = (product) => {
    setProductData(product);
  };

  const handleProductCategory = useCallback((product) => {
    setProductCategory(product);
  }, []);

  const handleInitialProductCategory = useCallback((product) => {
    setInitialProductCategory(product);
  }, []);

  const handleFavProducts = (product) => {
    dispatchCart({ type: "ADD_FAV", product: product });
  };

  const handleAddToCart = (product) => {
    dispatchCart({ type: "ADD_CART", productItem: product });
  };

  const handleRemoveCart = (product) => {
    dispatchCart({ type: "REMOVE_CART", productItem: product });
  };
  const handleRemoveItem = (product) => {
    dispatchCart({ type: "REMOVE_ITEM", product: product });
  };

  const handleFaveQuantity = (product) => {
    dispatchCart({ type: "QUANTITY", product: product });
  };

  return (
    <ProductContext.Provider
      value={{
        items: cartState.items,
        isOpen,
        cartOpen,
        handleCloseModal,
        handleOpenModal,
        handleCloseCart,
        handleOpenCart,

        handleGetProduct,
        handleFavProducts,
        handleProductCategory,
        handleInitialProductCategory,
        initialProductCategory,
        productCategory,
        productData,

        handleAddToCart,
        handleRemoveCart,
        handleFaveQuantity,
        handleRemoveItem,
        cartItems: cartState.cartItems,
        // cartItems: testData,
        totalAmount: cartState.totalAmount,
        totalQuantity: cartState.totalQuantity,
        productQuantity: cartState.productQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductState };
