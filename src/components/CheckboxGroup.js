import React from "react";
import { Form } from "react-bootstrap";

const CheckboxGroup = ({ options, selectedOptions, handleChange }) => {
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
    </Form.Group>
  );
};

export default CheckboxGroup;
