import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home';
import User from './components/Details';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          index
          element={<Home />}
        />
        <Route
          path='/user/:id'
          element={<User />}
        />
      </Routes>
    </Router>
  );
}

export default App;
