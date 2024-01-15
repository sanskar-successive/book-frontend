import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useFormik } from 'formik';
import { loginSchema, registerSchema } from './loginSchema';
import ErrorPage from '../errorPage/ErrorPage';

const initialRegisterValues = {
    firstName: "",
    lastName: "",
    contact: {
        email: "",
        phone: ""
    },
    password: "",
    confirmPassword: ""
}

const initialLoginValues = {
    email: "",
    password: ""
}

const Login = () => {


    const [account, setAccount] = useState("login");
    const navigate = useNavigate();
    const [errors, setErrors] = useState("");

    const handleLogin = async (values) => {

        try {
            const { data } = await axios.post("http://localhost:5000/users/login", values);

            if (data.authorised) {
                localStorage.setItem("AUTH-TOKEN", data.token);
                navigate('/', { replace: true })
            }
        } catch (error) {
            console.log("Some error occurred", error);
            setErrors(error.message)
        }
    }

    const handleRegister = async (values) => {

        try {
            const { data } = await axios.post("http://localhost:5000/users/", values);
            console.log(data.message);
        } catch (error) {
            console.log("Some error occurred in register", error);
            setErrors(error.message)
        }
    }

    const loginFormik = useFormik({
        initialValues: initialLoginValues,
        validationSchema: loginSchema,
        onSubmit: (values, action) => {
            handleLogin(values);
            action.resetForm();
        },
    });

    const formik = useFormik({
        initialValues: initialRegisterValues,
        validationSchema: registerSchema,
        onSubmit: (values, action) => {
            handleRegister(values);
            action.resetForm();
        },
    });

    return (
        <div className="auth-container">
            {account === "login" ? (
                <div className="auth-form">
                    <h3>User Login</h3>

                    <form onSubmit={loginFormik.handleSubmit}>

                        <div className="form-group">
                            <label className="form-label" htmlFor="email"> Email :</label>
                            <input
                                className="form-input"
                                name="email"
                                id="email"
                                type="email"
                                onChange={loginFormik.handleChange}
                                onBlur={loginFormik.handleBlur}
                                value={loginFormik.values.email}
                            />

                            {loginFormik.touched.email && loginFormik.errors.email && (
                                <div className="error-message">{loginFormik.errors.email}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password"> Password :  </label>
                            <input
                                className="form-input"
                                name="password"
                                type="password"
                                onChange={loginFormik.handleChange}
                                onBlur={loginFormik.handleBlur}
                                value={loginFormik.values.password}
                            />

                            {loginFormik.touched.password && loginFormik.errors.password && (
                                <div className="error-message">{loginFormik.errors.password}</div>
                            )}
                        </div>

                        {errors.length ? <p>Login Failed! Invalid email or password</p> : null}
                        <button className="submit-button" type="submit">Login</button>
                    </form>
                    <button className="submit-button" onClick={() => setAccount("register")}>Register</button>
                </div>
            ) : (
                <div className="auth-form">
                    <h3>User Register</h3>

                    <form onSubmit={formik.handleSubmit}>

                        <div className="form-group">
                            <label className="form-label" htmlFor="firstName"> First Name :</label>
                            <input
                                className="form-input"
                                name="firstName"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                            />

                            {formik.touched.firstName && formik.errors.firstName && (
                                <div className="error-message">{formik.errors.firstName}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="lastName"> Last Name :  </label>
                            <input
                                className="form-input"
                                name="lastName"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                            />

                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="contact.email"> Email :  </label>
                            <input
                                className="form-input"
                                id="contact.email"
                                name="contact.email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.contact.email}
                            />

                            {formik.touched.contact?.email && formik.errors.contact?.email && (
                                <div className="error-message">{formik.errors.contact?.email}</div>
                            )}

                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="contact.phone"> Phone : </label>
                            <input
                                className="form-input"
                                id="contact.phone"
                                name="contact.phone"
                                type="number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.contact.phone}
                            />

                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password"> Password : </label>
                            <input
                                className="form-input"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />

                            {formik.touched.password && formik.errors.password && (
                                <div className="error-message">{formik.errors.password}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="confirmPassword"> Confirm Password :   </label>
                            <input
                                className="form-input"
                                name="confirmPassword"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                            />

                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <div className="error-message">{formik.errors.confirmPassword}</div>
                            )}
                        </div>

                        {errors.length ? <p>User registration failed! Try again later</p> : null}

                        <button className="submit-button" type="submit">Register</button>
                    </form>
                    <button className="submit-button" onClick={() => setAccount("login")}>Login</button>
                </div>
            )}
        </div>
    );
}

export default Login;
