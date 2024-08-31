import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import countriesCities from '../Json/worldcities.json';

const WifiLocationsCreation = () => {
  const [wifiData, setWifiData] = useState({
    name: "",
    street: "",
    city: "",
    country: "",
    postcode: "",
    description: "",
    amenities: "",
    image: null
  });

  const { name, street, city, country, postcode, description, amenities, image } = wifiData;
  const [errors, setErrors] = useState({});
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [countrySuggestions, setCountrySuggestions] = useState([]);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (!name) return;

    setWifiData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Autocomplete logic for city and country
    if (name === "city") {
      const filteredCities = countriesCities
        .filter((item) => item.city.toLowerCase().includes(value.toLowerCase()))
        .map((item) => item.city);
      setCitySuggestions(filteredCities);

      // Auto-complete country based on city
      const matchedCity = countriesCities.find((item) => item.city.toLowerCase() === value.toLowerCase());
      if (matchedCity) {
        setWifiData((prevData) => ({
          ...prevData,
          country: matchedCity.country
        }));
        setCountrySuggestions([]);
      }
    } else if (name === "country") {
      const filteredCountries = countriesCities
        .filter((item) => item.country.toLowerCase().includes(value.toLowerCase()))
        .map((item) => item.country);
      setCountrySuggestions(filteredCountries);
    }
  };

  // Handle file change for the image
  const handleFileChange = (e) => {
    setWifiData((prevData) => ({
      ...prevData,
      image: e.target.files[0]
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset errors before submission
    setErrors({});

    // form data submission
    const formData = new FormData();
    formData.append('name', name || "");
    formData.append('street', street || "");
    formData.append('city', city || "");
    formData.append('country', country || "");
    formData.append('postcode', postcode || "");
    formData.append('description', description || "");
    formData.append('amenities', amenities || "");
    if (image) {
      formData.append('image', image);
    }

    try {
      // Submit the WiFi location data to the backend
      const base_url = "https://wifi-wander-api-835560a3f6c2.herokuapp.com"
      await axios.post(base_url + '/wifi_locations/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate("/");
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  const amenitiesList = ["Outdoor Seating", "Private desks", "Hot Drinks", "Food", "Meeting Rooms", "Power Sockets", "Public Transport"];

  return (
    <>
      <h1>Wifi Location Creation</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wifi Location Name"
            name="name"
            value={name || ""}
            onChange={handleChange}
          />
          {errors.name?.map((message, idx) => (
            <Alert variant="warning" key={idx}>{message}</Alert>
          ))}
        </Form.Group>

        <Form.Group className="mb-3" controlId="street">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="Street"
            name="street"
            value={street || ""}
            onChange={handleChange}
          />
          {errors.street?.map((message, idx) => (
            <Alert variant="warning" key={idx}>{message}</Alert>
          ))}
        </Form.Group>

        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            name="city"
            value={city || ""}
            onChange={handleChange}
            autoComplete="off"
            list="city-list"
          />
          <datalist id="city-list">
            {citySuggestions.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
          {errors.city?.map((message, idx) => (
            <Alert variant="warning" key={idx}>{message}</Alert>
          ))}
        </Form.Group>

        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Country"
            name="country"
            value={country || ""}
            onChange={handleChange}
            autoComplete="off"
            list="country-list"
          />
          <datalist id="country-list">
            {countrySuggestions.map((country, index) => (
              <option key={index} value={country} />
            ))}
          </datalist>
          {errors.country?.map((message, idx) => (
            <Alert variant="warning" key={idx}>{message}</Alert>
          ))}
        </Form.Group>

        <Form.Group className="mb-3" controlId="postcode">
          <Form.Label>Postcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Postcode"
            name="postcode"
            value={postcode || ""}
            onChange={handleChange}
          />
          {errors.postcode?.map((message, idx) => (
            <Alert variant="warning" key={idx}>{message}</Alert>
          ))}
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Please describe the wifi location"
            name="description"
            value={description || ""}
            onChange={handleChange}
          />
          {errors.description?.map((message, idx) => (
            <Alert variant="warning" key={idx}>{message}</Alert>
          ))}
        </Form.Group>

        <Form.Group className="mb-3" controlId="amenities">
          <Form.Label>Amenities</Form.Label>
          {amenitiesList.map((item, index) => (
            <Form.Check
              type="checkbox"
              label={item}
              name="amenities"
              key={index}
              value={item}
              onChange={handleChange}
            />
          ))}
          {errors.amenities?.map((message, idx) => (
            <Alert variant="warning" key={idx}>{message}</Alert>
          ))}
        </Form.Group>

        <Form.Group controlId="imageUpload" className="mb-3">
          <Form.Label>Image Upload</Form.Label>
          <Form.Control type="file" size="lg" onChange={handleFileChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default WifiLocationsCreation;
