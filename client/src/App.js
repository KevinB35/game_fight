import React from "react";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./Layout";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CreateCharacter from "./components/CreateCharacter";
import 'bootstrap/dist/css/bootstrap.min.css';
import Game from "./pages/Game";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Profile tabProp={"characters"}/>,
        },
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/register",
            element: <Register/>,
        },
        {
            path: "/profile",
            element: <Profile/>,
        },
        {
            path: "/characters/create",
            element: <CreateCharacter/>,
        },
        {
            path: "/game",
            element: <Game/>,
        },
    ]);

    return (
        <Layout>
            <RouterProvider router={router}/>
        </Layout>
    );
}

export default App;
