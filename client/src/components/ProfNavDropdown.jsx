/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { NavDropdown, Spinner } from "react-bootstrap";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import ModalProfile from "./profile/ModalProfile";

const ProfNavDropdown = () => {
  const [modalShow, setModalShow] = useState(false);

  const { user, getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState({
    error: null,
    admin: false,
    userId: null,
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

          const { user_metadata, user_id } = await res.json();
          setState({
            admin: user_metadata.Role === "Admin",
            userId: user_id,
            loading: false,
          });
          localStorage.setItem("isAdmin", user_metadata.Role === "Admin");
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

  if (state.loading) {
    return <Spinner className="text-center" animation="grow" />;
  }

  return (
    <>
      <NavDropdown
        title={user.nickname}
        id="collasible-nav-dropdown"
        style={{ backgroundColor: "rgba(var(--bs-light-rgb)" }}
      >
        {state.admin && (
          <NavDropdown.Item as={NavLink} to="/create-survey" style={dropdownItemStyle} exact>
            CREATE SURVEY
          </NavDropdown.Item>
        )}
        {state.admin && (
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
