import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../../UserContext';

const LoginForm = ({ setLoginFormOpen }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { userId, setUserId } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        console.log("Fetching user by username", username);

        try {
            // fetch the user by username
            const response = await fetch(`/api/user/${username}/find`);
            if (response.ok) {
                const user = await response.json();
                console.log("User fetched", user);

                // check if the password is correct
                if (user.password === password) {
                    // if the password is correct, set the user ID in the context
                    console.log("Password is correct, setting user ID in context");
                    setUserId(user.id);
                    localStorage.setItem('userId', user.id); // Store userId in localStorage
                    setLoginFormOpen(false);
                    navigate('/glossaries');
                } else {
                    // if the password is incorrect, show an error message
                    console.log("Password is incorrect");
                    alert("Incorrect password");
                }
            } else {
                // if the user could not be found, show an error message
                console.log("User not found");
                alert("User not found");
            }
        } catch (error) {
            // log any error that occurred while fetching the user
            console.log("Error while fetching user:", error);
        }
    };

    return (
        <div className="backdrop">
            <div className="loginForm">
                <div className="formContainer">
                    <button className="closeButton" onClick={() => setLoginFormOpen(false)}>X</button>
                    <div className="loginTitle">Log In</div>
                    <form onSubmit={handleLogin}>
                        <div className="inputGroup">
                            <label>Username:</label>
                            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label>Password:</label>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="LogButton" type="submit">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
