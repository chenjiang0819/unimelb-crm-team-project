import React from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/connected.png";
import ProfNavDropdown from "./ProfNavDropdown";

const Navigation = () => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  return (
    <Navbar fixed="top" expand="md" bg="light" className="Navbar">
      <Container className="nav-container" fluid>
        <Navbar.Brand
          as={NavLink}
          style={{
            fontWeight: "600",
            color: "#000766",
            marginRight: "2rem",
          }}
          to="/"
        >
          <Image src={logo} width="50" height="50" alt="TEAM CONNECTED logo" />
          &nbsp;CONNECTED
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse>
          <Nav fill>
            <Nav.Link className="my-nav-item" as={NavLink} to="/" exact>
              HOME
            </Nav.Link>
            <Nav.Link className="my-nav-item" as={NavLink} to="/surveys" exact>
              SURVEYS
            </Nav.Link>
            <Nav.Link className="my-nav-item" as={NavLink} to="/about" exact>
              ABOUT
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {!isAuthenticated && (
            <Nav fill>
              <Nav.Item>
                <Nav.Link
                  style={{ fontWeight: "bold", color: "#000766" }}
                  onClick={() =>
                    loginWithRedirect({
                      appState: {
                        returnTo: window.location.pathname,
                      },
                    })
                  }
                >
                  LOG IN
                </Nav.Link>
              </Nav.Item>
            </Nav>
          )}
          {isAuthenticated && (
            <>
              <Nav fill>
                <Nav.Item>
                  <Image src={user.picture} width="45" height="45" alt="ProfilePic" roundedCircle />
                </Nav.Item>
              </Nav>
              <Nav fill>
                <ProfNavDropdown />
                <Nav.Item>
                  <Nav.Link
                    style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#000766" }}
                    onClick={() => {
                      logout({ returnTo: window.location.origin });
                      localStorage.removeItem("username");
                    }}
                  >
                    LOG OUT
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
