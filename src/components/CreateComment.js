import React from 'react'
import { Form, Button } from 'react-bootstrap'

const WifiLocationsCreation = () => {

    return (
        <>
            <h1>Wifi Location Creation</h1>
            <Form>
                {/* user name */}
                <Form.Group className="mb-3" controlId="Name">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Please enter your name" />
                </Form.Group>
                {/* location description */}
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Please describe the wifi location" />
                </Form.Group>
                {/* location star rating */}
                <Form.Group className="mb-3" controlId="starRating">
                    <Form.Label>Star Rating</Form.Label>
                    {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                            {[1, 2, 3, 4, 5].map((int, index) => (
                                <Form.Check
                                    inline
                                    label={index + 1}
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-${index + 1}`}
                                    key={index}
                                />
                            ))}
                        </div>
                    ))}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default WifiLocationsCreation