import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Spinner, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const PasswordResetButton = ({ email }) => {
  const [isLoading, setLoading] = useState(false);
  const [state, setState] = useState({
    data: null,
    show: false,
  });

  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const options = {
    method: "POST",
    url: `https://${domain}/dbconnections/change_password`,
    headers: { "content-type": "application/json" },
    data: {
      client_id: clientId,
      email,
      connection: "Username-Password-Authentication",
    },
  };

  const handleClick = () => setLoading(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .request(options)
        .then((response) => {
          setState({
            data: response.data,
            show: true,
          });
          setLoading(false);
          console.log(response);
        })
        .catch((error) => {
          setState({
            ...state,
            data: error,
            show: true,
          });
          setLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <>
      <Button variant="primary" disabled={isLoading} onClick={!isLoading ? handleClick : null}>
        {isLoading && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
        {isLoading ? "Loading…" : "Reset Password"}
      </Button>
      <Modal show={state.show} onHide={() => setState({ show: false })} centered>
        <Modal.Header closeButton>{state.data}</Modal.Header>
      </Modal>
    </>
  );
};

export default PasswordResetButton;

PasswordResetButton.propTypes = {
  email: PropTypes.string.isRequired,
};
