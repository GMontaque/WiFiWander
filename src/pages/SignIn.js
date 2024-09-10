import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
import { useSetCurrentUser } from "../components/CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";
import showAlert from '../components/Sweetalert';

function SignIn() {
  const setCurrentUser = useSetCurrentUser();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axiosReq.post(
        "/dj-rest-auth/login/",
        signInData
      );

      // Store the access and refresh tokens in localStorage
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      // Set the current user
      setCurrentUser(data.user);
      showAlert('Logged In', 'You have succesfully logged in', 'success');
      // Navigate to the home page
      navigate("/");
    } catch (err) {
      showAlert('Logged In', 'There was an issue when logging In please try again', 'error');
      setErrors(err.response?.data);
    }
  };

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Row className="flex-column">
        <h1 className="mt-5 mb-4 text-center">Sign In</h1>
        <Form onSubmit={handleSubmit} className="mb-5  signup-form">
          <Form.Group controlId="username">
            <Form.Label className="d-none">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              className="mt-5"
            />
            {errors.password?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>

          <div className="btn-back mt-4 mb-5">
            <Button className="btn" variant="" type="submit">
              Sign In
            </Button>
          </div>
          {errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx} variant="warning" className="mt-3">
              {message}
            </Alert>
          ))}
        </Form>

        <Link to="/signup" className="signup-form">
          Don't have an account? <span>Sign up now!</span>
        </Link>
        <Link to="/password" className="signup-form">Forgot your password?</Link>
      </Row>
    </>
  );
}

export default SignIn;
