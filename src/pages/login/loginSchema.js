import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string(),
    contact: yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        phone: yup.number().positive('Invalid phone number').integer('Invalid phone number'),
    }),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

export default registerSchema;


export const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});