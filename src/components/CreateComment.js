import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { axiosReq } from "../api/axiosDefaults";
import { useParams } from 'react-router-dom';
import showAlert from '../components/Sweetalert';

const CreateComment = ({ onCommentAdded, username, commentToEdit, onCancelEdit }) => {
  // WiFi location ID
  const { id } = useParams();
  const [formData, setFormData] = useState({
    comment_text: '',
    star_rating: 0,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (commentToEdit) {
      setFormData({
        comment_text: commentToEdit.comment_text,
        star_rating: commentToEdit.star_rating,
      });
    } else {
      setFormData({
        comment_text: '',
        star_rating: 0,
      });
    }
  }, [commentToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRatingChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      star_rating: parseInt(e.target.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!username) {
      setErrors({ user: ['You must be logged in to comment.'] });
      return;
    }

    try {
      const token = localStorage.getItem('access_token');

      if (!token) {
        setErrors({ auth: ['Authentication token is missing. Please log in again.'] });
        return;
      }

      if (commentToEdit) {
        // Update comment logic
        const response = await axiosReq.put(
          `/comments/${commentToEdit.id}/`,
          {
            ...formData,
            wifi_location: id,
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.status === 200) {
          showAlert('success', 'Comment updated successfully!', 'success');
          onCommentAdded();
          onCancelEdit();
        }
      } else {
        // Create comment logic
        const response = await axiosReq.post(
          `/comments/`,
          {
            ...formData,
            wifi_location: id,
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.status === 201) {
          showAlert('success', 'Comment added successfully!', 'success');
          onCommentAdded();
        }
      }

      setFormData({
        comment_text: '',
        star_rating: 0,
      });
    } catch (err) {
      setErrors(err.response.data);
      console.error('Error during comment creation:', err.response.data);
    }
  };

  return (
    <>
      <h1>{commentToEdit ? 'Update Comment' : 'Create Comment'}</h1>
      <Form onSubmit={handleSubmit}>
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
            value={formData.comment_text}
            onChange={handleChange}
            required
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
              checked={formData.star_rating === int}
              onChange={handleRatingChange}
              required
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
          <Button variant="secondary" onClick={onCancelEdit} className="ms-2">
            Cancel
          </Button>
        )}
      </Form>
    </>
  );
};

export default CreateComment;