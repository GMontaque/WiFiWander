import React from 'react';
import { Form, Button } from 'react-bootstrap';
const CreateComment = ({ username, commentToEdit }) => {


  return (
    <>
      <h1>{commentToEdit ? 'Update Comment' : 'Create Comment'}</h1>
      <Form >
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
