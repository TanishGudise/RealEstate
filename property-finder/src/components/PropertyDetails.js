import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import propertiesData from '../properties2.json';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState(location.state?.favorites || []);
  const [originalData, setOriginalData] = useState(propertiesData);

  useEffect(() => {
    setData(location.state?.sortedData || propertiesData);
  }, [location.state?.sortedData]);

  const toggleFavorite = (property) => {
    if (favorites.some((fav) => fav['Property ID'] === property['Property ID'])) {
      setFavorites(favorites.filter((fav) => fav['Property ID'] !== property['Property ID']));
    } else {
      setFavorites([...favorites, property]);
    }
  };

  const updateAttractivenessScore = (propertyId, newScore) => {
    const updatedData = data.map((property) =>
      property['Property ID'] === propertyId ? { ...property, 'Attractiveness Score': newScore } : property
    );
    setData(updatedData);

    const updatedOriginalData = originalData.map((property) =>
      property['Property ID'] === propertyId ? { ...property, 'Attractiveness Score': newScore } : property
    );
    setOriginalData(updatedOriginalData);
  };

  return (
    <Container fluid className="property-details-container">
      <Row className="my-4 justify-content-between">
        <Col xs="auto">
          <Button variant="secondary" onClick={() => navigate('/hom')}>
            Go to Home
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="secondary" onClick={() => navigate('/profile', { state: { favorites } })}>
            Go to Profile
          </Button>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <h1>Property Details</h1>
        </Col>
      </Row>
      <Table striped bordered hover responsive className="property-details-table">
        <thead>
          <tr>
            <th>Property ID</th>
            <th>Location</th>
            <th>Price</th>
            <th>Attractiveness Score</th>
            <th>Type</th>
            <th>Size (sq feet)</th>
            <th>Year Built</th>
            <th>Favorites</th>
            <th>Adjust Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((property) => (
            <tr key={property['Property ID']}>
              <td>{property['Property ID']}</td>
              <td>{property.Location}</td>
              <td>{property.Price}</td>
              <td>{property['Attractiveness Score']}</td>
              <td>{property.Type}</td>
              <td>{property['Size (sq feet)']}</td>
              <td>{property['Year Built']}</td>
              <td>
                <Button
                  variant={favorites.some((fav) => fav['Property ID'] === property['Property ID']) ? 'danger' : 'success'}
                  onClick={() => toggleFavorite(property)}
                >
                  {favorites.some((fav) => fav['Property ID'] === property['Property ID']) ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
              </td>
              <td>
                <Form>
                  <Form.Group>
                    <Form.Label>Attractiveness Score</Form.Label>
                    <Form.Control
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={property['Attractiveness Score']}
                      onChange={(e) => updateAttractivenessScore(property['Property ID'], parseInt(e.target.value))}
                    />
                    <Form.Text>{property['Attractiveness Score']}</Form.Text>
                  </Form.Group>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row className="mt-4">
        <Col>
          <Button variant="primary" onClick={() => navigate('/filter', { state: { data: originalData } })}>
            Filter and Sort
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyDetails;
