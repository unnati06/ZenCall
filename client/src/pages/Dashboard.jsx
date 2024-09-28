// src/components/Dashboard.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.css';
import Mainbar from '../components/Mainbar';
const Dashboard = () => {
  return (
    <div className='dashboard container'>
      <div className="side">
       <Sidebar />
      </div >
      <div className="mainbar">
      {/* <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p> */}
      <Mainbar />
      </div>
    </div>
  );
};

export default Dashboard;
