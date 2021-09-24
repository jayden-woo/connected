import { Container } from "react-bootstrap";
import "../css/error.css";

// This templates was made by Colorlib (https://colorlib.com), https://colorlib.com/wp/template/colorlib-error-404-17/
// License: CC BY 3.0
const Forbidden = () => (
  <Container>
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1 style={{ color: "#c14d4d" }}>:(</h1>
        </div>
        <h2>403 - Forbidden</h2>
        <p>Sorry, Authentication needed to visit this page.</p>
        <a href="/">home page</a>
      </div>
    </div>
  </Container>
);

export default Forbidden;
