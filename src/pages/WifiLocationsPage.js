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
import Swal from 'sweetalert2';

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

  // list of amenities with icons
  const amenitiesData = [
    { name: "Outside Seating", icon: "fa-chair" },
    { name: "Desks", icon: "fa-box-archive" },
    { name: "Private Rooms", icon: "fa-person-booth" },
    { name: "Coffee", icon: "fa-mug-hot" },
    { name: "Food", icon: "fa-utensils" },
    { name: "Meeting Rooms", icon: "fa-handshake" }
  ];

  // Fetch comments for the WiFi location
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

  // Fetch WiFi location data
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

  const handleAddToFavorites = async () => {
    if (!currentUser) {
      showAlert('error', 'You must be logged in to add to favorites', 'error');
      return;
    }

    try {
      const response = await axiosReq.post(`/favourites/`, {
        wifi_location_id: id,
        notes: '',
        folder_name: '',
        visit_status: 'Planned',
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (response.status === 201) {
        showAlert('success', 'Location added to favorites successfully!', 'success');
      }
    } catch (err) {
      showAlert('error', 'Failed to add location to favorites', 'error');
      console.error(err);
    }
  };

  const handleUpdateLocation = () => {
    navigate(`/wifi_locations/edit/${id}`);
  };

  // Handle deletion with pop-up confirmation for Wi-Fi location
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

  // Handle deletion of a comment with a confirmation pop-up
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

  // Filter matched amenities
  const matchedAmenities = wifiLocation?.amenities
    ? amenitiesData.filter(amenity => wifiLocation.amenities.includes(amenity.name))
    : [];

  // Error or loading state handling
  if (error && !wifiLocation) {
    return <p>Error loading WiFi location</p>;
  }

  if (!wifiLocation) {
    return <Loader />;
  }

  return (
    <>
      <Row>
        <h1 className='pageTitle mt-4'>{wifiLocation.name}</h1>
        <div className='wifipage-links'>
          <p>{wifiLocation.star_rating || 'No rating available'}</p>
          <WifiLocationActions
            isCreator={isCreator}
            isAdmin={isAdmin}
            handleAddToFavorites={handleAddToFavorites}
            handleUpdateLocation={handleUpdateLocation}
            handleDeleteLocation={handleDeleteLocation}
          />
        </div>
      </Row>

      <Row>
        <WifiLocationDetails wifiLocation={wifiLocation} matchedAmenities={matchedAmenities} />
      </Row>

      <Row className='justify-content-end mb-5'>
        <CommentsSection
          comments={comments}
          currentUser={currentUser}
          deleteComment={handleDeleteComment}
          handleUpdateComment={handleUpdateComment}
          commentToEdit={commentToEdit}
          handleCommentAdded={handleCommentAdded}
          handleCancelEdit={handleCancelEdit}
        />
      </Row>
    </>
  );
};

export default WifiLocationsPage;
