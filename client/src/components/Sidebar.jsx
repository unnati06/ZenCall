import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../constants/AuthContext'; // Import the context to get user data
import '../styles/Sidebar.css';

const Sidebar = () => {
  const { user, LogoutUser } = useAuth(); // Get the logged-in user

  // Extract the first letter of the user's name (fallback to "U" if user is undefined)
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';


  const handleLogout = () => {
    LogoutUser(); // Call logout from the context (assuming it clears user data)
  };
  return (
    <div className="sidebar">
      {/* Circle with the user's first initial */}
      <div className="sidebar-icon user-circle">
        {userInitial}
      </div>
      <div className="sidebar-menu">
        <ul>
          <li>
            <a href="#" className="active">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </a>
          </li>
          <li>
            <Link to="/scheduled">
              <i className="fas fa-clock"></i>
              <span>Scheduled</span>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <i className="fas fa-video"></i>
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-logout">
        <Link to="/" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
