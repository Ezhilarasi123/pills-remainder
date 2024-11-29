import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard.js';
import MedicationDetails from './components/MedicationDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import './style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/medication" element={<MedicationDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
