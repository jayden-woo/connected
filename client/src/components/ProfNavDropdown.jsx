/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { NavDropdown, Spinner } from "react-bootstrap";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import ModalProfile from "./profile/ModalProfile";
import notify from "../helpers/notifyService";

const ProfNavDropdown = () => {
  const [modalShow, setModalShow] = useState(false);

  const { user, isLoading, getIdTokenClaims } = useAuth0();
  const [state, setState] = useState({
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
            loading: false,
            isAdmin: claims["https://it-project-connected.herokuapp.com/roles"][0] === "Admin",
          });
        } catch (error) {
          setState({
            ...state,
            loading: false,
          });
          notify.errorNotify(error.response.data.message);
        }
      };
      CheckRole();
    })();
  }, [getIdTokenClaims, user?.sub, user?.email]);

  if (state.loading || isLoading) {
    return <Spinner className="text-center" animation="grow" />;
  }

  return (
    <>
      <NavDropdown
        title={user.email}
        id="collasible-nav-dropdown"
        style={{ backgroundColor: "rgba(var(--bs-light-rgb)" }}
      >
        {state.isAdmin && (
          <NavDropdown.Item as={NavLink} to="/create-survey" style={dropdownItemStyle} exact>
            CREATE SURVEY
          </NavDropdown.Item>
        )}
        <NavDropdown.Item onClick={() => setModalShow(true)} style={dropdownItemStyle}>
          PROFILE
        </NavDropdown.Item>
        <ModalProfile show={modalShow} onHide={() => setModalShow(false)} sub={user.sub} />
      </NavDropdown>
    </>
  );
};

export default withAuthenticationRequired(ProfNavDropdown, {
  onRedirecting: () => <Spinner className="text-center" animation="grow" />,
});
