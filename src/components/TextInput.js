import React from "react";
import { Form, Alert } from "react-bootstrap";

const TextInput = ({ label, name, value, handleChange, errors, placeholder = "" }) => {
  return (
    <Form.Group controlId={name} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      />
      {errors?.map((message, idx) => (
        <Alert variant="warning" key={idx}>{message}</Alert>
      ))}
    </Form.Group>
  );
};

export default TextInput;
