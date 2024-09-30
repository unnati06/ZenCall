import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Register.css';
import { useAuth } from '../constants/AuthContext';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const history = useHistory();
  const {storeTokenInLS} = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch('https://zencall.onrender.com/api/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      console.log('response data : ', response);

      if (response.ok) {
        const responseData = await response.json();
        alert('Registration successful');
        storeTokenInLS(responseData.token);
        history.push('/login');
        setUser({ username: '', email: '',phone:'', password: '' });
        console.log(responseData);
      } else {
        console.log('error inside response ', 'error');
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div className="register-container">
      <h1>Sign Up!</h1>
      <p>Register yourself to Circuit-Master!</p>
      <form onSubmit={handleSubmit} className="register-form">
        
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your Username"
          value={user.username}
          onChange={handleInput}
          required
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email Address"
          value={user.email}
          onChange={handleInput}
          required
        />
        <input
          type="phone"
          id="phone"
          name="phone"
          placeholder="enter your number"
          value={user.phone}
          onChange={handleInput}
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInput}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <p className="link">
        Already a member? <a href="/login">Login!</a>
      </p>
    
      
    </div>
  );
};

export default Register;
