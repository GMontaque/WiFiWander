import React, { useEffect, useState, useCallback } from 'react';
import { axiosReq } from "../api/axiosDefaults";
import { Row } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import showAlert from '../components/Sweetalert';
import Loader from '../components/Loader';
import { useCurrentUser } from '../components/CurrentUserContext';
import WifiLocationDetails from '../components/WifiLocationDetails';
import WifiLocationActions from '../components/WifiLocationActions';
import CommentsSection from '../components/CommentsSection';
import StarRating from '../components/StarRating';
import Swal from 'sweetalert2';
import NotFound from '../components/NotFound';

const WifiLocationsPage = () => {
  const { id } = useParams();
  const [wifiLocation, setWifiLocation] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const isCreator = currentUser && currentUser.username === wifiLocation?.added_by;
  const isAdmin = currentUser && currentUser.username === 'adminuser';

  const amenitiesData = [
    { name: "Outside Seating", icon: "fa-chair" },
    { name: "Desks", icon: "fa-box-archive" },
    { name: "Private Rooms", icon: "fa-person-booth" },
    { name: "Coffee", icon: "fa-mug-hot" },
    { name: "Food", icon: "fa-utensils" },
    { name: "Meeting Rooms", icon: "fa-handshake" }
  ];

  const fetchComments = useCallback(async () => {
    try {
      const response = await axiosReq.get(`/comments/?wifi_location=${id}`);
      setComments(response.data);
    } catch (err) {
      showAlert('error', 'Failed to fetch comments', 'error');
      setComments([]);
      setError(err);
    }
  }, [id]);

  useEffect(() => {
    const fetchWifiLocation = async () => {
      try {
        const response = await axiosReq.get(`/wifi_locations/${id}/`);
        setWifiLocation(response.data);
      } catch (err) {
        showAlert('error', 'Failed to fetch WiFi location data', 'error');
        setError(err);
      }
    };

    if (id) {
      fetchWifiLocation();
      fetchComments();
    }
  }, [id, fetchComments]);

  const handleUpdateLocation = () => {
    navigate(`/wifi_locations/edit/${id}`);
  };

  const handleDeleteLocation = async () => {
    if (!currentUser) {
      showAlert('error', 'You must be logged in to delete a location', 'error');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this location?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosReq.delete(`/wifi_locations/${id}/`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
          });

          if (response.status === 204) {
            showAlert('success', 'Successfully deleted WiFi location', 'success');
            navigate('/');
          }
        } catch (err) {
          showAlert('error', 'There was an error deleting the WiFi location, please try again', 'error');
          console.error(err);
        }
      }
    });
  };

  const handleDeleteComment = async (commentId) => {
    if (!currentUser) {
      showAlert('error', 'You must be logged in to delete a comment', 'error');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this comment?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosReq.delete(`/comments/${commentId}/`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
          });

          if (response.status === 204) {
            showAlert('success', 'Successfully deleted comment', 'success');
            setComments((prevComments) =>
              prevComments.filter((comment) => comment.id !== commentId)
            );
          }
        } catch (err) {
          showAlert('error', 'There was an error deleting the comment, please try again', 'error');
          console.error(err);
        }
      }
    });
  };

  const handleCommentAdded = () => {
    fetchComments();
    setCommentToEdit(null);
  };

  const handleUpdateComment = (comment) => {
    if (currentUser?.username === comment.user) {
      setCommentToEdit(comment);
    } else {
      showAlert('error', "You don't have permission to edit this comment", 'error');
    }
  };

  const handleCancelEdit = () => {
    setCommentToEdit(null);
  };

  const matchedAmenities = wifiLocation?.amenities
    ? amenitiesData.filter(amenity => wifiLocation.amenities.includes(amenity.name))
    : [];

  const averageRating = comments.length > 0
    ? comments.reduce((sum, comment) => sum + (comment.star_rating || 0), 0) / comments.length
    : 0;

  if (error && !wifiLocation) {
    return <NotFound />;
  }

  if (!wifiLocation) {
    return <Loader />;
  }

  return (
    <>
      <Row>
        <h1 className='pageTitle mt-4'>{wifiLocation.name}</h1>
        <div className='wifipage-links'>
          <StarRating rating={averageRating} />
          <WifiLocationActions
            isCreator={isCreator}
            isAdmin={isAdmin}
            wifiLocation={wifiLocation}
            currentUser={currentUser}
            handleUpdateLocation={handleUpdateLocation}
            handleDeleteLocation={handleDeleteLocation}
          />
        </div>
      </Row>

      <Row>
        <div className="wifipage-img">
          <WifiLocationDetails wifiLocation={wifiLocation} matchedAmenities={matchedAmenities} />
        </div>

        <div className="wifipage-text">
          <p className='pb-5'>{wifiLocation.description}</p>
          <CommentsSection
            comments={comments}
            currentUser={currentUser}
            deleteComment={handleDeleteComment}
            handleUpdateComment={handleUpdateComment}
            commentToEdit={commentToEdit}
            handleCommentAdded={handleCommentAdded}
            handleCancelEdit={handleCancelEdit}
          />
        </div>
      </Row>
    </>
  );
};

export default WifiLocationsPage;
