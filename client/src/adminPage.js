// creates location sites, users 
//(after getting theire respective location will be the one that manage each atributted site)
// gets users available from radius server and gives roles and locations
// create and manage tickets prefabs

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminPage() {
    const [backendData, setBackendData] = useState([{}]);
    const navigate = useNavigate();

    const handleLogout = async () => {
        // Logout button
        try {
            //const response = await axios.post("api/logout");
            //gotta implement this when DB is set up and we can have to create an API
            //for now its static
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error.response);
        }
    };


    return (
        <div>
            <h1>Admin Page</h1>
            <nav>
                <ul>
                    <li><Link to="/admin/addSite">Add Location</Link></li>
                    <li><Link to="/admin/manageUsers">Manage Users</Link></li>
                    <li><Link to="/admin/manageTickets">Manage Tickets</Link></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </nav>
            <p>{JSON.stringify(backendData)}</p>
        </div>
    );
}