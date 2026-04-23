
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PropertyDetail from './pages/PropertyDetail';
import PropertyForm from './pages/PropertyForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/properties/new" element={<PropertyForm />} />
        <Route path="/properties/edit/:id" element={<PropertyForm />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
