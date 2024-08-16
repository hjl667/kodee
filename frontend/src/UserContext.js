import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    // Initialize state with value from local storage or default to null
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

    useEffect(() => {
        // Whenever userId changes, update the local storage
        localStorage.setItem('userId', userId);
    }, [userId]);

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };

