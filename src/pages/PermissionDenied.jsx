import React from 'react';
import '../styles/PermissionDenied.css';

export default function PermissionDenied() {
    return (
        <div className="permission-denied-container">
            <div className="permission-denied">
                <h1>Åtkomst nekad!</h1>
                <p>Tyvärr, du behöver ett specialtillstånd från enhörningskungariket för att få komma in här.</p>            </div>
        </div>
    );
}
