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
      showAlert('error', 'Error during comment creation, please try again', 'error');
    }
  };

  return (
    <>
      <h1 className='comment-title'>{commentToEdit ? 'Update Comment' : 'Create Comment'}</h1>
      <Form onSubmit={handleSubmit} className='comment-form'>
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
            rows={5}
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
          <Form.Label className='star-rating'>Star Rating:</Form.Label>
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
        <div className="btn-back">
          <Button type="submit" className="btn" variant="">
            {commentToEdit ? 'Update' : 'Submit'}
          </Button>
        </div>
        {commentToEdit && (
          <div className="btn-back ms-2">
            <Button onClick={onCancelEdit} className="btn" variant="">
              Cancel
            </Button>
          </div>
        )}
      </Form>
    </>
  );
};

export default CreateComment;