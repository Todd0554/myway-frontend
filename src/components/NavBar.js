import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { logOut } from "../actions/userActions";

const NavBar = () => {
  const dispatch = useDispatch();
  const userLogIn = useSelector((state) => state.userLogIn);
  const { userInfo } = userLogIn;

  const logOutHandler = (e) => {
    dispatch(logOut());
  };

  return (
    <header>
      <Navbar bg="light" expand="md">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="#home" className="me-4">
              MyWay
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <LinkContainer to="/" className="me-4 my-3">
              <Nav.Link>ABOUT</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/blogs" className="me-4 my-3">
              <Nav.Link href="#link">BLOG</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/sites" className="me-4 my-3">
              <Nav.Link href="#link">FIND YOUR WAY</Nav.Link>
            </LinkContainer>

            <Nav className="ms-auto">
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/myhome">
                    <NavDropdown.Item>MyHome</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <NavDropdown.Item onClick={logOutHandler} id="logout">
                      <i
                        className="fa-solid fa-right-from-bracket"
                        style={{ width: 23, height: 20 }}
                      ></i>
                      Log Out
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i
                        className="fa-solid fa-right-to-bracket"
                        style={{ width: 23, height: 20 }}
                      ></i>
                      LOG IN
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <i
                        className="fa-solid fa-user"
                        style={{ width: 23, height: 20 }}
                      ></i>
                      SIGN UP
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/sitelist">
                    <NavDropdown.Item>SITE LIST</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>USER LIST</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
