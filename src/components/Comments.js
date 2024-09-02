import React from 'react';
import { Button, Card } from 'react-bootstrap';

const Comments = ({ comments, onDelete, onUpdate }) => {
  return (
    <>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Card key={comment.id} style={{ width: '18rem', marginBottom: '1rem' }}>
            <Card.Body>
              <Card.Title>{comment.user}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {comment.star_rating} Stars
              </Card.Subtitle>
              <Card.Text>{comment.comment_text}</Card.Text>
            </Card.Body>
            <Button variant="warning" onClick={() => onUpdate(comment)}>
              Update
            </Button>
            <Button variant="danger" onClick={() => onDelete(comment.id)}>
              Delete
            </Button>
          </Card>
        ))
      ) : (
        <p>No comments available for this location.</p>
      )}
    </>
  );
};

export default Comments;
