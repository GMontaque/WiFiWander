import React, { useEffect, useState } from 'react';
import { axiosReq } from "../api/axiosDefaults";
import { Image, Row, Alert, Button } from 'react-bootstrap';
import Comments from '../components/Comments';
import AmenitiesKey from '../components/AmenitiesKey';
import { useCurrentUser } from '../components/CurrentUserContext';
import CreateComment from '../components/CreateComment';
import { useParams } from 'react-router-dom';

const WifiLocationsPage = () => {
  const { id } = useParams();
  const [wifiLocation, setWifiLocation] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchWifiLocation = async () => {
      try {
        const response = await axiosReq.get(
          `/wifi_locations/${id}`
        );
        setWifiLocation(response.data);
      } catch (err) {
        setError('Failed to fetch WiFi location data');
        console.error(err);
      }
    };

    const fetchComments = async () => {
      try {
        console.log(`Fetching comments for wifi location: ${id}`);

        const token = localStorage.getItem('access_token');

        if (!token) {
          setError('Authentication credentials were not provided.');
          console.error('No authentication token found.');
          return;
        }

        const response = await axiosReq.get(
          `/comments/?wifi_location=${id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        console.log('Fetched comments:', response.data);
        setComments(response.data);
      } catch (err) {
        setError('Failed to fetch comments');
        setComments([]);
        console.error('Error fetching comments:', err);
      }
    };

    fetchWifiLocation();
    fetchComments();
  }, [id]);

  const handleAddToFavorites = async () => {
    if (!currentUser) {
      setError('You must be logged in to add to favorites');
      return;
    }

    try {
      const response = await axiosReq.post(
        `/favourites/`,
        {
          user: currentUser.id,
          wifi_location: id,
          notes: '',
          folder_name: '',
          visit_status: 'Planned',
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        }
      );

      if (response.status === 201) {
        console.log('Location added to favorites successfully!');
      }
    } catch (err) {
      setError('Failed to add location to favorites');
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axiosReq.delete(
        `/comments/${commentId}/`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        }
      );
      if (response.status === 204) {
        console.log('Successfully deleted');
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      }
    } catch (error) {
      console.error('There was an error deleting the comment:', error);
    }
  };

  const handleUpdateComment = (comment) => {
    if (currentUser.username === comment.username) {
      setCommentToEdit(comment);
    }
    setCommentToEdit(comment);
    console.log("dont have permission")
  };

  const handleCancelEdit = () => {
    setCommentToEdit(null);
  };

  const handleCommentAdded = () => {
    fetchComments();
    setCommentToEdit(null);
  };

  const fetchComments = async () => {
    try {
      const response = await axiosReq.get(
        `/comments/?wifi_location=${id}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        }
      );
      setComments(response.data);
    } catch (err) {
      setError('Failed to fetch comments');
      setComments([]);
    }
  };

  if (error && !wifiLocation) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!wifiLocation) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Row>
        <h1>{wifiLocation.name}</h1>
        <span>
          {currentUser && (
            <Button onClick={handleAddToFavorites}>Add to Favorites</Button>
          )}
        </span>
        <div>{wifiLocation.star_rating || 'No rating available'}</div>
        {wifiLocation.image && (
          <Image
            src={wifiLocation.image}
            alt={`Image of ${wifiLocation.name}`}
            fluid
          />
        )}
        <p>{wifiLocation.description}</p>
        <div>{wifiLocation.amenities}</div>
      </Row>
      <Row>
        {comments.length > 0 ? (
          <Comments comments={comments} onDelete={handleDeleteComment} onUpdate={handleUpdateComment} />
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
      </Row>
      <AmenitiesKey />
    </>
  );
};

export default WifiLocationsPage;