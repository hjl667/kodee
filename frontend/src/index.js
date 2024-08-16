import React, {useState} from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Outlet,
    createRoutesFromElements,
} from "react-router-dom";
import Glossaries from "./routes/Glossaries/Glossaries";
import Home from "./routes/Home/Home";
import Start from "./routes/Start/Start";
import Transcriptions from "./routes/Transcriptions/Transcriptions";
import LearningSpace from "./routes/LearningSpace/LearningSpace";
import Navbar from "./components/Navbar";
import "./App.css";
import Support from "./routes/Support/Support";
import { UserProvider } from './UserContext';
import Container from '@mui/material/Container';


const AppLayout = () => (
    <div className="appLayout">
        <Navbar />
        <div className="contentContainer">
            <Outlet />
        </div>
        <div className="bottomMargin"> Kodee is all you need</div>
    </div>
);


const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "glossaries",
                element: <Glossaries />,
            },
            {
                path: "start",
                element: <Start />,
            },
            {
                path: "transcriptions",
                element: <Transcriptions/>,
            },
            {
                path: "learning",
                element: <LearningSpace/>,
            },
            {
                path: "support",
                element: <Support/>,
            },
        ],
    },
]);

const App = () => {
    const [userId, setUserId] = useState(null);

    return (
        <UserProvider value={{ userId, setUserId }}>
            <Container style={{ maxWidth: '650px' }}> {/* Adjust maxWidth as needed */}
                <RouterProvider router={router} />
            </Container>
        </UserProvider>
    );
}


createRoot(document.getElementById("root")).render(<App />);

