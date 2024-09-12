import React from 'react';
import Comments from './Comments';
import CreateComment from './CreateComment';

const CommentsSection = ({ comments, currentUser, deleteComment, handleUpdateComment, commentToEdit, handleCommentAdded, handleCancelEdit }) => {
  return (
    <div className='wifi-comments'>
      {comments.length > 0 ? (
        <Comments
          comments={comments}
          onDelete={deleteComment}
          onUpdate={handleUpdateComment}
          currentUser={currentUser}
        />
      ) : (
        <p>No comments available.</p>
      )}

      {currentUser && (
        <CreateComment
          username={currentUser}
          onCommentAdded={handleCommentAdded}
          commentToEdit={commentToEdit}
          onCancelEdit={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default CommentsSection;