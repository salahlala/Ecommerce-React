import ProductItem from "./ProductItem";
import Skeleton from "@mui/material/Skeleton";
import { v4 as uuid } from "uuid";
const Products = (props) => {
  const { products, isLoading } = props;

  const myArray = new Array(8).fill("");
  return (
    <div className="container mt-5">
      <div className="row">
        {products.length < 1 &&
          isLoading &&
          myArray.map((ele, ix) => {
            return (
              <div className="col-lg-3 mb-5" key={uuid()}>
                <Skeleton variant="rectangular" width={210} height={118} />
                <Skeleton />
                <Skeleton width="50%" />
              </div>
            );
          })}
        {products.map((product, ix) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
