import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import ProfileDisplay from "./Profile";

const ModalProfile = ({ show, onHide, sub }) => (
  <Modal className="profile" show={show} onHide={onHide} centered style={{ justifyContent: "center" }}>
    <div style={{ padding: 0, margin: 5 }}>
      <ProfileDisplay sub={sub} />
    </div>
  </Modal>
);

export default ModalProfile;

ModalProfile.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  sub: PropTypes.string.isRequired,
};
