import React from 'react';
import Comments from './Comments';
import CreateComment from './CreateComment';

const CommentsSection = ({ comments, currentUser, deleteComment, handleUpdateComment, commentToEdit, handleCommentAdded, handleCancelEdit }) => {
  return (
    <div className='wifi-comments'>
      <div className='comments'>
        {comments.length > 0 ? (
          <Comments
            comments={comments}
            onDelete={deleteComment}
            onUpdate={handleUpdateComment}
            currentUser={currentUser}
          />
        ) : (
          <p className='no-comments'>No comments available.</p>
        )}
      </div>

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