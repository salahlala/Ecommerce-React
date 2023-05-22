import classes from "./FilterProduct.module.css";
import { Link } from "react-router-dom";
const FilterProduct = (props) => {
  return (
    <div>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Womens
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <ul className="accordion-body d-flex flex-column">
              <Link to={`/shop/womens-dresses`}>
                <li
                  className={`mb-2 ${classes.cat}`}
                  data-value="womens-dresses"
                >
                  Dresses
                </li>
              </Link>
              <Link to={`/shop/womens-shoes`}>
                <li className={`mb-2 ${classes.cat}`} data-value="womens-shoes">
                  shoes
                </li>
              </Link>
              <Link to={`/shop/womens-watches`}>
                <li
                  className={`mb-2 ${classes.cat}`}
                  data-value="womens-watches"
                >
                  watches
                </li>
              </Link>
              <Link to={`/shop/womens-bags`}>
                <li className={`mb-2 ${classes.cat}`} data-value="womens-bags">
                  bags
                </li>
              </Link>
              <Link to={`/shop/womens-jewellery`}>
                <li
                  className={`mb-2 ${classes.cat}`}
                  data-value="womens-jewellery"
                >
                  jewellery
                </li>
              </Link>
              <Link to={`/shop/skincare`}>
                <li className={`mb-2 ${classes.cat}`} data-value="skincare">
                  Skincare
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Mens
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <ul className="accordion-body d-flex flex-column">
              <Link to={`/shop/mens-shoes`}>
                <li className={`mb-2 ${classes.cat}`} data-value="mens-shoes">
                  Shoes
                </li>
              </Link>
              <Link to={`/shop/mens-shirts`}>
                <li className={`mb-2 ${classes.cat}`} data-value="mens-shirts">
                  Shirts
                </li>
              </Link>
              <Link to={`/shop/mens-watches`}>
                <li className={`mb-2 ${classes.cat}`} data-value="mens-watches">
                  Watches
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Phones & Laptops
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <ul className="accordion-body d-flex flex-column">
              <Link to={`/shop/smartphones`}>
                <li className={`mb-2 ${classes.cat}`} data-value="smartphones">
                  Phones
                </li>
              </Link>
              <Link to={`/shop/laptops`}>
                <li className={`mb-2 ${classes.cat}`} data-value="laptops">
                  Laptops
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Home Decoration & Furniture
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <ul className="accordion-body d-flex flex-column">
              <Link to={`/shop/furniture`}>
                <li className={`mb-2 ${classes.cat}`} data-value="furniture">
                  furniture
                </li>
              </Link>
              <Link to={`/shop/home-decoration`}>
                <li
                  className={`mb-2 ${classes.cat}`}
                  data-value="home-decoration"
                >
                  Home Decoration
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              Automotive & Motorcycle
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <ul className="accordion-body d-flex flex-column">
              <Link to={`/shop/automotive`}>
                <li className={`mb-2 ${classes.cat}`} data-value="automotive">
                  Automotive
                </li>
              </Link>
              <Link to={`/shop/motorcycle`}>
                <li className={`mb-2 ${classes.cat}`} data-value="motorcycle">
                  Motorcycle
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
