import React, { useState } from "react";
import axios from "axios";
import { useCurrentUser } from './CurrentUserContext';

const AddFavourite = ({ location_id }) => {
  const currentUser = useCurrentUser();
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    try {
      // form data for the POST request
      const formData = {
        user: currentUser.id,
        wifi_location: location_id,
        notes: "",
        folder_name: "",
        visit_status: "Planned"
      };

      // POST request to add a new favourite
      const response = await axios.post(
        "https://wifi-wander-api-835560a3f6c2.herokuapp.com/favourites/",
        formData
      );

      if (response.status === 201) {
        setSuccess("Added to favourites successfully!");
      }
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <div>
      {success && <p>{success}</p>}
      {errors && <p>Error: {errors}</p>}
      <button onClick={handleSubmit}>Add to Favourites</button>
    </div>
  );
};

export default AddFavourite;
