import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const AdminAddSite = () => {
    const [sites, setSites] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newSite, setNewSite] = useState({
        address: '',
        nameSite: '',
        numBuildings: ''
    });

    useEffect(() => {
        fetchSites();
    }, []);

    const fetchSites = async () => {
        try {
            const response = await axios.get('/api/sites');
            if (Array.isArray(response.data)) {
                setSites(response.data);
            } else {
                console.error('API response is not an array:', response.data);
                setSites([]);
            }
        } catch (error) {
            console.error('Error fetching sites:', error);
            setSites([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSite({
            ...newSite,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/sites', newSite);
            fetchSites(); // Refresh the list of sites
            setModalIsOpen(false); // Close the modal
        } catch (error) {
            console.error('Error adding new site:', error);
        }
    };

    return (
        <div>
            <h1>Manage Sites</h1>
            <button onClick={() => setModalIsOpen(true)}>Add New Site</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Morada</th>
                        <th>Nome do Local</th>
                        <th>Nº de Edificios</th>
                    </tr>
                </thead>
                <tbody>
                    {sites.map((site) => (
                        <tr key={site.id}>
                            <td>{site.id}</td>
                            <td>{site.address}</td>
                            <td>{site.name}</td>
                            <td>{site.numberofbuildings}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Add New Site"
            >
                <h2>Add New Site</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Morada:
                        <input type="text" name="address" value={newSite.address} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Nome do Local:
                        <input type="text" name="nameSite" value={newSite.nameSite} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Nº de Edificios:
                        <input type="number" name="numBuildings" value={newSite.numBuildings} onChange={handleInputChange} required />
                    </label>
                    <button type="submit">Add Site</button>
                    <button type="button" onClick={() => setModalIsOpen(false)}>Cancel</button>
                </form>
            </Modal>
        </div>
    );
};

export default AdminAddSite;
