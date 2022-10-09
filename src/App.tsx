import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import DetailsPage from './components/DetailsPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path='/user/:id'
          element={<DetailsPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
