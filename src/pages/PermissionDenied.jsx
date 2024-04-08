import React from "react";
import picture from '../features/404.png';

export default function Error() {
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <img src={picture} alt="404" className="block mx-auto my-8 w-3/4" />
            <h1 className="font-serif text-5xl text-purple-600 mb-2">Oj, sidan kunde inte hittas</h1>
            <p className="font-serif text-xl text-gray-600">Den länken du följde kanske är trasig eller så har sidan tagits bort.</p>
        </main>
    );
}
