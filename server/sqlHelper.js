    const { Pool } = require('pg');

    // Create a PostgreSQL pool
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'TicketAppDB',
        password: 'Deltabravo644',
        port: 5432,
    });

    // Save auth username to the db table Users
    const saveUsername = async (username) => {
        const queryText = 'INSERT INTO users (username) VALUES ($1)';
        const values = [username];

        try {
            const client = await pool.connect();

            // If username already exists in the db, don't save
            const check = await client.query('SELECT * FROM users WHERE username = $1', [username]);
            if (check.rows.length > 0) {
                console.log('Username already exists in the db:', check.rows[0]);
                client.release();
                return;
            }

            console.log(`Saving username to the database: ${username}`); // Log the username being saved
            const res = await client.query({ text: queryText, values });
            console.log('User saved to db:', res.rows[0]);
            client.release();
        } catch (err) {
            console.error('Error saving username:', err);
            throw err; // Optionally, rethrow the error to be handled by the caller
        }
    };

    const addSite = async (newSite) => {
        const queryText = 'INSERT INTO site (address, name, numberofbuildings) VALUES ($1, $2, $3)';
        const values = [newSite.address, newSite.nameSite, newSite.numBuildings];

        try {
            const client = await pool.connect();
            const res = await client.query({ text: queryText, values });
            client.release();
            return res.rows[0];
        } catch (err) {
            console.error('Error adding site:', err);
            throw err; // Optionally, rethrow the error to be handled by the caller
        }
    };

    const getAllSites = async () => {
        const queryText = 'SELECT * FROM site'; // Ensure the table name is correct

        try {
            const client = await pool.connect();
            const res = await client.query(queryText);
            client.release();
            return res.rows;
        } catch (error) {
            console.error('Error fetching sites:', error.message);
            throw error; // Rethrow the error to be handled by the caller
        }
    };

    const getAllUsers = async () => {
        const queryText = 'SELECT * FROM users';

        try {
            const client = await pool.connect();
            const res = await client.query(queryText);
            client.release();
            return res.rows;
        } catch (error) {
            console.error('Error fetching users:', error.message);
            throw error;       
        }
    }

    const updateUser = async (id, userUpdates) => {
        const {username, usertype, userprofession, name, email} = userUpdates
        const queryText = 'UPDATE users SET username = $1, usertype = $2, userprofession = $3, name = $4, email = $5 WHERE id = $6';

        const values = [username, usertype, userprofession, name, email, id];
        try {
            const client = await pool.connect();
            const res = await client.query(queryText, values);
            return res;        
        } catch (error) {
            console.error('Error updating user:', error.message);
            throw error;        
        }
    };

    const deleteUser = async (id) => {
        const queryText = 'DELETE FROM users WHERE id = $1';
        try {
            const client = await pool.connect();
            const res = await client.query(queryText, [id]);
            return res;
        } catch (error) {
            console.error('Error deleting user:', error.message);
            throw error;
        }
    };

    module.exports = {
        saveUsername,
        getAllSites,
        addSite,
        getAllUsers,
        updateUser,
        deleteUser,
    };
