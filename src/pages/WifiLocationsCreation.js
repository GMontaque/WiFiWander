import React from 'react';
import { Form, Button } from 'react-bootstrap';


const WifiLocationsCreation = () => {

  let amenitiesList = ["item1", "item2", "item3", "item4", "item5"]
  return (
    <>
      <h1>Wifi Location Creation</h1>
      <Form >
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wifi Location Name"
            name="name"
            value={""}

          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="street">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="Street"
            name="street"
            value={""}

          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            name="city"
            value={""}

          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Country"
            name="country"
            value={""}


          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="postcode">
          <Form.Label>Postcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Postcode"
            name="postcode"
            value={""}

          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Please describe the wifi location"
            name="description"
            value={""}

          />
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

            />
          ))}
        </Form.Group>

        <Form.Group controlId="imageUpload" className="mb-3">
          <Form.Label>Image Upload</Form.Label>
          <Form.Control type="file" size="lg" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default WifiLocationsCreation;
