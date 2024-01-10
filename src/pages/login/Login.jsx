import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

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

            if(data.authorised){
                localStorage.setItem("AUTH-TOKEN", data.token);
                navigate('/', {replace:true})
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
            <Link to={'/register'}  >Register</Link>
        </div>
    )
}
export default Login