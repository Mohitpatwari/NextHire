
import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content mx-4 pl-8">
                <p>&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;