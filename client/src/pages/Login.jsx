import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../constants/AuthContext';
import '../styles/Login.css';

const URL = "http://localhost:5000/api/auth/login";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);  // To store error message
  const history = useHistory();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);  // Reset error state before making request

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const responseData = await response.json();
      alert('Login successful!');
      console.log("After login: ", responseData);

      storeTokenInLS(responseData.token);
      history.push("/dashboard");  // Redirect after successful login

    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);  // Set error message to show to the user
    }
  };


  const loginDemoUser = async () => {
    const demoData = {
      email: 'demotest@test.com',
      password: 'secret123',
    };
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(demoData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Demo login failed');
      }

      const responseData = await response.json();
      alert('Demo login successful!');
      console.log('After demo login:', responseData);

      storeTokenInLS(responseData.token);
      history.push("/dashboard");  // Redirect to dashboard

    } catch (error) {
      console.error("Demo login error:", error);
      setError(error.message);  // Set error message to show to the user
    }
  };
  return (
    <div>
      <div className="login-container">
        <h5 className='login'>Login</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}  {/* Display error message */}
          <button type="submit">Login</button>
        </form>

        <button type="button" className="demo-button" onClick={loginDemoUser}>
          Try Demo User
        </button>
        <p>Not a member? <Link to="/register">Sign Up!</Link></p>
      </div>
    </div>
  );
};

export default Login;
