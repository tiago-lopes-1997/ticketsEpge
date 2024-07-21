import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null); // State to track the editing user ID
    const [userUpdates, setUserUpdates] = useState({}); // State to track updates for the user being edited

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                console.error('API response is not an array:', response.data);
                setUsers([]);
            }
        } catch (error) {
            console.error('Error fetching Users:', error);
            setUsers([]);
        }
    };

    const handleEdit = (user) => {
        setEditingUserId(user.id);
        setUserUpdates(user);
    };

    const handleSave = async (userId) => {
        try {
            await axios.put(`/api/users/${userId}`, userUpdates);
            setEditingUserId(null); // Exit editing mode
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Error updating User', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserUpdates((prevUpdates) => ({
            ...prevUpdates,
            [name]: value
        }));
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting User', error);
        }
    };

    return (
        <div>
            <h1>Manage Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Usertype</th>
                        <th>Function</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{editingUserId === user.id ? (
                                <select
                                    name="usertype"
                                    value={userUpdates.usertype}
                                    onChange={handleInputChange}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                    <option value="tec">Tecnico</option>
                                </select>
                            ) : (
                                user.usertype
                            )}</td>
                            <td>{editingUserId === user.id ? (
                                <input
                                    type="text"
                                    name="profession"
                                    value={userUpdates.profession}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                user.userprofession
                            )}</td>
                            <td>{editingUserId === user.id ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={userUpdates.name}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                user.name
                            )}</td>
                            <td>{editingUserId === user.id ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={userUpdates.email}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                user.email
                            )}</td>
                            <td>
                                {editingUserId === user.id ? (
                                    <button onClick={() => handleSave(user.id)}>Save</button>
                                ) : (
                                    <button onClick={() => handleEdit(user)}>Edit</button>
                                )}
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminManageUsers;
