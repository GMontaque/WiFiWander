import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const CreateComment = ({ username, commentToEdit }) => {
  // WiFi location ID
  const { id } = useParams();
  const [errors, setErrors] = useState({});

  return (
    <>
      <h1>{commentToEdit ? 'Update Comment' : 'Create Comment'}</h1>
      <Form>
        <Form.Group className="mb-3" controlId="comment_text">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="input"
            name="username"
            value={username.username}
            readOnly
          />

        </Form.Group>
        <Form.Group className="mb-3" controlId="comment_text">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Please describe the wifi location"
            name="comment_text"
          />
          {errors.comment_text?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group className="mb-3" controlId="star_rating">
          <Form.Label>Star Rating</Form.Label>
          {[1, 2, 3, 4, 5].map((int) => (
            <Form.Check
              inline
              label={int}
              name="star_rating"
              type="radio"
              id={`inline-radio-${int}`}
              key={int}
              value={int}
            />
          ))}
          {errors.star_rating?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Button variant="primary" type="submit">
          {commentToEdit ? 'Update' : 'Submit'}
        </Button>
        {commentToEdit && (
          <Button variant="secondary" className="ms-2">
            Cancel
          </Button>
        )}
      </Form>
    </>
  );
};

export default CreateComment;
