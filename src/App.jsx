import React from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Home from './components/Home';
import Profile from './components/Profile';
import FeedbackReport from './components/FeedbackReport';
import Complain from './components/Complain';
import RaiseIssue from './components/RaiseIssue';
import ShowcaseTalent from './components/ShowcaseTalent';
import { HomePage } from './components/HomePage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<Dashboard userData={{ grade: "10", school: "XYZ", locality: "City" }} />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="feedback" element={<FeedbackReport />} />
          <Route path="complain" element={<Complain />} />
          <Route path="raise-issue" element={<RaiseIssue />} />
          <Route path="showcase" element={<ShowcaseTalent />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
