import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails({ ...loginDetails, [name]: value })
    }

    const validateLogin = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post("http://localhost:5000/users/login", loginDetails);
            console.log(data);

            if(data.message === "user logged in successfully"){
                localStorage.setItem("token", JSON.stringify(data.token))
                navigate('/')
            }
            setLoading(false);

        } catch (error) {
            console.log("some error occured");
        }
    }

    const handleLogin = () => {
        console.log(loginDetails);
        validateLogin()
    }

    return (
        <div style={{ marginLeft: "300px" }}>
            <h3>User Login</h3>
            <label htmlFor="email">Email : <input name='email' type="email" value={loginDetails.email} onChange={handleInputChange} /></label>
            <label htmlFor="password">Password : <input name='password' type="password" value={loginDetails.password} onChange={handleInputChange} /></label>
            <button onClick={handleLogin} >Login</button>
        </div>
    )
}
export default Login