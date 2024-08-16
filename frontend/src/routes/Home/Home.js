import React, { useState } from 'react';
import './Home.css';
import '../../App.css'
import ButtonGroup from './ButtonGroup';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm'
import home from './img.png';

//the home page consists of one picture and the login and register button
//it has two child components: ButtonGroup and LoginForm

function Home() {
    const [isLoginFormOpen, setLoginFormOpen] = useState(false);
    const [isSignUpFormOpen, setSignUpFormOpen] = useState(false);

    return (
        <div className="homeContainer">
            <img className="homeLogo" src={home} alt="Logo" />
            <ButtonGroup
                setLoginFormOpen={setLoginFormOpen}
                setSignUpFormOpen={setSignUpFormOpen}
            />
            {isLoginFormOpen && <LoginForm setLoginFormOpen={setLoginFormOpen} />}
            {isSignUpFormOpen && <SignUpForm setSignUpFormOpen={setSignUpFormOpen} />}
        </div>
    );
}

export default Home;
