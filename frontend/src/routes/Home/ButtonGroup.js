import React from 'react';

const ButtonGroup = ({ setLoginFormOpen, setSignUpFormOpen }) => {
    return (
        <div className="buttonGroup">
            <button className="homeButton" id="logInButton" onClick={() => setLoginFormOpen(true)}>Log In</button>
            <button className="homeButton" id="signUpButton" onClick={() => setSignUpFormOpen(true)}>Sign Up</button>
        </div>
    );
}

export default ButtonGroup;
