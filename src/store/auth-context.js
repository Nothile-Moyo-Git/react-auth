import React, { useState } from "react";

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

const calculateRemainingTime = (expirationTime) => {

    // Checks the current time 
    const currentTime = new Date().getTime();
    const adjustedExpirationTime = new Date(expirationTime).getTime();

    const remainder = adjustedExpirationTime - currentTime;

    return remainder;
}

const retrieveStoredToken = () => {

    // Get our stored token and expiration date from local storage
    const initialToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationDate');

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    // Don't log the user in if the token will expire in 1 minute or less, ( converted from milliseconds )

    if ( remainingTime <= 60000 ) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    } 

    return {
        token: initialToken,
        duration: remainingTime
    };
}

export const AuthContextProvider = (props) => {

    // Get our token and set it in a global state
    const tokenData = retrieveStoredToken();

    const [token, setToken] = useState(tokenData !== null ? tokenData.token : null);

    // If token exists and isn't empty
    const userIsLoggedIn = !!token;

    // Logout function, removes the token and clears the timeout
    const logoutHandler = () => {

        setToken(null);

        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    };

    // Login function, takes the token and expiration date based on our API response when we log in
    const loginHandler = (token, expirationTime) => {

        // Set token for global state
        setToken(token);

        // Store our token and expiration date
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationTime);

        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime);
        
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;