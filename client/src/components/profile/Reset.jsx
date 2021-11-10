import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import notify from "../../helpers/notifyService";

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
        })
        .catch((error) => {
          notify.errorNotify(error.response.data.message);
          setLoading(false);
        });
    }
    if (!isLoading && state.show) {
      notify.successNotify(state.data);
    }
  }, [isLoading]);

  return (
    <>
      <Button
        variant="primary"
        style={{ borderRadius: "0.75rem", fontSize: "0.8rem", padding: "6px 10px" }}
        className="shadow-none reset-button"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
        {isLoading ? "Loading…" : "Reset Password"}
      </Button>
    </>
  );
};

export default PasswordResetButton;

PasswordResetButton.propTypes = {
  email: PropTypes.string.isRequired,
};
