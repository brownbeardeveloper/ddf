import { Link } from "react-router-dom"

export default function SideIcons() {


    return (
        <div className="flex flex-col p-6 bg-yellow-400 md:flex-row md:justify-between">
            <ul className="flex flex-col md:mb-0 md:mt-4">
                <li>
                    <Link to="/" className="bg-blue-800 flex items-center justify-center w-24 h-24 rounded-full mb-4
                text-white pointer hover:bg-blue-400 transition duration-200">
                        x
                    </Link>
                </li>
                <li>
                    <Link to="/" className="bg-blue-800 flex items-center justify-center w-24 h-24 rounded-full mb-4
                text-white pointer hover:bg-blue-400 transition duration-200">
                        x
                    </Link>
                </li>
                <li>
                    <Link to="/" className="bg-blue-800 flex items-center justify-center w-24 h-24 rounded-full mb-4
                text-white pointer hover:bg-blue-400 transition duration-200">
                        x
                    </Link>
                </li>
                <li>
                    <Link to="/" className="bg-blue-800 flex items-center justify-center w-24 h-24 rounded-full mb-4
                text-white pointer hover:bg-blue-400 transition duration-200">
                        x
                    </Link>
                </li>
            </ul>
        </div>
    )
}

