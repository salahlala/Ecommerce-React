import classes from "./Footer.module.css";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className={`py-5 mt-5 ${classes.footer}`}>
      <div className="container ">
        <div className="row">
          <div className="col-lg-3 col-md-4 mb-4">
            <Link
              to={"/"}
              className={`d-flex align-items-center ${classes.logo}`}
            >
              <h1 className={`text-uppercase `}>economya</h1>
            </Link>
            <p className="text-black-50 fw-semibold">
              The home and elements needed to create beautiful products.
            </p>
            <div
              className={`d-flex align-items-center gap-3 ${classes["footer-icon"]}`}
            >
              <AiOutlineTwitter />
              <FaFacebookF />
              <FaYoutube />
              <FaLinkedinIn />
            </div>
          </div>

          <div className="col-lg-2 col-md-4 mb-4">
            <p className="fw-bold fs-5">Company</p>
            <ul className="p-0">
              <li className={`fw-semibold mb-2 text-black-50 ${classes.links}`}>
                About us
              </li>
              <li className={`fw-semibold mb-2 text-black-50 ${classes.links}`}>
                Careers
              </li>
              <li className={`fw-semibold mb-2 text-black-50 ${classes.links}`}>
                Store Locations
              </li>
              <li className={`fw-semibold mb-2 text-black-50 ${classes.links}`}>
                Our Blog
              </li>
              <li className={`fw-semibold mb-2 text-black-50 ${classes.links}`}>
                Reviews
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-4 mb-4">
            <p className="fw-bold fs-5">Shop</p>
            <ul className="p-0">
              <li className={`fw-semibold mb-2 text-black-50 ${classes.links}`}>
                Game & Video
              </li>
              <li className={`fw-semibold mb-2 text-black-50 ${classes.links}`}>
                Phone &Tablets
              </li>
              <li className={`fw-semibold mb-2 text-black-50 ${classes.links}`}>
                Computers & Laptop
              </li>
              <li className={`fw-semibold mb-2 text-black-50 ${classes.links}`}>
                Sport Watches
              </li>
              <li className={`fw-semibold mb-2 text-black-50 ${classes.links}`}>
                Discounts
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-4 mb-4">
            <p className="fw-bold fs-5">Support</p>
            <ul className="p-0">
              <li className={`fw-semibold mb-2 text-black-50 ${classes.links}`}>
                FAQs
              </li>
              <li className={`fw-semibold mb-2 text-black-50 ${classes.links}`}>
                Reviews
              </li>
              <li className={`fw-semibold mb-2 text-black-50 ${classes.links}`}>
                Contact Us
              </li>
              <li className={`fw-semibold mb-2 text-black-50 ${classes.links}`}>
                Shipping
              </li>
              <li className={`fw-semibold mb-2 text-black-50 ${classes.links}`}>
                Returns
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-4 mb-4">
            <p className="fw-bold fs-5">Talk To Us</p>
            <p>Find a location nearest you. See Our Stores</p>
            <p className={`${classes.links} ${classes.phone} fw-semibold`}>
              +524 723 36 72
            </p>
            <p className={`${classes.links} fw-semibold`}>support@test.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
