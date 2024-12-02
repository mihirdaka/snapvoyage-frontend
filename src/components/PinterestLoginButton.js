import React from 'react';
import axios from 'axios';

const PinterestLoginButton = () => {
    const handleLogin = async () => {
        try {
            // Get the Pinterest authorization URL from the backend
            const response = await axios.get('http://localhost:4000/api/pinterest/auth');
            // const { url } = response.data;
            const { url } = response.data;


            // Redirect the user to Pinterest for login
            window.location.href = url;
        } catch (error) {
            console.error('Error initiating Pinterest login:', error.message);
        }
    };

    return (
        <button onClick={handleLogin}>
            Login with Pinterest
        </button>
    );
};

export default PinterestLoginButton;
