import React, { useState } from "react";
import { Alert, Row, Col, Container, Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {

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

            </Form.Group>

            {/* Image Upload */}
            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
              />

            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit">
              Sign Up
            </Button>

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
