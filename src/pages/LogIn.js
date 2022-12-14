import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Row, Col, Form, Container } from "react-bootstrap";
import Message from "../components/Message";
import { logIn } from "../actions/userActions";

const Login = () => {
  // initial login form
  const initialLoginForm = { email: "", password: "" };
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const { email, password } = loginForm;

  //Validation
  const setField = (field, value) => {
    setLoginForm({
      ...loginForm,
      [field]: value,
    });
  };

  // dispatch action
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //get login user state from store
  const userLogIn = useSelector((state) => state.userLogIn);
  const { error, userInfo } = userLogIn;

  const { search } = useLocation();

  const redirect = search ? search.split("=")[1] : "/";

  // check if the user info is exist
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  // login submit function
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(logIn(email, password, error));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Link to="/">
            <i
              data-id="back"
              className="fa-solid fa-arrow-left mt-5"
              style={{ color: "black" }}
            ></i>
          </Link>
          <h2 className="mb-4 text-center">LOG IN</h2>
          {error && <Message variant="danger">{error}</Message>}
          <Form onSubmit={submitHandler} noValidate>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email </Form.Label>
              <Form.Control
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => {
                  setField("email", e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Password </Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setField("password", e.target.value);
                }}
              />
            </Form.Group>
            <div className="d-grid gap-2 d-md-block">
              <Button
                variant="primary"
                type="submit"
                className="px-5 "
                id="login"
              >
                LOG IN
              </Button>
            </div>
          </Form>
          <Row className="py-3">
            <Col>
              New user?{" "}
              <Link
                to={redirect ? `/register?register=${redirect}` : "/register"}
              >
                SIGN UP
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
