import React from "react"
import picture from '../features/404.png'

export default function Error() {
    return (
        <main className="error">
            <img src={picture} alt="404" />
            <h1>Oj, sidan kunde inte hittas</h1>
            <p>Den länken du följde kanske är trasig eller så har sidan tagits bort.</p>
        </main>
    )
}