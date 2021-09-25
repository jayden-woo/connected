import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../css/error.css";

// This templates was made by Colorlib (https://colorlib.com), https://colorlib.com/wp/template/colorlib-error-404-17/
// License: CC BY 3.0
const Error = () => (
  <Container>
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>:(</h1>
        </div>
        <h2>404 - Page not found</h2>
        <p>Sorry, an error has occured and the requested page is not found!</p>
        <NavLink to="/">home page</NavLink>
      </div>
    </div>
  </Container>
);

export default Error;
