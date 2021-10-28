import React from 'react';
import {Header} from './Header';
import Footer from './Footer';

export const Layout = ({children}) => {
    const check = window.location.pathname === "/luckydraw"
    return (
        <div className="main-app">
            <Header/>
            {children}
            {!check ? <Footer/> : null }
        </div>
);
}
