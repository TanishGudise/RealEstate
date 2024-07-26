import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import propertiesData from '../properties2.json';
import './FilterScreen.css';

const SORT_TYPES = [
  { key: 'default', value: 'Default' },
  { key: 'newest', value: 'Newest' },
  { key: 'oldest', value: 'Oldest' },
  { key: 'price', value: 'Price' },
  { key: 'attractiveness', value: 'Attractiveness' },
];

const FilterScreen = ({ location }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState('default');
  const [filterType, setFilterType] = useState('All');
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedPrice, setSelectedPrice] = useState(1000000);
  const [sortedData, setSortedData] = useState(propertiesData);

  useEffect(() => {
    let sorted = [...propertiesData];

    if (sortType === 'newest') {
      sorted.sort((a, b) => b['Year Built'] - a['Year Built']);
    } else if (sortType === 'oldest') {
      sorted.sort((a, b) => a['Year Built'] - b['Year Built']);
    } else if (sortType === 'price') {
      sorted.sort((a, b) => a.Price - b.Price);
    } else if (sortType === 'attractiveness') {
      sorted.sort((a, b) => b['Attractiveness Score'] - a['Attractiveness Score']);
    }

    if (filterType !== 'All') {
      sorted = sorted.filter((item) => item.Type === filterType);
    }

    sorted = sorted.filter((item) => item['Year Built'] <= selectedYear && item.Price <= selectedPrice);

    setSortedData(sorted);
  }, [sortType, filterType, selectedYear, selectedPrice]);

  const applyFilters = () => {
    navigate('/property-details', { state: { sortedData } });
  };

  return (
    <Container fluid className="filter-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1 className="text-center">Filter and Sort Properties</h1>
          <Form>
            <Form.Group controlId="sortType" className="mb-3">
              <Form.Label>Sort by</Form.Label>
              <Form.Select value={sortType} onChange={(e) => setSortType(e.target.value)}>
                {SORT_TYPES.map((sortOption) => (
                  <option key={sortOption.key} value={sortOption.key}>
                    {sortOption.value}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="filterType" className="mb-3">
              <Form.Label>Filter by Type</Form.Label>
              <Form.Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="All">All</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Apartment">Apartment</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="filterYear" className="mb-3">
              <Form.Label>Filter by Year Built</Form.Label>
              <Form.Control
                type="range"
                min="1900"
                max="2024"
                step="1"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              />
              <Form.Text>Selected Year: {selectedYear}</Form.Text>
            </Form.Group>
            <Form.Group controlId="filterPrice" className="mb-3">
              <Form.Label>Filter by Price (up to)</Form.Label>
              <Form.Control
                type="range"
                min="0"
                max="1000000"
                step="10000"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
              />
              <Form.Text>Selected Price: {selectedPrice}</Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={applyFilters} className="w-100">
              Apply Filters
            </Button>
            <Button variant="secondary" onClick={() => navigate('/property-details')} className="w-100 mt-3">
              Go to Properties
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FilterScreen;
