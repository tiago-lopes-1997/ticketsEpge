
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// creates location sites, users 
//(after getting theire respective location will be the one that manage each atributted site)
//import addLocation from "./addLocation"; 
//import manageUsers from "./manageUsers"; // gets users available from radius server and gives roles and locations
//import manageTickets from "./manageTickets"; // create and manage tickets prefabs




export default function AdminPage() {
    const [backendData, setBackendData] = useState([{}]);

    useEffect(() => {
        fetch('/api/login')
            .then(response => response.json())
            .then(data => {
                setBackendData(data);
            });
    }, []);

    return (
        <div>
            <h1>Admin Page</h1>
            <nav>
                <ul>
                    <li><Link to="/admin/add-location">Add Location</Link></li>
                    <li><Link to="/admin/manage-users">Manage Users</Link></li>
                    <li><Link to="/admin/manage-tickets">Manage Tickets</Link></li>
                </ul>
            </nav>
            <p>{JSON.stringify(backendData)}</p>
        </div>
    );
}