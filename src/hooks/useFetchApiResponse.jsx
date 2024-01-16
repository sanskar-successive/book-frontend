import axios from '../axiosConfig';
import React, { useState } from 'react'

const useFetchApiResponse = () => {
    
    const [response, setResponse] = useState({loading : true, data : null, errors: null});

    const fetchApiResponse = async ()=>{
        try {
            const {data : {books}} = await axios.get()
            setResponse({...response, loading : false, data : books});
        } catch (error) {
            setResponse({...response, loading:false, errors : error.message})
        }
    }

    return response;
}

export default useFetchApiResponse