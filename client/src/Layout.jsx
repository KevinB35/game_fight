import React from 'react';
import {Container} from "react-bootstrap";
import NavBar from "./components/NavBar";

const Layout = ({children}) => {
    return (
        <>
            <NavBar/>
            <Container>
                {children}
            </Container>
        </>
    );
};

export default Layout;