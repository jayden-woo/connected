/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { NavDropdown, Spinner } from "react-bootstrap";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import ModalProfile from "./profile/ModalProfile";

const ProfNavDropdown = () => {
  const [modalShow, setModalShow] = useState(false);

  const { user, getAccessTokenSilently, isLoading, getIdTokenClaims } = useAuth0();
  const [state, setState] = useState({
    error: null,
    userId: null,
    isAdmin: false,
    loading: true,
  });

  const dropdownItemStyle = {
    textAlign: "center",
    padding: "1rem 2.5rem",
    color: "#919aa3",
  };

  useEffect(() => {
    (async () => {
      const CheckRole = async () => {
        const domain = process.env.REACT_APP_AUTH0_DOMAIN;
        try {
          const accessToken = await getAccessTokenSilently({
            audience: `https://${domain}/api/v2/`,
            scope: "read:users read:user_idp_tokens",
          });

          const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

          const res = await fetch(userDetailsByIdUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const { user_id } = await res.json();
          const claims = await getIdTokenClaims();
          setState({
            userId: user_id,
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
  }, [getAccessTokenSilently, user?.sub]);

  if (state.loading || isLoading) {
    return <Spinner className="text-center" animation="grow" />;
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
