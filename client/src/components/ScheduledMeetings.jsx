import React, { useEffect, useState } from "react";
import { useAuth } from "../constants/AuthContext";
import '../styles/GetScheduled.css';

const ScheduledMeetings = () => {
  const { getScheduledMeetings, user } = useAuth();
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        console.log("User in ScheduledMeetings:", user); 
        const scheduledMeetings = await getScheduledMeetings();
        if (Array.isArray(scheduledMeetings)) {
          setMeetings(scheduledMeetings);
        } else {
          console.error("Scheduled meetings data is not an array:", scheduledMeetings);
        }
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, [getScheduledMeetings]);

  return (
    <div className="scheduled-meetings">
      <h2>Your Scheduled Meetings</h2>
      {meetings.length >= 0 ? (
        <ul>
          {meetings.map((meeting, index) => (
            <li key={index}>
              <h3>{meeting.meetingName}</h3>
              <p>Date: {new Date(meeting.meetingDate).toLocaleDateString()}</p>
              <p>Time: {meeting.meetingTime}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No meetings scheduled yet.</p>
      )}
    </div>
  );
};

export default ScheduledMeetings;
