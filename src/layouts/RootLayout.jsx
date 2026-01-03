import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useTheme from '../hooks/useTheme';
import "./RootLayout.css"

const RootLayout = () => {
    useTheme();

    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-screen"> 
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;