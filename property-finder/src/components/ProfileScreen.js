import React, { useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProfileScreen.css';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [favorites, setFavorites] = useState(location.state?.favorites || []);

  const removeFavorite = (propertyId) => {
    setFavorites(favorites.filter((fav) => fav['Property ID'] !== propertyId));
  };

  return (
    <Container fluid className="profile-container">
      <Row className="my-4">
        <Col>
          <h1>User Profile</h1>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <h2>Favorites</h2>
        </Col>
      </Row>
      <Table striped bordered hover responsive className="favorites-table">
        <thead>
          <tr>
            <th>Property ID</th>
            <th>Location</th>
            <th>Price</th>
            <th>Attractiveness Score</th>
            <th>Type</th>
            <th>Size (sq feet)</th>
            <th>Year Built</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((property) => (
            <tr key={property['Property ID']}>
              <td>{property['Property ID']}</td>
              <td>{property.Location}</td>
              <td>{property.Price}</td>
              <td>{property['Attractiveness Score']}</td>
              <td>{property.Type}</td>
              <td>{property['Size (sq feet)']}</td>
              <td>{property['Year Built']}</td>
              <td>
                <Button variant="danger" onClick={() => removeFavorite(property['Property ID'])}>
                  Remove from Favorites
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row className="mt-4">
        <Col xs={6}>
          <Button variant="secondary" onClick={() => navigate('/home')}>
            Go to Home
          </Button>
        </Col>
        <Col xs={6} className="text-end">
          <Button variant="secondary" onClick={() => navigate('/property-details')}>
            Go to Properties
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen
