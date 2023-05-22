import Landing from "./Landing";
import Products from "../products/Products";
const Main = (props) => {
  return (
    <>
      <Landing />
      <Products products={props.products} isLoading={props.isLoading} />
      {props.error && (
        <d className="text-center d-flex align-items-cetner justify-content-center fw-bold fs-1 p-5">
          <p className="m-0 text-uppercase text-danger">{props.error}</p>
          <button
            className="btn btn-outline-primary p-2 ms-3"
            onClick={props.onFetch}
          >
            try again
          </button>
        </d>
      )}
    </>
  );
};

export default Main;
