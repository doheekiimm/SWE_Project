import React from 'react';

const LoginConfirmation = () => {
    const token = localStorage.getItem('token');

    return (
        <div>
            <h1>Login Successful!</h1>
            <p>Welcome to our website, token =  {token} </p>
        </div>
    );
};

export default LoginConfirmation;