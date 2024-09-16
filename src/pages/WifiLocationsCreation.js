import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import showAlert from '../components/Sweetalert';
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import AutoComplete from '../components/AutoComplete';
import { useCurrentUser } from '../components/CurrentUserContext';
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import CheckboxGroup from "../components/CheckboxGroup";
import ImagePreview from "../components/ImagePreview";
import Loader from '../components/Loader';

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
  const [loading, setLoading] = useState(false);

  const { name, street, city, country, postcode, description, amenities, image, continent } = wifiData;

  useEffect(() => {
    const fetchWifiLocation = async () => {
      if (id) {
        setLoading(true);
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
        } finally {
          setLoading(false);
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

    if (typeof image === 'object' && image !== null) {
      formData.append("image", image);
    }

    const canEditOrDelete = currentUser && (currentUser.username === wifiLocation?.added_by || currentUser.username === 'adminuser');

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

  // loader when fetching data
  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <Container>
      <h1 className="text-center wificreation-title">{id ? "Edit WiFi Location" : "Create WiFi Location"}</h1>
      <Form onSubmit={handleSubmit} className="wificreation-form">
        <TextInput label="Name" name="name" value={name} handleChange={handleChange} errors={errors.name} />
        <TextInput label="Street" name="street" value={street} handleChange={handleChange} errors={errors.street} />

        <Form.Group controlId="city" className="mb-3">
          <Form.Label>{id ? <p>City: {wifiData.city}</p> : "City"}</Form.Label>
          <AutoComplete type="city" onSelect={handleCitySelect} />
          {errors.city?.map((message, idx) => (
            <Alert variant="warning" key={idx}>{message}</Alert>
          ))}
        </Form.Group>

        <TextInput label="Country" name="country" value={country} handleChange={handleChange} errors={errors.country} readOnly />
        <TextInput label="Postcode" name="postcode" value={postcode} handleChange={handleChange} errors={errors.postcode} />
        <TextArea label="Description" name="description" value={description} handleChange={handleChange} errors={errors.description} rows={5} />

        <CheckboxGroup options={amenitiesList} selectedOptions={amenities} handleChange={handleCheckboxChange} />

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
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="Australia">Australia</option>
            <option value="South America">South America</option>
          </Form.Control>
          {errors.continent?.map((idx) => (
            <Alert variant="warning" key={idx}>This field can not be blank</Alert>
          ))}
        </Form.Group>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Image Upload</Form.Label>
          <Form.Control type="file" name="image" onChange={handleFileChange} />
          <ImagePreview image={image} />
        </Form.Group>

        {Object.keys(errors).length > 0 && (
          <Alert variant="danger">
            Please review the form and add in the missing information
          </Alert>
        )}

        <div className="btn-back m-top-1 mt-5">
          <Button type="submit" className="btn" variant="">
            {id ? "Update WiFi Location" : "Save WiFi Location"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default WifiLocationsCreation;
