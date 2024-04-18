import React from "react";

export default function Home() {

    return (
        <main className="flex flex-col justify-center items-center h-screen
        bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Welcome to Our Website</h1>
                <p className="text-lg">Explore our services and offerings</p>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between w-full p-20">
                <div className="flex flex-col md:mb-0 md:mt-4"> 
                    <div className="bg-blue-800 text-white flex items-center justify-center w-24 h-24 rounded-full mb-4">x</div>
                    <div className="bg-blue-800 text-white flex items-center justify-center w-24 h-24 rounded-full mb-4">x</div>
                    <div className="bg-blue-800 text-white flex items-center justify-center w-24 h-24 rounded-full mb-4">x</div>
                    <div className="bg-blue-800 text-white flex items-center justify-center w-24 h-24 rounded-full mb-4">x</div>
                </div>

                <div className="flex flex-col md:mb-0 md:mt-4"> 
                    <div className="bg-blue-800 text-white flex items-center justify-center w-24 h-24 rounded-full">x</div>
                </div>
            </div>
        </main>
    )
}
