import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../constants/AuthContext";
import '../styles/PrevMeetings.css';

const PreviousMeetings = () => {
  const { user } = useAuth();
  const [meetings, setMeetings] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`https://zencall.onrender.com/api/auth/${user._id}/previousmeetings`);
        if (isMounted) {
          setMeetings(response.data.previousMeetings);
        }
      } catch (error) {
        console.error('Error fetching previous meetings:', error);
      }
    };

    if (user) {
      fetchMeetings();
    }

    return () => {
      setIsMounted(false);
    };
  }, [user]);

  return (
    <div>
      <h2>Previous Meetings</h2>
      {meetings.length > 0 ? (
        <ul>
          {meetings.map((meeting) => (
            <li key={meeting._id}>
              <p><strong>From:</strong> {meeting.from ? meeting.from.name : 'N/A'}</p>
              <p><strong>To:</strong> {meeting.to ? meeting.to.name : 'N/A'}</p>
              <p><strong>Date:</strong> {new Date(meeting.meetingDate).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No previous meetings found.</p>
      )}
    </div>
  );
};

export default PreviousMeetings;
