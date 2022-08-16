import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashbaord from './Components/Dashboard'
import Login from './Components/Login'
import Register from './Components/Register'
import Header from './Components/Header'
import Home from './Components/Home'

function App() {
  return (
    <>
    <Router>
    <div className = "container">
      <Header />
      <Routes>
        <Route path='/dashboard' element={<Dashbaord />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/' element={<Home />} />

      </Routes>
    </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
