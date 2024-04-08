import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SidebarData from "./SidebarData";
import { AiOutlineBars, AiOutlineClose } from 'react-icons/ai';

export default function Navbar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <header className="bg-silver-400 flex justify-between items-center py-3 px-4">
                <Link to="#" className="text-gray-800 text-3xl">
                    <AiOutlineBars onClick={showSidebar} />
                </Link>
            </header>

            <nav
                className={`h-screen fixed top-0 ${sidebar ? 'left-0' : '-left-full'} z-50 transition-all duration-300 ease-in-out`}
                style={{ backgroundColor: '#C0C0C0' }} // Set the background color to silver
            >
                <ul className="flex flex-col items-start pt-20">
                    <li className="px-4 py-2 absolute top-0 right-0">
                        <Link to="#" className="text-gray-800 flex items-center" onClick={showSidebar}>
                            <AiOutlineClose className="text-xl mr-2" />
                            Close
                        </Link>
                    </li>

                    {SidebarData.map((item, index) => (
                        <li key={index} className="px-4 py-2">
                            <Link
                                to={item.path}
                                className="flex items-center px-2 py-1 rounded hover:bg-blue-400 hover:text-black"
                                onClick={showSidebar}
                            >
                                {item.icon}
                                <span className="ml-2">{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
