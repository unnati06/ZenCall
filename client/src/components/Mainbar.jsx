import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Mainbar.css';
import TimePicker from './TimePicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../constants/AuthContext';

const Mainbar = () => {
  const { token, user } = useAuth();
  const [meetingName, setMeetingName] = useState('');
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [meetingTime, setMeetingTime] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('User not logged in');
      return;
    }

    if (!meetingName || !meetingDate || !meetingTime) {
      alert('Please fill out all fields');
      return;
    }

    const formattedDate = meetingDate.toISOString();

    try {
      const response = await fetch('http://localhost:5000/api/auth/scheduled', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user._id,
          meetingName,
          meetingDate: formattedDate,
          meetingTime,
        }),
      });

      if (response.ok) {
        alert('Meeting scheduled successfully!');
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        alert(`Failed to schedule meeting: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      alert('Failed to schedule meeting');
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="mainbar">
      <div className="image-container">
        <img src="../../assets/banner.jfif" alt="img" />
        <div className="time-container">
          <TimePicker />
        </div>
      </div>
      <div className="gap"></div>
      <div className="boxes">
        <Link to="/meeting" className="box1">
          Video call your bestie
        </Link>
        <Link to="/previous" className="box2">
         History
        </Link>
        <div className="box3" onClick={toggleModal}>Schedule it</div>
        
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Schedule a Meeting</h2>
            <form onSubmit={handleSubmit} className="meeting-form">
              <div className="form-group">
                <label htmlFor="name">Meeting Name:</label>
                <input
                  type="text"
                  id="name"
                  value={meetingName}
                  onChange={(e) => setMeetingName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Meeting Date:</label>
                <DatePicker
                  selected={meetingDate}
                  onChange={(date) => setMeetingDate(date)}
                  dateFormat="dd/MM/yyyy"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Meeting Time:</label>
                <input
                  type="time"
                  id="time"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Schedule Meeting
              </button>
              <button type="button" className="close-btn" onClick={toggleModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mainbar;
