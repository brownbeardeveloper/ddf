import React from "react"
import '../styles/404.css'
import picture from '../features/404.png'

export default function Error() {
    return (
        <div className="error">
            <img src={picture} alt="404" />
            <h1>Ooops, page not found</h1>
            <p>The link you followed may be broken or the page may have been removed.</p>
        </div>
    )
}