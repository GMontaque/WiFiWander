import React, { useState } from "react";
import { Alert, Row, Col, Container, Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import showAlert from '../components/Sweetalert';

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    memorable_word: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input change for text fields
  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file change for the image upload
  const handleFileChange = (e) => {
    setSignUpData({
      ...signUpData,
      image: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object for multipart/form-data submission
    const formData = new FormData();
    formData.append('username', signUpData.username);
    formData.append('email', signUpData.email);
    formData.append('password1', signUpData.password1);
    formData.append('password2', signUpData.password2);
    formData.append('memorable_word', signUpData.memorable_word);

    // Append the image file to the FormData object
    if (signUpData.image) {
      formData.append('image', signUpData.image);
    }

    try {
      await axiosReq.post("/dj-rest-auth/registration/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate("/signin");
      showAlert('Sign Up', 'You have succesfully created an account', 'success')
    } catch (err) {
      showAlert('Sign Up', 'There waas an issue when signing up please try again', 'error')
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={6} className="my-auto">
        <Container className="p-4 border rounded">
          <h1 className="mb-4">Sign Up</h1>

          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Username */}
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                value={signUpData.username}
                onChange={handleChange}
              />
              {errors.username?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
              ))}
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={signUpData.email}
                onChange={handleChange}
              />
              {errors.email?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
              ))}
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="password1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password1"
                value={signUpData.password1}
                onChange={handleChange}
              />
              {errors.password1?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
              ))}
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-3" controlId="password2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={signUpData.password2}
                onChange={handleChange}
              />
              {errors.password2?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
              ))}
            </Form.Group>

            {/* Memorable Word */}
            <Form.Group className="mb-3" controlId="memorable_word">
              <Form.Label>Memorable Word</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Memorable Word"
                name="memorable_word"
                value={signUpData.memorable_word}
                onChange={handleChange}
              />
              {errors.memorable_word?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
              ))}
            </Form.Group>

            {/* Image Upload */}
            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
              />
              {errors.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
              ))}
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>

          <div className="mt-3">
            <NavLink to="/signin">
              Already got an account? <span>Sign In</span>
            </NavLink>
          </div>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUp;
