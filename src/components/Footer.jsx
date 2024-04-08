import React from "react";
import { Link } from 'react-router-dom';
import FacebookIcon from './icons/FacebookIcon';

export default function Footer({ user }) {
    return (
        <footer className="bg-gray-200 border-t border-gray-300 py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Våra Föreningar</h2>
                        <ul>
                            <li className="flex items-center mb-4 transition duration-200">
                                <FacebookIcon />
                                <span><a href="https://www.facebook.com/profile.php?id=100064534518898" className="text-gray-700 hover:text-blue-400 ml-2 transition duration-200">Örebro Dövförening</a></span>
                            </li>
                            <li className="flex items-center mb-4 transition duration-200">
                                <FacebookIcon />
                                <span><a href="https://www.facebook.com/OrebroDovasUngdomsklubb" className="text-gray-700 hover:text-blue-400 ml-2 transition duration-200">Örebro Dövas Ungdomsklubb</a></span>
                            </li>
                            <li className="flex items-center mb-4 transition duration-200">
                                <FacebookIcon />
                                <span><a href="https://www.facebook.com/groups/1155877801191656" className="text-gray-700 hover:text-blue-400 ml-2 transition duration-200">Örebro Dövas Pensionärsförening</a></span>
                            </li>
                            <li className="flex items-center mb-4 transition duration-200">
                                <FacebookIcon />
                                <span><a href="https://www.facebook.com/ifnerike" className="text-gray-700 hover:text-blue-400 ml-2 transition duration-200">Nerike Idrottsförening</a></span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Kontakta Oss</h2>
                        <ul>
                            <li>Email: info@example.com</li>
                            <li>Telefon: +1234567890</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Snabblänkar</h2>
                        <ul>
                            <li><Link to="/logga-in" className="text-gray-700 hover:text-blue-400 transition duration-200">Logga In</Link></li>
                            {user && <li><Link to="/evenemangshanterare" className="text-gray-700 hover:text-blue-400 transition duration-200">Evenemangshantering</Link></li>}
                            <li><Link to="/" className="text-gray-700 hover:text-blue-400 transition duration-200">Hem</Link></li>
                            <li><Link to="/kalendar" className="text-gray-700 hover:text-blue-400 transition duration-200">Kalender</Link></li>
                            <li><a href="https://www.bokatolk.se" className="text-gray-700 hover:text-blue-400 transition duration-200">Boka Tolk</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center text-gray-700 mt-8">
                <p>&copy; {new Date().getFullYear()} Örebro Dövförening</p>
            </div>
        </footer>
    );
}
