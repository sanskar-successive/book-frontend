import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { transformFormData } from '../../helpers/tranformFormData';

const Login = () => {
  const [account, setAccount] = useState("login");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formDataJson = Object.fromEntries(formData.entries());

    try {
      const { data } = await axios.post("http://localhost:5000/users/login", formDataJson);

      if (data.authorised) {
        localStorage.setItem("AUTH-TOKEN", data.token);
        navigate('/', { replace: true })
      }
    } catch (error) {
      console.log("Some error occurred", error);
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formDataJson = transformFormData(Object.fromEntries(formData.entries()));

    try {
      const { data } = await axios.post("http://localhost:5000/users/", formDataJson);
      console.log(data.message);
    } catch (error) {
      console.log("Some error occurred in register", error);
    }
  }

  return (
    <div className="login-container">
      {account === "login" ? (
        <div className="login-form">
          <h3>User Login</h3>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email : <input name='email' type="email" /></label>
            <label htmlFor="password">Password : <input name='password' type="password" /></label>
            <button type='submit'>Login</button>
          </form>
          <button onClick={() => setAccount("register")}>Register</button>
        </div>
      ) : (
        <div className="register-form">
          <h3>User Register</h3>
          <form onSubmit={handleRegister}>
            <label htmlFor="firstName">First Name : <input name='firstName' type="text" /></label>
            <label htmlFor="lastName">Last Name : <input name='lastName' type="text" /></label>
            <label htmlFor="email">Email : <input name='contact.email' type="email" /></label>
            <label htmlFor="phone">Phone : <input name='contact.phone' type="number" /></label>
            <label htmlFor="password">Password : <input name='password' type="password" /></label>
            <label htmlFor="confirmPassword">Confirm Password : <input name='confirmPassword' type="password" /></label>
            <button type='submit'>Register</button>
          </form>
          <button onClick={() => setAccount("login")}>Login</button>
        </div>
      )}
    </div>
  );
}

export default Login;
