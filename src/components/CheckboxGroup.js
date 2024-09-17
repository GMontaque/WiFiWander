import React from "react";
import { Alert, Form } from "react-bootstrap";

const CheckboxGroup = ({ options, selectedOptions, handleChange, errors }) => {
  return (
    <Form.Group className="mb-3" controlId="amenities">
      <Form.Label>Amenities</Form.Label>
      {options.map((option, index) => (
        <Form.Check
          type="checkbox"
          label={option}
          key={index}
          value={option}
          checked={selectedOptions.includes(option)}
          onChange={handleChange}
        />
      ))}
      {errors.amenities?.map((message, idx) => (
        <Alert variant="warning" key={idx}>{message}</Alert>
      ))}
    </Form.Group>
  );
};

export default CheckboxGroup;
