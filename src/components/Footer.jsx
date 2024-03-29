import React from "react";
import { Link } from 'react-router-dom'
import '../styles/Footer.css';
import FacebookIcon from './icons/FacebookIcon'

export default function Footer({user}) {

    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-columns">
                    <div className="footer-column">
                        <h2>Våra Föreningar</h2>
                        <p>Läs mer om våra medlemsorganisationer:</p>
                        <ul className="association-list">
                            <li className="association-item">
                                <FacebookIcon/>
                                <span>
                                <a href="https://www.facebook.com/profile.php?id=100064534518898">Örebro Dövförening</a>
                                </span>
                            </li>
                            <li className="association-item">
                                <FacebookIcon/>
                                <span><a href="https://www.facebook.com/OrebroDovasUngdomsklubb">Örebro Dövas Ungdomsklubb</a></span>
                            </li>
                            <li className="association-item">
                                <FacebookIcon/>
                                <span><a href="https://www.facebook.com/groups/1155877801191656">Örebro Dövas Pensionärsförening</a></span>
                            </li>
                            <li className="association-item">
                                <FacebookIcon/>
                                <span><a href="https://www.facebook.com/ifnerike">Nerike Idrottsförening</a></span>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h2>Kontakta Oss</h2>
                        <p>Har du frågor? Kontakta oss:</p>
                        <ul>
                            <li>Email: info@example.com</li>
                            <li>Telefon: +1234567890</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h2>Snabblänkar</h2>
                        <ul>
                            <li><Link to="/logga-in">Logga In</Link></li>

                            {user &&
                                <li><Link to="/evenemangshanterare">Evenemangshantering</Link></li>
                            }

                            <li><Link to="/">Hem</Link></li>
                            <li><Link to="/kalendar">Kalender</Link></li>
                            <li><a href="https://www.bokatolk.se">Boka Tolk</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Örebro Dövförening</p>
            </div>
        </footer>
    );
}
