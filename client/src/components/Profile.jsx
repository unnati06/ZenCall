import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {useAuth} from '../constants/AuthContext';
const Profile = () => {
  
  const { user, isLoggedIn } = useAuth();
  const [userData, setUserData] = useState({
    name:"",
    email: "",
    phoneNumber: ""
  });

  useEffect(() => {
    if (isLoggedIn && user) {
      setUserData({
        name: user.username || "",  // Assuming your user object has these fields
        email: user.email || "",
        phoneNumber: user.phone || ""
      });
    }
  }, [user, isLoggedIn]);

  if (!isLoggedIn) {
    return <div>Please log in to view your profile.</div>;
  }

  const history = useHistory();
  const handleGoBack = () => {
    history.push("/dashboard"); // Navigate back to the dashboard page
  };
 
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Profile</h2>
      <div style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>First Name:</label>
          <input type="text" value={userData.name} readOnly style={styles.input} />
        </div>
       
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input type="email" value={userData.email} readOnly style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number:</label>
          <input type="text" value={userData.phoneNumber} readOnly style={styles.input} />
        </div>
      </div>
      <button onClick={handleGoBack} style={styles.button}>
       Go Back
      </button>     
    </div>
  );
};

// Basic styles for the profile page
const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    display: "block",
    width: "100%",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    fontSize: "16px",
  },
};

export default Profile;
