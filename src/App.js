import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Admin from './admin/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
//needed to use col, row, other bootstraps
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
    </Router> 
  );
}

export default App;
