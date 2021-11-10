import React, { useState, useEffect } from "react";
import { Button, Modal, InputGroup, Form, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "../../helpers/axios";
import notify from "../../helpers/notifyService";

const EditButton = ({ updateFiled, sub, show, onHide }) => {
  const [state, setState] = useState("");
  const [notifyShow, setNotifyShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const options = {
    headers: { "content-type": "application/json" },
  };

  const data = {
    sub,
  };
  data[`${updateFiled}`] = state;

  useEffect(async () => {
    if (isLoading) {
      try {
        const res = await axios.patch("/api/auth0/updateUser", data, options);
        if (res) {
          setNotifyShow(true);
          setLoading(false);
          onHide();
          localStorage.setItem(updateFiled, state);
        } else {
          notify.errorNotify("Oops, some error occured!");
        }
      } catch (e) {
        setErr(true);
        notify.errorNotify(e.response.data.message);
        setLoading(false);
        setErr(false);
      }
    }
    if (!isLoading && notifyShow && !err) {
      notify.successNotify(`Updated ${updateFiled} successfully`);
    }
  }, [isLoading]);

  const handleClick = () => {
    if (state.length === 0) {
      notify.errorNotify("Input cannot be empty");
    } else if (updateFiled === "username" && !state.match(/^(?=.{1,15}$)[a-zA-Z][a-zA-Z0-9-.+-]*$/)) {
      notify.errorNotify('Use 1-15 letters, numbers and the following characters: "_", ".", "+", "-"');
    } else if (updateFiled === "email" && !state.match(/^\S+@\S+\.\S+$/)) {
      notify.errorNotify("Please fill a valid email address");
    } else {
      setLoading(true);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Body style={{ paddingTop: "15px", paddingBottom: "0px" }}>
          <InputGroup className="mb-3">
            <Form.Control
              className="shadow-none"
              placeholder={`New ${updateFiled}`}
              aria-label="UpdateFiled"
              value={state}
              onChange={(e) => setState(e.target.value)}
              type="text"
              style={{
                border: "1px solid rgb(167, 175, 183)",
                borderTopLeftRadius: ".75rem",
                borderBottomLeftRadius: ".75rem",
              }}
            />
            <Button
              onClick={!isLoading ? handleClick : null}
              className="shadow-none editUpdateBtn"
              style={{ border: "1px solid #21457d", padding: "5 10 5 10" }}
              disabled={isLoading}
              variant="outline-secondary"
            >
              {isLoading && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
              {isLoading ? "Loading…" : "Update"}
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
  sub: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
