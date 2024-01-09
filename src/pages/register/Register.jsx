import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [userDetails, setUserDetails] = useState({ firstName: "", lastName: "", contact: { email: "", phone: "" }, password: "", confirmPassword: "" });

    const [loading, setLoading] = useState(false);
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
        </div>
    )
}
export default Register;