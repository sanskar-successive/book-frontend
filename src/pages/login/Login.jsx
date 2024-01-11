import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [account, setAccount] = useState("login");

    // login
    const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails({ ...loginDetails, [name]: value })
    }

    const validateLogin = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post("http://localhost:5000/users/login", loginDetails);
            console.log(data);

            if (data.authorised) {
                localStorage.setItem("AUTH-TOKEN", data.token);
                navigate('/', { replace: true })
            }
            setLoading(false);

        } catch (error) {
            console.log("some error occured");
        }
        finally{
            setLoading(false);
        }
    }

    const handleLogin = () => {
        console.log(loginDetails);
        validateLogin()
    }


    // register

    const [userDetails, setUserDetails] = useState({ firstName: "", lastName: "", contact: { email: "", phone: "" }, password: "", confirmPassword: "" });
    const [responseMessage, setResponseMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "email" || name === "phone") {
            setUserDetails({ ...userDetails, contact: { ...userDetails.contact, [name]: value } });
        }
        else {
            setUserDetails({ ...userDetails, [name]: value })
        }
    }


    const handleRegister = async () => {
        console.log(userDetails);
        try {
            setLoading(true);
            const { data } = await axios.post("http://localhost:5000/users/", userDetails);
            console.log(data);

            if (data.message === "user created successfully") {
                setResponseMessage("success");
            }
            else{
                setResponseMessage("failed");
            }
        } catch (error) {
            console.log("some error occured in register");
        }
        finally {
            setLoading(false);
        }
    }


    if (account === "login") {

        return (
            <div style={{ marginLeft: "300px" }}>
                <h3>User Login</h3>
                <label htmlFor="email">Email : <input name='email' type="email" value={loginDetails.email} onChange={handleLoginInputChange} /></label>
                <label htmlFor="password">Password : <input name='password' type="password" value={loginDetails.password} onChange={handleLoginInputChange} /></label>
                <button onClick={handleLogin} >Login</button>
                {/* <Link to={'/register'}  >Register</Link> */}
                <button onClick={()=>setAccount("regsiter")}>Register</button>
            </div>
        )
    }

    else {

        return (
            <div style={{ marginLeft: "300px" }}>
                <h3>User Register</h3>
                <label htmlFor="firstName">First Name : <input name='firstName' type="text" value={userDetails.firstName} onChange={handleInputChange} /></label>
                <label htmlFor="email">Last Name : <input name='lastName' type="text" value={userDetails.lastName} onChange={handleInputChange} /></label>
                <label htmlFor="email">Email : <input name='email' type="email" value={userDetails.contact.email} onChange={handleInputChange} /></label>
                <label htmlFor="email">Phone : <input name='phone' type="number" value={userDetails.contact.phone} onChange={handleInputChange} /></label>
                <label htmlFor="password">Password : <input name='password' type="password" value={userDetails.password} onChange={handleInputChange} /></label>
                <label htmlFor="confirmPassword">Confirm Password : <input name='confirmPassword' type="password" value={userDetails.confirmPassword} onChange={handleInputChange} /></label>
                <button onClick={handleRegister} >Register</button>
                {/* <Link to={'/login'}>Login</Link> */}
                <button onClick={()=>setAccount("login")}>Login</button>

            </div>
        )
    }



}
export default Login