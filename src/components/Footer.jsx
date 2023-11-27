import React from "react";
import { Link } from 'react-router-dom'
import '../styles/Footer.css';

export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-columns">
                    <div className="footer-column">
                        <h2>Our Associations</h2>
                        <p>Learn more about our member organizations:</p>
                        <ul>
                            <li>Örebro Deaf Association</li>
                            <li>Nerike Sports Association</li>
                            <li>Örebro Deaf Seniors Association</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h2>Contact Us</h2>
                        <p>Have questions? Reach out to us:</p>
                        <ul>
                            <li>Email: info@example.com</li>
                            <li>Phone: +1234567890</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h2>Quick Links</h2>
                        <ul>

                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/activities">Activities</Link></li>
                            <li><Link to="/events">Events</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Örebro Deaf Association</p>
            </div>
        </footer>
    );
}
