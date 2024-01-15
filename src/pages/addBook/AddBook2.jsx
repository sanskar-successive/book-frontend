import React, {useState, useEffect} from 'react';
import { useFormik } from 'formik';
import "./AddBook2.css"
import { useParams } from "react-router-dom";
import axios from '../../axiosConfig'
import bookSchema from './bookSchema';
import { categories } from '../../helpers/categories';
import { languages } from '../../helpers/languages';
import ErrorPage from '../errorPage/ErrorPage';




const AddBook2 = () => {
    let initialValues = {
        title: '',
        coverImage: '',
        category: '',
        author: {
            name: '',
            about: '',
        },
        rating: 0,
        price: 0,
        moreDetails: {
            publisher: '',
            firstPublished: '',
            seller: '',
            text_language: '',
            description: '',
            fileSize: 0,
            pages: 0,
            verified: false,
            edition: 0,
        },
    };


    const { bookId } = useParams();
    console.log(bookId);

    let initialLoading = false;
    if (bookId) initialLoading = true;

    const [loading, setLoading] = useState(initialLoading);
    const [errors, setErrors] = useState("");

    const fetchBookData = async () => {
        try {
            const apiResponse = await axios.get(
                `http://localhost:5000/api/books/${bookId}`
            );
            formik.setValues(apiResponse.data.book);

        } catch (error) {
            console.error("Error fetching book data:", error);
            setErrors(error.message)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (bookId) {
            fetchBookData();
        }
    }, [bookId]);

    const addBook = async (values) => {
        try {
            let apiResponse;
            if (!bookId) {

                apiResponse = await axios.post(
                    "http://localhost:5000/api/books",
                    values
                );
            }
            else {
                apiResponse = await axios.patch(
                    `http://localhost:5000/api/books/${bookId}`,
                    values
                );
            }
            console.log(apiResponse.data.book);
        } catch (error) {
            console.log(error.message);
            setErrors(error.message)
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: bookSchema,
        onSubmit: (values, action) => {
            addBook(values);
            action.resetForm();
        },
    });

    if (loading) {
        return <h3>Loading...</h3>;
    }

    if (errors) {
        return <ErrorPage errorMessage={errors} />
    }

    return (
        <div className="add-book-container">
            <h2>Add Book</h2>

            <form className="add-book-form" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="title">Title:</label>
                    <input
                        className="form-input"
                        type="text"
                        id="title"
                        name="title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                    />
                    {formik.touched.title && formik.errors.title && (
                        <div className="error-message" style={{ color: 'red' }}>{formik.errors.title}</div>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="category">Category:</label>
                    <select
                        className="form-input"
                        id="category"
                        name="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                    >
                        <option value="">Select Category</option>
                        {categories.map((item) => {
                            return <option value={item}>{item}</option>;
                        })}

                    </select>
                    {formik.touched.category && formik.errors.category && (
                        <div className="error-message" style={{ color: 'red' }}>{formik.errors.category}</div>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="author.name">Author Name:</label>
                    <input
                        className="form-input"
                        type="text"
                        id="author.name"
                        name="author.name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.author.name}
                    />
                    {formik.touched.author?.name && formik.errors.author?.name && (
                        <div className="error-message" style={{ color: 'red' }}>{formik.errors.author?.name}</div>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="author.about">Author About:</label>
                    <textarea
                        className="form-input"
                        type="text"
                        rows={5}
                        id="author.about"
                        name="author.about"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.author.about}
                    />
                    {formik.touched.author?.about && formik.errors.author?.about && (
                        <div className="error-message" style={{ color: 'red' }}>{formik.errors.author?.about}</div>
                    )}
                </div>

                <div className="form-group">

                    <label className="form-label" htmlFor="rating">Rating:</label>
                    <input
                        className="form-input"
                        type="number"
                        id="rating"
                        name="rating"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rating}
                    />
                    {formik.touched.rating && formik.errors.rating && (
                        <div className="error-message" style={{ color: 'red' }}>{formik.errors.rating}</div>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="price">Price:</label>
                    <input
                        className="form-input"
                        type="number"
                        id="price"
                        name="price"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price}
                    />
                    {formik.touched.price && formik.errors.price && (
                        <div className="error-message" style={{ color: 'red' }}>{formik.errors.price}</div>
                    )}
                </div>

                <div className="form-group">

                    <label className="form-label" htmlFor="moreDetails.publisher">Publisher:</label>
                    <input
                        className="form-input"
                        type="text"
                        id="moreDetails.publisher"
                        name="moreDetails.publisher"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.moreDetails.publisher}
                    />
                    {formik.touched.moreDetails?.publisher && formik.errors.moreDetails?.publisher && (
                        <div className="error-message" style={{ color: 'red' }}>{formik.errors.moreDetails?.publisher}</div>
                    )}

                </div>
                <div className="form-group">

                    <label className="form-label" htmlFor="moreDetails.firstPublished">First Published:</label>
                    <input
                        className="form-input"
                        type="date"
                        id="moreDetails.firstPublished"
                        name="moreDetails.firstPublished"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.moreDetails.firstPublished}
                    />
                    {formik.touched.moreDetails?.firstPublished && formik.errors.moreDetails?.firstPublished && (
                        <div className="error-message" style={{ color: 'red' }}>{formik.errors.moreDetails?.firstPublished}</div>
                    )}

                </div>

                <div className="form-group">

                    <label className="form-label" htmlFor="moreDetails.seller">Seller:</label>
                    <input
                        className="form-input"
                        type="text"
                        id="moreDetails.seller"
                        name="moreDetails.seller"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.moreDetails.seller}
                    />
                    {formik.touched.moreDetails?.seller && formik.errors.moreDetails?.seller && (
                        <div className="error-message" style={{ color: 'red' }}>{formik.errors.moreDetails?.seller}</div>
                    )}

                </div>

                <div className="form-group">

                    <label className="form-label" htmlFor="moreDetails.text_language">Text Language:</label>
                    <select
                        className="form-input"
                        id="moreDetails.text_language"
                        name="moreDetails.text_language"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.moreDetails.text_language}
                    >
                        <option value="">Select Language</option>
                        {languages.map((item) => {
                            return <option value={item}>{item}</option>;
                        })}
                    </select>
                    {formik.touched.moreDetails?.text_language && formik.errors.moreDetails?.text_language && (
                        <div className="error-message" style={{ color: 'red' }}>{formik.errors.moreDetails?.text_language}</div>
                    )}

                </div>

                <div className="form-group">

                    <label className="form-label" htmlFor="moreDetails.description">Description:</label>
                    <textarea
                        className="form-input"
                        rows={8}
                        id="moreDetails.description"
                        name="moreDetails.description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.moreDetails.description}
                    />
                    {formik.touched.moreDetails?.description && formik.errors.moreDetails?.description && (
                        <div className="error-message" style={{ color: 'red' }}>{formik.errors.moreDetails?.description}</div>
                    )}

                </div>

                <div className="form-group">

                    <label className="form-label" htmlFor="moreDetails.fileSize">File Size:</label>
                    <input
                        className="form-input"
                        type="number"
                        id="moreDetails.fileSize"
                        name="moreDetails.fileSize"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.moreDetails.fileSize}
                    />
                    {formik.touched.moreDetails?.fileSize && formik.errors.moreDetails?.fileSize && (
                        <div className="error-message" style={{ color: 'red' }}>{formik.errors.moreDetails?.fileSize}</div>
                    )}

                </div>

                <div className="form-group">


                    <label className="form-label" htmlFor="moreDetails.pages">Pages:</label>
                    <input
                        className="form-input"
                        type="number"
                        id="moreDetails.pages"
                        name="moreDetails.pages"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.moreDetails.pages}
                    />
                    {formik.touched.moreDetails?.pages && formik.errors.moreDetails?.pages && (
                        <div className="error-message" style={{ color: 'red' }}>{formik.errors.moreDetails?.pages}</div>
                    )}

                </div>

                <div className="form-group">

                    <label className="form-label" htmlFor="moreDetails.verified">Verified:</label>
                    <input
                        className="form-input"
                        type="checkbox"
                        id="moreDetails.verified"
                        name="moreDetails.verified"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.moreDetails.verified}
                    />
                    {formik.touched.moreDetails?.verified && formik.errors.moreDetails?.verified && (
                        <div className="error-message" style={{ color: 'red' }}>{formik.errors.moreDetails?.verified}</div>
                    )}

                </div>

                <div className="form-group">

                    <label className="form-label" htmlFor="moreDetails.edition">Edition:</label>
                    <input
                        className="form-input"
                        type="number"
                        id="moreDetails.edition"
                        name="moreDetails.edition"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.moreDetails.edition}
                    />
                    {formik.touched.moreDetails?.edition && formik.errors.moreDetails?.edition && (
                        <div className="error-message" style={{ color: 'red' }}>{formik.errors.moreDetails?.edition}</div>
                    )}

                </div>


                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddBook2;
