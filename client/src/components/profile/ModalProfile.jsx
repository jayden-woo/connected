import React from "react";
import { Modal } from "react-bootstrap";
// import { withAuthenticationRequired } from "@auth0/auth0-react";
import PropTypes from "prop-types";
import ProfileDisplay from "./Profile";

const ModalProfile = ({ show, onHide, sub }) => (
  <Modal show={show} onHide={onHide} centered style={{ justifyContent: "center" }}>
    <div style={{ padding: 0, margin: 5 }}>
      <ProfileDisplay sub={sub} />
    </div>
  </Modal>
);

export default ModalProfile;
// export default withAuthenticationRequired(ModalProfile, {
//   onRedirecting: () => <Spinner animation="grow" />,
// });

ModalProfile.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  sub: PropTypes.string.isRequired,
};
