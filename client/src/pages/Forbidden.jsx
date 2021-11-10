import { NavLink } from "react-router-dom";
import "../css/error.css";

// This templates was made by Colorlib (https://colorlib.com), https://colorlib.com/wp/template/colorlib-error-404-17/
// License: CC BY 3.0
const Forbidden = () => (
  <div className="notfound-container">
    <div className="notfound">
      <h2 style={{ color: "#c14d4d" }}>403 - Forbidden</h2>
      <p>Sorry, Authentication needed to visit this page.</p>
      <NavLink to="/">home page</NavLink>
    </div>
  </div>
);

export default Forbidden;
