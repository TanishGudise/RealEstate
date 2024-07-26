import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="home-container">
      <Row className="justify-content-center text-center">
        <Col>
          <Image src={`${process.env.PUBLIC_URL}/logo2.png`} className="logo" alt="Logo" />
          <h1>Property Finder</h1>
          <Button variant="primary" size="lg" className="my-3" onClick={() => navigate('/property-details')}>
            View Properties
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('/profile')}>
            View Profile
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
