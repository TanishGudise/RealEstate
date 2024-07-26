import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import PropertyDetails from './components/PropertyDetails';
import ProfileScreen from './components/ProfileScreen';
import FilterScreen from './components/FilterScreen';

function App() {
  const [data, setData] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/property-details" element={<PropertyDetails />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/filter" element={<FilterScreen data={data} setData={setData} />} />
      </Routes>
    </Router>
  );
}

export default App;
