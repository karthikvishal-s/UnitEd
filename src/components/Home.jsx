import React from 'react';
import { Outlet } from 'react-router-dom';
//import '../styles/Home.css';
import {Navbar} from './Navbar';
import { HomePage } from './HomePage';
function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <Outlet />
    </div>
    
  );
}

export default Home;