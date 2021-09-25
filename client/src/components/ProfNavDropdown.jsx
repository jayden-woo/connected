/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { NavDropdown, Spinner } from "react-bootstrap";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import ModalProfile from "./profile/ModalProfile";
import errorNotify from "../helpers/notifyService";

const ProfNavDropdown = () => {
  const [modalShow, setModalShow] = useState(false);

  const { user, isLoading, getIdTokenClaims } = useAuth0();
  const [state, setState] = useState({
    error: null,
    userId: null,
    isAdmin: false,
    loading: true,
  });

  const dropdownItemStyle = {
    textAlign: "center",
    padding: "1rem 2.5rem",
  };

  useEffect(() => {
    (async () => {
      const CheckRole = async () => {
        try {
          const claims = await getIdTokenClaims();
          setState({
            userId: user.sub,
            loading: false,
            isAdmin: claims["https://it-project-connected.herokuapp.com/roles"] === "admin",
          });
        } catch (error) {
          setState({
            ...state,
            error,
            loading: false,
          });
        }
      };
      CheckRole();
    })();
  }, [getIdTokenClaims, user?.sub]);

  if (state.loading || isLoading) {
    return <Spinner className="text-center" animation="grow" />;
  }

  if (state.error != null) {
    return errorNotify(state.error.message);
  }

  return (
    <>
      <NavDropdown
        title={user.nickname}
        id="collasible-nav-dropdown"
        style={{ backgroundColor: "rgba(var(--bs-light-rgb)" }}
      >
        {state.isAdmin && (
          <NavDropdown.Item as={NavLink} to="/create-survey" style={dropdownItemStyle} exact>
            CREATE SURVEY
          </NavDropdown.Item>
        )}
        {state.isAdmin && (
          <NavDropdown.Item as={NavLink} to="/" style={dropdownItemStyle} exact>
            SUBMISSION
          </NavDropdown.Item>
        )}
        <NavDropdown.Item onClick={() => setModalShow(true)} style={dropdownItemStyle}>
          PROFILE
        </NavDropdown.Item>
        <ModalProfile show={modalShow} onHide={() => setModalShow(false)} userId={state.userId} />
      </NavDropdown>
    </>
  );
};

export default withAuthenticationRequired(ProfNavDropdown, {
  onRedirecting: () => <Spinner className="text-center" animation="grow" />,
});
