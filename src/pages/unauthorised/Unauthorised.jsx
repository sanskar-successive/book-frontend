import React from 'react'
import { useNavigate } from 'react-router-dom'

const Unauthorised = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login', {replace:true})
    }

    return (
        <div style={{ marginLeft: "500px", marginTop: "500px" }}>
            <h2>Session expired, Login Again</h2>
            <button onClick={handleClick}>Go to login</button>
        </div>
    )
}

export default Unauthorised