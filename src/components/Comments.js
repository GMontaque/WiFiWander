import React from 'react';
import { Button, Card } from 'react-bootstrap';

const Comments = ({ comments, onDelete, onUpdate, currentUser }) => {
  return (
    <>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Card key={comment.id} className='wifi-comment'>
            <Card.Body>
              <Card.Title>{comment.user}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted f-2rem">
                {comment.star_rating} Stars
              </Card.Subtitle>
              <Card.Text className='mb-3'>{comment.comment_text}</Card.Text>
              {/* Conditionally render Update and Delete buttons */}
              {currentUser && (currentUser.username === comment.user || currentUser.is_superuser) && (
                <>
                  <Button variant="warning" onClick={() => onUpdate(comment)}>
                    Update
                  </Button>
                  <Button variant="danger" onClick={() => onDelete(comment.id)}>
                    Delete
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className='no-comments'>No comments available for this location.</p>
      )}
    </>
  );
};

export default Comments;
