import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import ProfileDisplay from "./Profile";

const ModalProfile = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Modal {...props} centered>
    <div style={{ padding: 0, margin: 5 }}>
      <ProfileDisplay />
    </div>
  </Modal>
);

export default withAuthenticationRequired(ModalProfile, {
  onRedirecting: () => <Spinner animation="grow" />,
});
