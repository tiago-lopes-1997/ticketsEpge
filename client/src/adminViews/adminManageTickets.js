//Tickets priority, status, type, location, user, date, description
//Admins give no feedback to users, only to TECs

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminPage() {
    const [backendData, setBackendData] = useState([{}]);

    const returnBack = () => {
        window.history.back();
    };

    return (
        <div>
            <h1>Create/Manage Tickets</h1>
            <p>{JSON.stringify(backendData)}</p>
            <button onClick={returnBack}>Back</button>
        </div>
    );
}