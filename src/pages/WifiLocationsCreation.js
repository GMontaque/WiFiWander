import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import showAlert from '../components/Sweetalert';
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import AutoComplete from '../components/AutoComplete';
import { useCurrentUser } from '../components/CurrentUserContext';

const WifiLocationsCreation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  // List of amenities options
  const amenitiesList = ["Outside Seating", "Desks", "Private Rooms", "Coffee", "Food", "Meeting Rooms"];

  // Form data
  const [wifiData, setWifiData] = useState({
    name: "",
    street: "",
    city: "",
    country: "",
    postcode: "",
    description: "",
    amenities: [],
    image: null,
    continent: "",
  });

  const [errors, setErrors] = useState({});
  const [wifiLocation, setWifiLocation] = useState(null);

  const { name, street, city, country, postcode, description, amenities, image, continent } = wifiData;

  useEffect(() => {
    const fetchWifiLocation = async () => {
      if (id) {
        try {
          const { data } = await axiosReq.get(`/wifi_locations/${id}/`);
          setWifiLocation(data);
          setWifiData({
            name: data.name,
            street: data.street,
            city: data.city,
            country: data.country,
            postcode: data.postcode,
            description: data.description,
            amenities: data.amenities.split(", "),
            image: data.image,
            continent: data.continent,
          });
        } catch (err) {
          showAlert('error', "Error fetching WiFi location data, please try again", 'error');
          setErrors((prevErrors) => ({ ...prevErrors, fetch: "Failed to load WiFi location data." }));
        }
      }
    };

    fetchWifiLocation();
  }, [id]);

  // Input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWifiData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checkbox change for amenities
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setWifiData((prevData) => {
      const updatedAmenities = checked
        ? [...prevData.amenities, value]
        : prevData.amenities.filter((amenity) => amenity !== value);
      return { ...prevData, amenities: updatedAmenities };
    });
  };

  const handleCitySelect = (selectedCity, selectedCountry) => {
    setWifiData((prevData) => ({
      ...prevData,
      city: selectedCity,
      country: selectedCountry,
    }));
  };

  const handleFileChange = (e) => {
    setWifiData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("street", street);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("postcode", postcode);
    formData.append("description", description);
    formData.append("amenities", amenities.join(", "));
    formData.append("continent", continent);

    // Append image only if a new image is selected
    if (typeof image === 'object' && image !== null) {
      formData.append("image", image);
    }

    // Checks current user
    const canEditOrDelete = currentUser && (currentUser.username === wifiLocation?.added_by || currentUser.is_admin);

    if (id && !canEditOrDelete) {
      showAlert('warning', "You are not authorized to edit this WiFi location.", 'warning');
      return;
    }

    try {
      if (id) {
        await axiosRes.put(`/wifi_locations/${id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axiosRes.post("/wifi_locations/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      navigate("/");
    } catch (err) {
      setErrors(err.response?.data || { submit: "Failed to submit form." });
      showAlert('error', "Error submitting form, please try again", 'error');
    }
  };

  return (
    <Container>
      <h1>{id ? "Edit WiFi Location" : "Create WiFi Location"}</h1>
      <Form onSubmit={handleSubmit}>
        {/* Name Field */}
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter WiFi location name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          {errors.name?.map((message, idx) => (
            <Alert variant="warning" key={idx}>{message}</Alert>
          ))}
        </Form.Group>

        {/* Address Fields */}
        <Form.Group controlId="street" className="mb-3">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="Street"
            name="street"
            value={street}
            onChange={handleChange}
          />
        </Form.Group>

        {/* City Field with AutoComplete */}
        <Form.Group controlId="city" className="mb-3">
          <Form.Label>City</Form.Label>
          <AutoComplete type="city" onSelect={handleCitySelect} />
        </Form.Group>

        {/* Country Field (Read Only) */}
        <Form.Group controlId="country" className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Country"
            name="country"
            value={country}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="postcode" className="mb-3">
          <Form.Label>Postcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Postcode"
            name="postcode"
            value={postcode}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Continent Field */}
        <Form.Group controlId="continent" className="mb-3">
          <Form.Label>Continent</Form.Label>
          <Form.Control
            as="select"
            name="continent"
            value={continent}
            onChange={handleChange}
          >
            <option value="">Select a Continent</option>
            <option value="Africa">Africa</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="Australia">Australia</option>
            <option value="South America">South America</option>
          </Form.Control>
        </Form.Group>

        {/* Description Field */}
        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Amenities Field */}
        <Form.Group className="mb-3" controlId="amenities">
          <Form.Label>Amenities</Form.Label>
          {amenitiesList.map((item, index) => (
            <Form.Check
              type="checkbox"
              label={item}
              key={index}
              value={item}
              checked={amenities.includes(item)}
              onChange={handleCheckboxChange}
            />
          ))}
        </Form.Group>
        {errors.amenities?.map((message, idx) => (
          <Alert variant="warning" key={idx}>{message}</Alert>
        ))}

        {/* Image Upload */}
        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Image Upload</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleFileChange}
          />
          {image && typeof image === 'string' && (
            <div>
              <img src={image} alt="Current" style={{ width: '100px', marginTop: '10px' }} />
              <p>Current image will be used if no new image is selected.</p>
            </div>
          )}
        </Form.Group>

        {/* Display any error messages */}
        {Object.keys(errors).length > 0 && (
          <Alert variant="danger">
            {Object.values(errors).flat().join(", ")}
          </Alert>
        )}

        {/* Conditional Buttons for Update or Save */}
        {id ? (
          <Button variant="primary" type="submit">
            Update WiFi Location
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Save WiFi Location
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default WifiLocationsCreation;
