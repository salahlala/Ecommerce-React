import classes from "./NotFound.module.css";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className={`${classes.main} text-center`}>
      <div className="container pt-5 mt-5">
        <div className={`${classes.title}`}>404</div>
        <div>
          <h2 className={`${classes.msg}`}>Oops! Page not found</h2>
          <p className="lh-lg mb-4">
            Whoops, this is embarassing. Looks like the page you were looking
            for was not found.
          </p>
          <Link to={"/"} className={`${classes.btn} px-4 py-2`}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
