import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Admin from './admin/Admin';
import Login from './pages/Login';
//needed to use col, row, other bootstraps
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';



function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="*" element={<Login />} />
            <Route path="*" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
    </BrowserRouter> 
  );
}

export default App;
