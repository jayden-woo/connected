import React from "react";
import { Navbar, NavDropdown, Nav, Container, Image } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/connected.png";
import ModalProfile from "./profile/ModalProfile";

const Navigation = () => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Navbar fixed="top" expand="xl" bg="light">
      <Container>
        <Navbar.Brand style={{ fontWeight: "bold", color: "#000766" }} href="/">
          <Image src={logo} width="50" height="50" alt="TEAM CONNECTED logo" />
          &nbsp;CONNECTED
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="justify-content-end">
          <Nav fill>
            <Nav.Link href="/">HOME</Nav.Link>
            <Nav.Link href="/about">ABOUT</Nav.Link>
            <Nav.Link href="/surveys/613afcb3b5dded7270bbab69">SURVEY</Nav.Link>
            <Nav.Link href="/submissions/?survey=613afcb3b5dded7270bbab69">SUBMISSION</Nav.Link>
            <Nav.Link href="/profile">PROFILE</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {!isAuthenticated && (
            <Nav fill>
              <Nav.Item>
                <Nav.Link style={{ fontWeight: "bold", color: "#000766" }} onClick={() => loginWithRedirect()}>
                  LOG IN
                </Nav.Link>
              </Nav.Item>
            </Nav>
          )}
          {isAuthenticated && (
            <>
              <Nav fill>
                <Nav.Item>
                  <Image src={user.picture} width="45" height="45" alt="ProfilePic" roundedCircle />
                </Nav.Item>
              </Nav>
              <Nav fill>
                <NavDropdown
                  title={user.nickname}
                  id="collasible-nav-dropdown"
                  fill
                  style={{ backgroundColor: "rgba(var(--bs-light-rgb)" }}
                >
                  <NavDropdown.Item
                    href="create-survey"
                    style={{ textAlign: "center", padding: "1rem 2.5rem", color: "#919aa3" }}
                  >
                    CREATE SURVEY
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => setModalShow(true)}
                    style={{ textAlign: "center", padding: "1rem 2.5rem", color: "#919aa3" }}
                  >
                    PROFILE
                  </NavDropdown.Item>
                  <ModalProfile style={{ minWidth: 250 }} show={modalShow} onHide={() => setModalShow(false)} />
                </NavDropdown>
                <Nav.Item>
                  <Nav.Link
                    style={{ fontWeight: "bold", color: "#000766" }}
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    LOG OUT
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
