import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Modal, InputGroup, Form, Nav } from "react-bootstrap";
import PropTypes from "prop-types";

const EditButton = ({ updateFiled }) => {
  const [show, setShow] = useState(false);
  const [state, setState] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user, getAccessTokenSilently } = useAuth0();

  const update = async () => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope:
          "read:users update:users update:users_app_metadata update:current_user_metadata create:current_user_metadata",
      });

      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

      await fetch(userDetailsByIdUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ username: state, connection: "con_ehJvHf0yLo7yyR3N" }),
      }).then((response) => {
        if (response.status === 200) {
          console.log("SUCCESSS");
        }
        return response.json();
      });
    } catch (e) {
      console.log(e.message);
    }
    console.log(state);
  };

  return (
    <>
      <Nav.Link onClick={handleShow} style={{ paddingTop: 0, color: "rgba(0,0,0,.55)" }}>
        Edit
      </Nav.Link>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header style={{ paddingTop: "10px", paddingBottom: "10px" }} closeButton />
        <Modal.Body style={{ paddingTop: "10px", paddingBottom: "0px" }}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder={updateFiled}
              aria-label="UpdateFiled"
              value={state.val}
              onChange={(e) => setState(e.target.value)}
              type="text"
            />
            <Button onClick={update} variant="outline-secondary">
              Update
            </Button>
          </InputGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditButton;

EditButton.propTypes = {
  updateFiled: PropTypes.string.isRequired,
};
