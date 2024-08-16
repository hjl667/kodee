import React, { useState, useContext } from 'react';

const SignUpForm = ({ setSignUpFormOpen }) => {
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSignUp = async (event) => {
        event.preventDefault();

        // Create the user object
        const newUser = {
            name: newUsername, // Assuming the backend expects 'name' as the key for username
            password: newPassword  // You should have a password field in your User model in backend
        };
        try {
            // Post the new user details to the API
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                const createdUser = await response.json();
                console.log("User created successfully:", createdUser);
                // Here, you might want to redirect the user, show a success message, or even log them in.
                setSignUpFormOpen(false);
            } else {
                console.error("Error creating user:", await response.text());
            }
        } catch (error) {
            console.error("There was an error during sign up:", error);
        }
    };

    return (
        <div className="backdrop">
            <div className="loginForm">
                <div className="formContainer">
                    <button className="closeButton" onClick={() => setSignUpFormOpen(false)}>X</button>
                    <div className="loginTitle">Sign Up</div>
                    <form onSubmit={handleSignUp}>
                        <div className="inputGroup">
                            <label>Username:</label>
                            <input type="text" placeholder="Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label>Password:</label>
                            <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <button className="LogButton" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;
