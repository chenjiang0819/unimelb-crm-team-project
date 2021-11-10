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
    username: "",
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
          let un = null;
          if (claims["http://localhost:3000/"]) {
            un = claims["http://localhost:3000/"];
          } else {
            un = user.name;
          }
          setState({
            loading: false,
            isAdmin: claims["http://localhost:3000/"][0] === "Admin",
            username: un,
          });
        } catch (error) {
          setState({
            ...state,
            loading: false,
          });
          notify.errorNotify(error.message);
        }
      };
      CheckRole();
    })(modalShow);
  }, [getIdTokenClaims, user?.sub, modalShow]);

  if (state.loading || isLoading) {
    return <Spinner className="text-center" animation="grow" />;
  }

  return (
    <>
      <NavDropdown
        title={localStorage.getItem("username") ? localStorage.getItem("username") : state.username}
        id="collasible-nav-dropdown"
        className="my-nav-item"
        style={{ marginLeft: "0.1rem", backgroundColor: "rgba(var(--bs-light-rgb)" }}
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
